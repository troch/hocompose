'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    }).filter(isFunc);
};

var buildDisplayName = exports.buildDisplayName = function buildDisplayName(behaviours, BaseComponent) {
    var baseComponentDisplayName = BaseComponent.displayName || BaseComponent.name || 'Component';
    var joinedBehaviourNames = behaviours.map(function (behaviour) {
        return behaviour.name || '?';
    }).join(',');

    return 'Hocompose[' + joinedBehaviourNames + '](' + baseComponentDisplayName + ')';
};

var buildModel = exports.buildModel = function buildModel(_ref) {
    var props = _ref.props;
    var state = _ref.state;
    var context = _ref.context;
    return { props: props, state: state, context: context };
};

var omitPrivate = exports.omitPrivate = function omitPrivate(state) {
    return Object.keys(state).filter(function (key) {
        return !/^_/.test(key);
    }).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, state[key]));
    }, {});
};

var shallowEquals = exports.shallowEquals = function shallowEquals(left, right) {
    return Object.keys(left).length === Object.keys(right).length && Object.keys(left).every(function (leftKey) {
        return left[leftKey] === right[rightKey];
    });
};