import Ember from 'ember';
import layout from '../../templates/components/ember-error-handler/wsod-screen-development';
const {computed} = Ember;

export default Ember.Component.extend({
  layout,

  descriptors: null,

  message: computed(function () {
    return this.get('descriptors.firstObject.error.message');
  }),

  stackTrace: computed(function () {
    return (this.get('descriptors.firstObject.error.stack') || '')
      .replace(new RegExp('\\n', 'g'), '<br />');
  })
});
