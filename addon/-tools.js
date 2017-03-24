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

    internalLogger: Ember.inject.service('ember-error-handler.logger.internal-logger'),

    logInternalError(context, error) {
        this.get('internalLogger').log(context, error)
    }
});

