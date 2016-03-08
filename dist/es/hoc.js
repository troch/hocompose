import * as React from 'react';
import { collect, onConstruct, onMount, buildDisplayName, buildModel, isFunc, omitPrivate } from './utils';

var hocompose = function hocompose(behaviours) {
    return function (BaseComponent) {
        var Hocompose = (function (_React$Component) {
            babelHelpers.inherits(Hocompose, _React$Component);

            function Hocompose(props) {
                var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                babelHelpers.classCallCheck(this, Hocompose);

                var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Hocompose).call(this, props, context));

                _this.context = context;
                var model = { props: props, context: context };
                _this.state = collect('state', onConstruct(behaviours, model));
                return _this;
            }

            babelHelpers.createClass(Hocompose, [{
                key: 'getChildContext',
                value: function getChildContext() {
                    var _this2 = this;

                    var getChildContextResults = behaviours.filter(function (behaviours) {
                        return isFunc(behaviours.getChildContext);
                    }).map(function (behaviours) {
                        return { getChildContext: behaviours.getChildContext(_this2.props) };
                    });

                    return collect('getChildContext', getChildContextResults);
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var model = buildModel(this);
                    this.unmountHandlers = onMount(behaviours, model, this.setState);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var model = buildModel(this);
                    this.unmountHandlers.reverse().forEach(function (onUnmount) {
                        return onUnmount(model);
                    });
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    var shouldUpdateHandlers = behaviours.filter(function (_) {
                        return isFunc(_.shouldUpdate);
                    });

                    if (shouldUpdateHandlers.length === 0) {
                        return true;
                    }

                    var model = {
                        props: this.props,
                        state: this.state,
                        nextProps: nextProps,
                        nextState: nextState
                    };

                    return shouldUpdateHandlers.map(function (_) {
                        return _(model);
                    }).some(function (_) {
                        return _ === true;
                    });
                }
            }, {
                key: 'componentDidUpdate',
                value: function componentDidUpdate(nextProps) {
                    var _this3 = this;

                    var model = {
                        props: this.props,
                        state: this.state,
                        context: this.context,
                        nextProps: nextProps
                    };

                    return behaviours.filter(function (_) {
                        return isFunc(_.onUpdate);
                    }).forEach(function (_) {
                        return _(model, _this3.setState);
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var stateToProps = omitPrivate(this.state);

                    return React.createElement(BaseComponent, babelHelpers.extends({}, this.props, stateToProps));
                }
            }]);
            return Hocompose;
        })(React.Component);

        Hocompose.displayName = buildDisplayName(behaviours, BaseComponent);
        Hocompose.contextTypes = collect('contextTypes', behaviours);
        Hocompose.childContextTypes = collect('childContextTypes', behaviours);

        return Hocompose;
    };
};

export default hocompose;