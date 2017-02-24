# Ember-error-handler - Error handling for ambitious web applications.

Addon handles uncatched errors. Handled error can be displayed on customizable error page 
or passed trhough custom logic. Addon includes consumers for local and remote logging of errors. 

# How it works
Errors thrown are catched by listener bound to error producers (window, Ember ...).  
Errors handled by listeners are passed to various consumers which could log the error, render error page or
perform additional logic. Customers and producers are fully customizable. 

## Non catched error page shown in production environment  

![alt tag](https://raw.githubusercontent.com/janmisek/ember-error-handler/master/github/error-prod.png)

## Non catched error page shown in development environment  

![alt tag](https://raw.githubusercontent.com/janmisek/ember-error-handler/master/github/error-dev.png)


## Installation

* `ember install ember-error-handler`

then throw error somewhere in application and watch screen and console.

## Configuration

### configure listeners to use

Define services to use as listeners. 
Definition could be based on environment. 
Service must extend `base-listener` class.

```
# config/environment.js

if (environment === 'development') {
  ENV['ember-error-handler'].listeners = [
      'service:ember-error-handler/listener/window-listener',
      'service:ember-error-handler/listener/ember-listener'
  ];
}
```

### configure consumers to use

Define services to use as listeners. 
Definition could be based on environment. 
Service must extend `base-consumer`class.
Consumers are executed in order.

```
# config/environment.js

if (environment === 'development') {
   ENV['ember-error-handler'].consumers = [
     'service:ember-error-handler/consumer/wsod-consumer',
     'service:ember-error-handler/consumer/console-consumer'
   ];
}
```


### wsod-consumer - configure component shown when error is handled by environment

```
# config/environment.js

{
  ember-error-handler: {
      "wsod-component-production": 'my-own-component-for-wsod-screen-production'
      "wsod-component-development": 'my-own-component-for-wsod-screen-development'
      "wsod-component-": 'my-own-component-for-wsod-screen'
  }
}
```

## Extendability

TODO

## Listeners

TODO

## Consumers

TODO

## Ember-exex

Addon plays nicely with Exceptional Exceptions addon: https://github.com/janmisek/ember-exex
