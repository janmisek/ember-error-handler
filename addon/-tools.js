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
