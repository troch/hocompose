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
                return behaviour.onMount(model);
            }
        })
        .filter(_ => typeof _ === 'function');


export const buildDisplayName = (behaviours, BaseComponent) => {
    const baseComponentDisplayName = BaseComponent.displayName || BaseComponent.name || 'Component';
    const joinedBehaviours = behaviours
        .map(behaviour => `[${behaviour.displayName || '_'}]`)
        .join('');

    return `Hocompose${joinedBehaviours}(${baseComponentDisplayName})`;
};

export const makeModel = ({ props, state, context }) => ({ props, state, context });
