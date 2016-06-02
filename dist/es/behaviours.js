import { shallowEquals } from './utils';

export var pure = {
    name: 'pure',

    shouldComponentUpdate: function shouldComponentUpdate(model) {
        var props = model.props;
        var nextProps = model.nextProps;
        var state = model.state;
        var nextState = model.nextState;

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