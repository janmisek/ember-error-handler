import Ember from 'ember';
const {getOwner, computed} = Ember;

export const getConfig = (instance) => {
    return getOwner(instance).resolveRegistration('config:environment')['ember-error-handler'] || {};
};

export const getEnvironment = (instance) => {
    return getOwner(instance).resolveRegistration('config:environment').environment;
};

export const ConfigMixin = Ember.Mixin.create({
    config: computed(function () {
        return getConfig(this);
    }),

    environment: computed(function () {
        return getEnvironment(this);
    })
});

export const InternalErrorManagmentMixin = Ember.Mixin.create({

    internalLogger: Ember.inject.service('ember-error-handler.logger.internal-logger'),

    logInternalError(context, error) {
        this.get('internalLogger').log(context, error)
    }
});

// Class name extraction tooling

const unknownFunction = 'UnknownFunction';
const unknownObject = 'UnknownObject';

export const stringify = (value) => {
    try {
        value = String(value);
    } catch (e) {
        value = 'unrecognized'
    }
    return value;
};

export const stringifyItems = (items) => {
    return items
        .map(i => "'" + stringify(i) + "'")
        .join(', ')
};

export const extractClassName = function(subject)  {
    return subject[Ember.NAME_KEY] || subject.modelName || subject.name || stringify(subject) || unknownFunction;
};

export const exportInstanceName = function(subject) {
    return subject._debugContainerKey || subject.modelName || (subject.constructor ? extractClassName(subject.constructor) : false) || stringify(subject) || unknownObject;
};

export const  extractName = function (subject) {

    if (typeof subject === 'undefined') {
        return 'undefined';
    }

    if (subject === null) {
        return 'null';
    }

    if (typeof subject === 'string') {
        return `String('${subject}')`;
    }

    if (typeof subject === 'number') {
        return `Number(${subject})`;
    }

    if (typeof subject === 'boolean') {
        return `Boolean(${subject ? 'true' : 'false'})`;
    }

    if (Array.isArray(subject)) {
        return `Array (${subject.length})`;
    }

    if (typeof subject === 'function') {
        return `Class ${extractClassName(subject)}`;
    } else {
        return `Instance of ${exportInstanceName(subject)}`;
    }
};

