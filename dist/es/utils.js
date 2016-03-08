export var isFunc = function isFunc(prop) {
    return typeof prop === 'function';
};

export var collect = function collect(prop, behaviours) {
    return behaviours.reduce(function (acc, behaviour) {
        return behaviour[prop] ? babelHelpers.extends({}, acc, behaviour[prop]) : acc;
    }, {});
};

export var onConstruct = function onConstruct(behaviours, model) {
    return behaviours.map(function (behaviour) {
        if (isFunc(behaviour.onConstruct)) {
            return {
                state: behaviour.onConstruct(model)
            };
        }
        return {};
    });
};

export var onMount = function onMount(behaviours, model) {
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
    return { props: props, state: state, context: context };
};

export var omitPrivate = function omitPrivate(state) {
    return Object.keys(state).filter(function (key) {
        return !/^_/.test(key);
    }).reduce(function (acc, key) {
        return babelHelpers.extends({}, acc, babelHelpers.defineProperty({}, key, state[key]));
    }, {});
};

export var shallowEquals = function shallowEquals(left, right) {
    return Object.keys(left).length === Object.keys(right).length && Object.keys(left).every(function (leftKey) {
        return left[leftKey] === right[rightKey];
    });
};