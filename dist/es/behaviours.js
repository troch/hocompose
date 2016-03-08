import { shallowEquals, omitPrivate } from './utils';

export var pure = {
    name: 'pure',

    shouldUpdate: function shouldUpdate(model) {
        var props = model.props;
        var nextProps = model.nextProps;

        var state = omitPrivate(model.state);
        var nextState = omitPrivate(model.nextState);

        return !shallowEquals(props, nextProps) || !shallowEquals(state, nextState);
    }
};

export var setContext = function setContext(types, values) {
    return {
        name: 'setContext',

        childContextTypes: types,

        getChildContext: function getChildContext(props) {
            if (typeof values === 'function') {
                return values(props);
            }

            return values;
        }
    };
};

export var getContext = function getContext(types) {
    return {
        name: 'getContext',

        contextTypes: types
    };
};