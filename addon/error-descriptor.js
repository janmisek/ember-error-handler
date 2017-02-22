import Ember from 'ember';
const {computed} = Ember;

export default Ember.Object.extend({

    source: null,

    plainText: computed(function () {
        return this.get('error.stack') || this.get('error.message') || this.get('error.name');
    }),

    error: null

})