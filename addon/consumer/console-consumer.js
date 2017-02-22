import BaseConsumer from './base-consumer';

export default BaseConsumer.extend({

    consume (error) {
        console.error(error.getPlainText());
        return true;
    }

});
