import Ember from 'ember';
const {computed} = Ember;

export default Ember.Object.extend({

    source: null,

    normalizedMessage: computed(function () {
        return this.get('error.message') || 'Error without message';
    }),

    normalizedStack: computed(function () {
        var stack = this.get('error.stack');
        var parsed = ( stack || '').replace(new RegExp('\\r', 'g'), '').split('\n');
        var message = this.get('normalizedMessage');

        const firstLine = parsed[0];
        const doesStackIncludeMessage = firstLine && firstLine.indexOf(message) !== -1;

        if (!doesStackIncludeMessage) {
            parsed[0] = parsed[0] + ': ' + message;
            return parsed.join('\n');
        } else {
            return stack;
        }
    }),

    plainText: computed(function () {
        return this.get('normalizedStack') || this.get('error.message') || this.get('error.name');
    }),

    error: null

})
