import Ember from 'ember';
import {EmberErrorHandlerError} from './errors';
import BaseConsumer from './consumer/base-consumer';
import BaseListener from './listener/base-listener';
const {computed, getOwner} = Ember;

export default Ember.Service.extend({

    consumerKeys: [
        'service:ember-error-handler/consumer/wsod-consumer',
        'service:ember-error-handler/consumer/console-consumer'
    ],

    listenerKeys: [
        'service:ember-error-handler/listener/window-listener',
        'service:ember-error-handler/listener/ember-listener',
        'service:ember-error-handler/listener/rsvp-listener'
    ],

    listeners: computed(
        'listenersKeys.[]',
        function () {
            const owner = getOwner(this);
            const listeners = [];
            this.get('listenerKeys').forEach((listener) => {
                const instance = owner.lookup(listener);
                if (!instance || !(instance instanceof BaseListener)) {
                    throw new EmberErrorHandlerError(`Lookup of listener '${listener}' failed`);
                }
                listeners.push(instance);
            });
            return listeners;
        }),

    consumers: computed(
        'consumerKeys.[]',
        function () {
            const owner = getOwner(this);
            const consumers = [];
            this.get('consumerKeys').forEach((consumer) => {
                const instance = owner.lookup(consumer);
                if (!instance || !(instance instanceof BaseConsumer)) {
                    throw new EmberErrorHandlerError(`Lookup of consumer '${consumer}' failed`);
                }
                consumers.push(instance);
            });
            return consumers;
        }),


    listen() {
        this.get('listeners').forEach((listener) => {
            listener.listen(this);
        })
    },

    consume(descriptor) {
        if (descriptor.get('error') instanceof EmberErrorHandlerError) {
            // eslint-disable-next-line no-console
            console.error('ember-error-handler:',descriptor.get('source'), descriptor.get('error').stack);
        } else {
            this.get('consumers').some((consumer) => {
                return !consumer.consume(descriptor);
            })
        }
    }

});

