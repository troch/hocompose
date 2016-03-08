export const isFunc = prop => typeof prop === 'function';

export const collect = (prop, behaviours) =>
    behaviours.reduce(
        (acc, behaviour) => behaviour[prop]
            ? { ...acc, ...behaviour[prop] }
            : acc,
        {}
    );

export const onConstruct = (behaviours, model) =>
    behaviours.map((behaviour) => {
        if (isFunc(behaviour.onConstruct)) {
            return {
                state: behaviour.onConstruct(model)
            };
        }
        return {};
    });

export const onMount = (behaviours, model) =>
    behaviours
        .map((behaviour) => {
            if (isFunc(behaviour.onMount)) {
                const onUnmount = behaviour.onMount(model);
                if (isFunc(onUnmount)) {
                    return onUnmount;
                }
            }
            if (isFunc(behaviour.onUnmount)) {
                return behaviour.onUnmount;
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

export const buildModel = ({ props, state, context }) => ({ props, state, context });

export const omitPrivate = (state) =>
    Object.keys(state)
        .filter(key => !/^_/.test(key))
        .reduce((acc, key) => ({ ...acc, [key]: state[key] }), {});

export const shallowEquals = (left, right) =>
    Object.keys(left).length === Object.keys(right).length &&
    Object.keys(left).every(leftKey => left[leftKey] === right[rightKey]);
