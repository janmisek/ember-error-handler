import Ember from 'ember';
import {EmberErrorHandlerError} from './errors';
import BaseConsumer from './consumer/base-consumer';
import BaseListener from './listener/base-listener';
import ErrorDescriptor from './error-descriptor';
import {ConfigMixin, InternalErrorManagmentMixin} from './-tools';
const {computed, getOwner} = Ember;

export default Ember.Service.extend(
    ConfigMixin,
    InternalErrorManagmentMixin,
    {
        consumerKeys: computed(function () {
            const configured = this.get('config')['consumers'];
            return configured || [
                    'service:ember-error-handler/consumer/wsod-consumer',
                    'service:ember-error-handler/consumer/console-consumer'
                ]
        }),

        listenerKeys: computed(function () {
            const configured = this.get('config')['listeners'];
            return configured || [
                   'service:ember-error-handler/listener/window-listener',
                   'service:ember-error-handler/listener/ember-listener'
                ]
        }),

        consumed: computed(() => []),

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
            try {
                this.get('listeners').forEach((listener) => {
                    listener.listen(this);
                })
            } catch (e) {
                this.logInternalError(
                    this,
                    new EmberErrorHandlerError('Listeners initialization failed').withPreviousError(e)
                );
            }

        },

        isConsumed(descriptor) {
            return this.get('consumed').indexOf(descriptor.get('error')) !== -1;
        },


        consume(descriptor) {

            // if descriptor is not provided we convert error to descriptor instance
            if (!(descriptor instanceof ErrorDescriptor)) {
                descriptor = ErrorDescriptor.create({
                    source: 'custom',
                    listener: null,
                    error: descriptor
                })
            }

            try {
                if (!this.isConsumed(descriptor)) {

                    this.get('consumed').pushObject(descriptor.get('error'));

                    this.get('consumers').some((consumer) => {
                        try {
                            return !consumer.consume(descriptor);
                        } catch (e) {
                            this.logInternalError(
                                this,
                                new EmberErrorHandlerError(`Consumer ${consumer._debugContainerKey} failed`).withPreviousError(e)
                            );
                        }
                    });
                } else {
                    throw new EmberErrorHandlerError('Not consumable error');
                }
            } catch (e) {
                this.logInternalError(
                    this,
                    new EmberErrorHandlerError('Error consumation failed').withPreviousError(e)
                );
            }
        }

    });

