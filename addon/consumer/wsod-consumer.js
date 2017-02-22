import BaseConsumer from './base-consumer';
import Ember from 'ember';
const {getOwner, computed} = Ember;

export default BaseConsumer.extend({

    isRendered: false,

    errors: computed(() => []),

    parseError: function (error) {
        return {
            error: error,
            description: error.getDescription(),
            message: error.getPlainMessage(),
            log: error.getLog(),
            stackTrace: error.getPlainText().replace(new RegExp('\n', 'g'), '<br />')
        };
    },

    component: 'ember-error-handler/wsod-screen',

    consume(error) {
        const errors = this.get('errors');
        errors.pushObject(this.parseError(error));

        if (!this.get('isRendered')) {
            const component = getOwner(this).lookup('components:' + this.get('component'));
            component.set('errors', errors);
            component.append();
            this.set('isRendered', true);
        }

        return true;
    }

});
