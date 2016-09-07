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


export const componentMounting = (behaviours, model) =>
    behaviours
        .map((behaviour) => {
            const results = [];

            if (isFunc(behaviour.componentWillMount)) {
                results.push(behaviour.componentWillMount(model));
            }
            if (isFunc(behaviour.componentDidMount)) {
                results.push(behaviour.componentDidMount(model));
            }

            const teardown = results.filter(isFunc);

            if (teardown.length) {
                return teardown;
            }
            if (isFunc(behaviour.componentWillUnmount)) {
                return behaviour.componentWillUnmount;
            }
        })
        .reduce((acc, item) => acc.concat(item), [])
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
