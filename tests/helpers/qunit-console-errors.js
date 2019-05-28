/* global QUnit */

export default function enableQUnitConsoleErrors() {

  // enable enhanced errors to be printed to console
  if ((typeof QUnit) !== "undefined" && typeof(console) !== "undefined") {
    QUnit.log(function (details) {
      if (!details.result) {

        if (details.message && details.message.indexOf("\n    at") > -1) {
          console.error(details.message); //eslint-disable-line no-console
        }

        if (details.message instanceof Error) {
          console.error(`Error in test: '${details.module}/${details.name}' `, details.message.message, details.message.stack); //eslint-disable-line no-console
        }

        else if (details.source) {
          console.error(`Error in test: '${details.module}/${details.name}' `, details.source); //eslint-disable-line no-console
        }
      }
    });
  }

  // Unlimited stacktrace
  Error.stackTraceLimit = Infinity;
}

