import Component from './wsod-screen';
import layout from '../../templates/components/ember-error-handler/wsod-screen-development';

export default Component.extend({
    layout,

    didInsertElement() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
});
