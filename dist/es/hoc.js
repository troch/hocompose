import * as React from 'react';
import { reduce, collect, componentDidMount as _componentDidMount, buildDisplayName, buildModel, pluckFunc, resolveBehaviours } from './utils';

var compose = function compose(behaviours) {
    return function (BaseComponent) {
        var resolvedBehaviours = undefined;

        var Hocompose = (function (_React$Component) {
            babelHelpers.inherits(Hocompose, _React$Component);

            function Hocompose(props) {
                var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                babelHelpers.classCallCheck(this, Hocompose);

                var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Hocompose).call(this, props, context));

                _this.context = context;
                var model = { props: props, context: context };

                resolvedBehaviours = resolveBehaviours(behaviours, model);

                var get = pluckFunc(resolvedBehaviours);
                _this.handlers = {
                    getChildContext: get('getChildContext'),
                    shouldComponentUpdate: get('shouldComponentUpdate'),
                    componentWillUpdate: get('componentWillUpdate'),
                    componentDidUpdate: get('componentDidUpdate'),
                    componentWillReceiveProps: get('componentWillReceiveProps')
                };
                _this.state = collect('state', resolvedBehaviours);
                return _this;
            }

            babelHelpers.createClass(Hocompose, [{
                key: 'getChildContext',
                value: function getChildContext() {
                    var model = buildModel(this);

                    var getChildContextResults = this.handlers.getChildContext.map(function (_) {
                        return _(model);
                    });

                    return reduce(getChildContextResults);
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var model = buildModel(this);

                    this.unmountHandlers = _componentDidMount(resolvedBehaviours, model, this.setState);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var model = buildModel(this);

                    this.unmountHandlers.reverse().forEach(function (_) {
                        return _(model);
                    });
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    if (this.handlers.shouldComponentUpdate.length === 0) {
                        return true;
                    }

                    var model = buildModel(this, { nextProps: nextProps, nextState: nextState });

                    return this.handlers.shouldComponentUpdate.some(function (_) {
                        return _(model) === true;
                    });
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var _this2 = this;

                    var model = buildModel(this, { nextProps: nextProps });

                    return this.handlers.componentWillReceiveProps.forEach(function (_) {
                        return _(model, _this2.setState);
                    });
                }
            }, {
                key: 'componentWillUpdate',
                value: function componentWillUpdate(nextProps, nextState) {
                    var model = buildModel(this, { nextProps: nextProps, nextState: nextState });

                    return this.handlers.componentWillUpdate.forEach(function (_) {
                        return _(model);
                    });
                }
            }, {
                key: 'componentDidUpdate',
                value: function componentDidUpdate(prevProps, prevState) {
                    var _this3 = this;

                    var model = buildModel(this, { prevProps: prevProps, prevState: prevState });

                    return this.handlers.componentDidUpdate.forEach(function (_) {
                        return _(model, _this3.setState);
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(BaseComponent, babelHelpers.extends({}, this.props, this.state));
                }
            }]);
            return Hocompose;
        })(React.Component);

        Hocompose.displayName = buildDisplayName(behaviours, BaseComponent);
        Hocompose.contextTypes = collect('contextTypes', behaviours);
        Hocompose.childContextTypes = collect('childContextTypes', behaviours);
        Hocompose.defaultProps = collect('defaultProps', behaviours.concat(BaseComponent));
        Hocompose.propTypes = collect('propTypes', behaviours.concat(BaseComponent));

        return Hocompose;
    };
};

export default compose;