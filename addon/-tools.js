import Ember from 'ember';
const {getOwner, computed} = Ember;

export const getConfig = (instance) => {
    return getOwner(instance).resolveRegistration('config:environment')['ember-error-handler'] || {};
};

export const getEnvironment = (instance) => {
    return getOwner(instance).resolveRegistration('config:environment').environment;
};

export const ConfigMixin = Ember.Mixin.create({
    config: computed(function () {
        return getConfig(this);
    }),

    environment: computed(function () {
        return getEnvironment(this);
    })
});

export const InternalErrorManagmentMixin = Ember.Mixin.create({
    logInternalError(context, error) {
        // eslint-disable-next-line no-console
        if (error) {
            console.error('ember-error-handler:', error.stack);
        } else {
            console.error('ember-error-handler:', 'Failed with undefined error');
        }
    }
});

