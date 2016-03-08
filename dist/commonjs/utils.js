'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isFunc = exports.isFunc = function isFunc(prop) {
    return typeof prop === 'function';
};

var collect = exports.collect = function collect(prop, behaviours) {
    return behaviours.reduce(function (acc, behaviour) {
        return behaviour[prop] ? _extends({}, acc, behaviour[prop]) : acc;
    }, {});
};

var onConstruct = exports.onConstruct = function onConstruct(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (isFunc(behaviour.onConstruct)) {
            return {
                state: behaviour.onConstruct(model)
            };
        }
        return {};
    });
};

var onMount = exports.onMount = function onMount(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (isFunc(behaviour.onMount)) {
            var onUnmount = behaviour.onMount(model);
            if (isFunc(onUnmount)) {
                return onUnmount;
            }
        }
        if (isFunc(behaviour.onUnmount)) {
            return behaviour.onUnmount;
        }
    }).filer(isFunc);
};

var buildDisplayName = exports.buildDisplayName = function buildDisplayName(behaviours, BaseComponent) {
    var baseComponentDisplayName = BaseComponent.displayName || BaseComponent.name || 'Component';
    var joinedBehaviours = behaviours.map(function (behaviour) {
        return '[' + (behaviour.displayName || '_') + ']';
    }).join('');

    return 'Hocompose' + joinedBehaviours + '(' + baseComponentDisplayName + ')';
};

var makeModel = exports.makeModel = function makeModel(_ref) {
    var props = _ref.props;
    var state = _ref.state;
    var context = _ref.context;
    return { props: props, state: state, context: context };
};