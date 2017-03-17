import Ember from 'ember';
import layout from '../../templates/components/ember-error-handler/wsod-screen-development';
const {computed} = Ember;

export default Ember.Component.extend({
  layout,

  descriptors: null,

  message: computed(function () {
    return this.get('descriptors.firstObject.normalizedMessage');
  }),

  stackTrace: computed(function () {
    const stackTrace = (this.get('descriptors.firstObject.normalizedStack') || '')
      .replace(new RegExp('\\n', 'g'), '<br />');

    return stackTrace ? stackTrace : 'No stack trace available';

  })
});
