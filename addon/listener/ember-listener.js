import Ember from 'ember';
import BaseListener from './base-listener';
import ErrorDescriptor from '../error-descriptor';
const {getOwner} = Ember;

export default BaseListener.extend({

    init() {
        this._super.apply(this, arguments);
        if (!getOwner(this)) {
            throw new Error('Application container must be defined for ember-listener');
        }
    },

    listen(manager) {

        const owner = Ember.getOwner(this);
        const listener = this;

        //Capturing errors within action events
        Ember.ActionHandler.reopen({
            send: function (actionName) {
                try {
                    this._super.apply(this, arguments);
                } catch (error) {
                    manager.consume(
                        ErrorDescriptor.create({
                            source: `ember-action:${actionName}`,
                            listener: listener,
                            error
                        })
                    );
                }
            }
        });

        //Capturing errors during transitions
        const ApplicationRoute = owner.lookup('route:application');
        ApplicationRoute.reopen({
            actions: {
                error: function (error) {
                    manager.consume(
                        ErrorDescriptor.create({
                            source: `ember-route`,
                            listener: listener,
                            error
                        })
                    );
                }
            }
        });


        //Capturing RSVP errors
        Ember.RSVP.onerror = function (error) {
            manager.consume(
                ErrorDescriptor.create({
                    source: `ember-rsvp`,
                    listener: listener,
                    error
                })
            );
        };

        //Capturing ember errors
        Ember.onerror = function (error) {
            manager.consume(
                ErrorDescriptor.create({
                    source: `ember`,
                    listener: listener,
                    error
                })
            );
        };

    }


});
