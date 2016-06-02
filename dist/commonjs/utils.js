'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isFunc = exports.isFunc = function isFunc(prop) {
    return typeof prop === 'function';
};

var pluckFunc = exports.pluckFunc = function pluckFunc(behaviours) {
    return function (methodName) {
        return behaviours.filter(function (behaviour) {
            return isFunc(behaviour[methodName]);
        }).map(function (behaviour) {
            return behaviour[methodName];
        });
    };
};

var reduce = exports.reduce = function reduce(list) {
    return list.reduce(function (acc, obj) {
        return _extends({}, acc, obj);
    }, {});
};

var collect = exports.collect = function collect(prop, list) {
    return reduce(list.map(function (item) {
        return item[prop] || {};
    }));
};

var resolveBehaviours = exports.resolveBehaviours = function resolveBehaviours(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (typeof behaviour === 'function') {
            return behaviour(model) || {};
        }
        return behaviour;
    });
};

var componentDidMount = exports.componentDidMount = function componentDidMount(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (isFunc(behaviour.componentDidMount)) {
            var teardown = behaviour.componentDidMount(model);
            if (isFunc(teardown)) {
                return teardown;
            }
        }
        if (isFunc(behaviour.componentWillUnmount)) {
            return behaviour.componentWillUnmount;
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
    var extraValues = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return _extends({ props: props, state: state, context: context }, extraValues);
};

var shallowEquals = exports.shallowEquals = function shallowEquals(left, right) {
    return Object.keys(left).length === Object.keys(right).length && Object.keys(left).every(function (leftKey) {
        return left[leftKey] === right[rightKey];
    });
};