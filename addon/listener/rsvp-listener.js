import Ember from 'ember';
import BaseListener from './base-handler';
import ErrorDescriptor from '../error-descriptor';
const {RSVP} = Ember;

export default BaseListener.extend({

    listen (manager) {
        RSVP.configure('onerror', function (error) {
            manager.handleError(
                ErrorDescriptor.create({
                    listener: this,
                    error
                })
            );
        });
    }


});
