import BaseListener from './base-listener';
import ErrorDescriptor from '../error-descriptor';

export default BaseListener.extend({

    listen(manager) {

        // window listener
        window.onerror = (message, file, line, column, error) => {
            if (!error) {
                error = {
                    message: message,
                    name: String(error),
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
            return true;
        };

        // unhandled promise listener
        window.addEventListener('unhandledrejection', function (event) {
            let error = event.reason;
            if (!error) {
                error = {
                    message: message,
                    name: String(error),
                    stack: ''
                };
            }
            manager.consume(
                ErrorDescriptor.create({
                    source: 'window',
                    listener: this,
                    error
                })
            );

            event.preventDefault();
        });
    }
});

