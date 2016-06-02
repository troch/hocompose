export const isFunc = prop => typeof prop === 'function';

export const pluckFunc = behaviours => methodName =>
    behaviours
        .filter(behaviour => isFunc(behaviour[methodName]))
        .map(behaviour => behaviour[methodName]);

export const reduce = (list) =>
    list.reduce((acc, obj) => ({ ...acc, ...obj }), {});

export const collect = (prop, list) =>
    reduce(list.map(item => item[prop] || {}));

export const resolveBehaviours = (behaviours, model) =>
    behaviours
        .map(behaviour => {
            if (typeof behaviour === 'function') {
                return behaviour(model) || {};
            }
            return behaviour;
        });

export const componentDidMount = (behaviours, model) =>
    behaviours
        .map((behaviour) => {
            if (isFunc(behaviour.componentDidMount)) {
                const teardown = behaviour.componentDidMount(model);
                if (isFunc(teardown)) {
                    return teardown;
                }
            }
            if (isFunc(behaviour.componentWillUnmount)) {
                return behaviour.componentWillUnmount;
            }
        })
        .filter(isFunc);


export const buildDisplayName = (behaviours, BaseComponent) => {
    const baseComponentDisplayName = BaseComponent.displayName || BaseComponent.name || 'Component';
    const joinedBehaviourNames = behaviours
        .map(behaviour => behaviour.name || '?')
        .join(',');

    return `Hocompose[${joinedBehaviourNames}](${baseComponentDisplayName})`;
};

export const buildModel = ({ props, state, context }, extraValues = {}) =>
    ({ props, state, context, ...extraValues });

export const shallowEquals = (left, right) =>
    Object.keys(left).length === Object.keys(right).length &&
    Object.keys(left).every(leftKey => left[leftKey] === right[rightKey]);
