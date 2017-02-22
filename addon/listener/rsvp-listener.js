import Ember from 'ember';
import BaseListener from './base-listener';
import ErrorDescriptor from '../error-descriptor';
const {RSVP} = Ember;

export default BaseListener.extend({

    listen (manager) {
        RSVP.configure('onerror', function (error) {
            manager.consume(
                ErrorDescriptor.create({
                    source: 'rsvp',
                    listener: this,
                    error
                })
            );
        });
    }


});
