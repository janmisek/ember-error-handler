import Ember from 'ember';

export default {
  name: 'ember-error-handler-instance-initializer',
  initialize( owner ) {
    const manager = owner.lookup('service:ember-error-handler.error-manager');
    manager.listen();
  }
};
