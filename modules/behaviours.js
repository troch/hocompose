import { shallowEquals } from './utils';

export const pure = {
    name: 'pure',

    shouldComponentUpdate(model) {
        const { props, nextProps, state, nextState } = model;

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
