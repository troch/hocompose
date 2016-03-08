'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getContext = exports.setContext = exports.pure = undefined;

var _utils = require('./utils');

var pure = exports.pure = {
    name: 'pure',

    shouldUpdate: function shouldUpdate(model) {
        var props = model.props;
        var nextProps = model.nextProps;

        var state = (0, _utils.omitPrivate)(model.state);
        var nextState = (0, _utils.omitPrivate)(model.nextState);

        return !(0, _utils.shallowEquals)(props, nextProps) || !(0, _utils.shallowEquals)(state, nextState);
    }
};

var setContext = exports.setContext = function setContext(types, values) {
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

var getContext = exports.getContext = function getContext(types) {
    return {
        name: 'getContext',

        contextTypes: types
    };
};