import Ember from 'ember';
const {getOwner} = Ember;

export const getConfig = (instance) => {
  return getOwner(instance).resolveRegistration('config:environment')['ember-error-handler'] || {};
};

export const getEnvironment = (instance) => {
  return getOwner(instance).resolveRegistration('config:environment').environment;
};
