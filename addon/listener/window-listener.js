import BaseListener from './base-listener';
import ErrorDescriptor from '../error-descriptor';

export default BaseListener.extend({

    listen (manager) {
        window.onerror = function (message, file, line, column, error) {
            if (!error) {
                error = {
                    message: message,
                    name: error,
                    stack: message + ' at ' + "\n" + file + ':' + line + ':' + column
                };
            }

            manager.consume(
                ErrorDescriptor.create({
                    source: 'window',
                    listener: this,
                    error
                })
            );
        };
    }
});

