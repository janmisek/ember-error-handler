import BaseConsumer from './base-consumer';

export default BaseConsumer.extend({

    consume (descriptor) {
        // eslint-disable-next-line no-console
        console.error(
            descriptor.get('source'),
            descriptor.get('isError') ? descriptor.get('plainText') : descriptor.get('error')
        );
        return true;
    }

});
