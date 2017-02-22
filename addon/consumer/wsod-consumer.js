import BaseConsumer from './base-consumer';
import Ember from 'ember';
import {EmberErrorHandlerError} from './../errors';
import {getConfig, getEnvironment} from './../-tools';
const {getOwner, computed} = Ember;

export default BaseConsumer.extend({

    isRendered: false,

    descriptors: computed(() => []),

    component: computed(function() {
      let component = this.get('config')['wsod-component'];
      if (!component) {
        const env = this.get('environment');
        component = 'ember-error-handler/wsod-screen-'+env;
      }
      return component;
    }),

    config: computed(function() {
      return getConfig(this);
    }),

    environment: computed(function() {
      return getEnvironment(this);
    }),

    consume(descriptor) {
        try {
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
                if(layout) {
                  component.set('layout', layout);
                }
                component.append();
                this.set('isRendered', true);
            }

        } catch (e) {
            throw new EmberErrorHandlerError().withPreviousError(e);
        }

        return true;
    }

});
