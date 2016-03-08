import { shallowEquals, omitPrivate } from './utils';

export const pure = {
    name: 'pure',

    shouldUpdate(model) {
        const { props, nextProps } = model;
        const state = omitPrivate(model.state);
        const nextState = omitPrivate(model.nextState);

        return !shallowEquals(props, nextProps) || !shallowEquals(state, nextState);
    }
};

export const setContext = (types, values) => ({
    name: 'setContext',

    childContextTypes: types,

    getChildContext(props) {
        if (typeof values === 'function') {
            return values(props);
        }

        return values;
    }
});

export const getContext = (types) => ({
    name: 'getContext',

    contextTypes: types
});
