import Ember from 'ember';
import {extractName} from './-tools';
const {computed} = Ember;

export default Ember.Object.extend({

    source: null,

    normalizedName: computed(function () {
        const error = this.get('error');
        return extractName(error) || String(error) || 'Unknown error';
    }),

    isError: computed(function () {
        return this.get('error') instanceof Error;
    }),

    additionalData: computed(function () {

        const namesUsed = [];
        const error = this.get('error');
        let collected = null;

        const getErrorName = (error) => {
            const root = error.name || 'error';
            let name;
            let index = 0;
            do {
                name = root + ':' + index;
                index++;
            } while (namesUsed.indexOf(name) !== -1)

            return name;
        };

        const collectAdditionalData = (error) => {
            if (error && error.additionalData) {
                collected = collected || {};
                collected[getErrorName(error)] = error.additionalData;
                if (error.previous) {
                    collectAdditionalData(error.previous);
                }
            }
        };

       collectAdditionalData(error);

        return collected;
    }),

    normalizedMessage: computed(function () {
        const error = this.get('error');

        if (typeof error === 'undefined') {
            return 'undefined thrown as error';
        }

        if (error === null) {
            return 'null thrown as error';
        }

        if (typeof error === 'boolean') {
            return `boolean thrown as error (${error ? 'true' : 'false'})`;
        }

        if (typeof error === 'string' || typeof error === 'number') {
            return error;
        }

        return error.message ? error.message : this.get('normalizedName');
    }),

    normalizedStack: computed(function () {
        let stack = this.get('error.stack');

        if (stack) {
            const parsed = ( stack || '').replace(new RegExp('\\r', 'g'), '').split('\n');
            const message = this.get('normalizedMessage');

            const firstLine = parsed[0];
            const doesStackIncludeMessage = firstLine && firstLine.indexOf(message) !== -1;

            if (!doesStackIncludeMessage) {
                parsed[0] = parsed[0] ? parsed[0] + ':' : parsed[0];
                parsed[0] = parsed[0] + message;
                stack = parsed.join('\n');
            }
        }

        return stack;
    }),

    plainText: computed(function () {
        if (this.get('normalizedStack')) {
            return this.get('normalizedStack');
        }

        if (this.get('normalizedMessage')) {
            return this.get('normalizedMessage') + ' (no stacktrace available)';
        }

        return 'Thrown with no additional info available';
    }),

    error: null

})
