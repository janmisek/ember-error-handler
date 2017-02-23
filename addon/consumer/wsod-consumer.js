import BaseConsumer from './base-consumer';
import Ember from 'ember';
const {getOwner, computed} = Ember;

export default BaseConsumer.extend({

  isRendered: false,

  descriptors: computed(() => []),

  'component-development': computed(function () {
    let component = this.get('config')['wsod-component-development'];
    if (!component) {
      component = 'ember-error-handler/wsod-screen-development';
    }
    return component;

  }),

  'component-production': computed(function () {
    let component = this.get('config')['wsod-component-production'];
    if (!component) {
      component = 'ember-error-handler/wsod-screen-production';
    }
    return component;

  }),

  component: computed(function () {
    let component = this.get('config')['wsod-component'];
    if (!component) {
      const env = this.get('environment');
      component = this.get('component-' + env);
    }
    return component;
  }),

  consume(descriptor) {
    const descriptors = this.get('descriptors');
    descriptors.pushObject(descriptor);

    if (!this.get('isRendered')) {
      let lookupKey;
      const owner = getOwner(this);

      lookupKey = 'component:' + this.get('component');
      const component = owner.lookup(lookupKey);
      if (!component) {
        throw Error(`Cannot instantiate wsod component '${lookupKey}'`);
      }

      lookupKey = 'template:components/' + this.get('component');
      const layout = owner.lookup(lookupKey);
      component.set('descriptors', descriptors);
      if (layout) {
        component.set('layout', layout);
      }
      component.append();
      this.set('isRendered', true);
    }

    return true;
  }

});
