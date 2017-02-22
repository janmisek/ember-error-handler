import Ember from 'ember';
const {computed, getOwner} = Ember;

export default Ember.Service.extend({

    consumerKeys: [
        'ember-error-handler/consumer/wson-consumer'
    ],

    listenerKeys: [
        'ember-error-handler/listener/window-listener',
        'ember-error-handler/listener/rsvp-listener'
    ],

    listeners: computed(
        'listenersKeys.[]',
        function () {
            const owner = getOwner(this);
            const listeners = [];
            this.get('listenerKeys').forEach((listener) => listeners.push(owner.lookup(listener)))
            return listeners;
        }),

    consumers: computed(
        'consumerKeys.[]',
        function () {
            const owner = getOwner(this);
            const consumers = [];
            this.get('consumerKeys').forEach((consumer) => consumers.push(owner.lookup(consumer)));
            return consumers;
        }),


    init() {
        this._super.apply(this, arguments);
        this.listen();
    },

    listen() {
        this.get('listeners').forEach((listener) => {
            listener.listen(this);
        })
    },

    consume(descriptor) {
        this.get('consumers').some((consumer) => {
            return !!consumer.consume(descriptor);
        })
        
        
        
    }

});

