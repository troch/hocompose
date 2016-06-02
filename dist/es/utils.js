export var isFunc = function isFunc(prop) {
    return typeof prop === 'function';
};

export var pluckFunc = function pluckFunc(behaviours) {
    return function (methodName) {
        return behaviours.filter(function (behaviour) {
            return isFunc(behaviour[methodName]);
        }).map(function (behaviour) {
            return behaviour[methodName];
        });
    };
};

export var reduce = function reduce(list) {
    return list.reduce(function (acc, obj) {
        return babelHelpers.extends({}, acc, obj);
    }, {});
};

export var collect = function collect(prop, list) {
    return reduce(list.map(function (item) {
        return item[prop] || {};
    }));
};

export var resolveBehaviours = function resolveBehaviours(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (typeof behaviour === 'function') {
            return behaviour(model) || {};
        }
        return behaviour;
    });
};

export var componentDidMount = function componentDidMount(behaviours, model) {
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

export var buildDisplayName = function buildDisplayName(behaviours, BaseComponent) {
    var baseComponentDisplayName = BaseComponent.displayName || BaseComponent.name || 'Component';
    var joinedBehaviourNames = behaviours.map(function (behaviour) {
        return behaviour.name || '?';
    }).join(',');

    return 'Hocompose[' + joinedBehaviourNames + '](' + baseComponentDisplayName + ')';
};

export var buildModel = function buildModel(_ref) {
    var props = _ref.props;
    var state = _ref.state;
    var context = _ref.context;
    var extraValues = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return babelHelpers.extends({ props: props, state: state, context: context }, extraValues);
};

export var shallowEquals = function shallowEquals(left, right) {
    return Object.keys(left).length === Object.keys(right).length && Object.keys(left).every(function (leftKey) {
        return left[leftKey] === right[rightKey];
    });
};