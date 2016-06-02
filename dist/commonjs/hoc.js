'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var compose = function compose(behaviours) {
    return function (BaseComponent) {
        var resolvedBehaviours = undefined;

        var Hocompose = (function (_React$Component) {
            _inherits(Hocompose, _React$Component);

            function Hocompose(props) {
                var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                _classCallCheck(this, Hocompose);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hocompose).call(this, props, context));

                _this.context = context;
                var model = { props: props, context: context };

                resolvedBehaviours = (0, _utils.resolveBehaviours)(behaviours, model);

                var get = (0, _utils.pluckFunc)(resolvedBehaviours);
                _this.handlers = {
                    getChildContext: get('getChildContext'),
                    shouldComponentUpdate: get('shouldComponentUpdate'),
                    componentWillUpdate: get('componentWillUpdate'),
                    componentDidUpdate: get('componentDidUpdate'),
                    componentWillReceiveProps: get('componentWillReceiveProps')
                };
                _this.state = (0, _utils.collect)('state', resolvedBehaviours);
                return _this;
            }

            _createClass(Hocompose, [{
                key: 'getChildContext',
                value: function getChildContext() {
                    var model = (0, _utils.buildModel)(this);

                    var getChildContextResults = this.handlers.getChildContext.map(function (_) {
                        return _(model);
                    });

                    return (0, _utils.reduce)(getChildContextResults);
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var model = (0, _utils.buildModel)(this);

                    this.unmountHandlers = (0, _utils.componentDidMount)(resolvedBehaviours, model, this.setState);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var model = (0, _utils.buildModel)(this);

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

                    var model = (0, _utils.buildModel)(this, { nextProps: nextProps, nextState: nextState });

                    return this.handlers.shouldComponentUpdate.some(function (_) {
                        return _(model) === true;
                    });
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var _this2 = this;

                    var model = (0, _utils.buildModel)(this, { nextProps: nextProps });

                    return this.handlers.componentWillReceiveProps.forEach(function (_) {
                        return _(model, _this2.setState);
                    });
                }
            }, {
                key: 'componentWillUpdate',
                value: function componentWillUpdate(nextProps, nextState) {
                    var model = (0, _utils.buildModel)(this, { nextProps: nextProps, nextState: nextState });

                    return this.handlers.componentWillUpdate.forEach(function (_) {
                        return _(model);
                    });
                }
            }, {
                key: 'componentDidUpdate',
                value: function componentDidUpdate(prevProps, prevState) {
                    var _this3 = this;

                    var model = (0, _utils.buildModel)(this, { prevProps: prevProps, prevState: prevState });

                    return this.handlers.componentDidUpdate.forEach(function (_) {
                        return _(model, _this3.setState);
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(BaseComponent, _extends({}, this.props, this.state));
                }
            }]);

            return Hocompose;
        })(React.Component);

        Hocompose.displayName = (0, _utils.buildDisplayName)(behaviours, BaseComponent);
        Hocompose.contextTypes = (0, _utils.collect)('contextTypes', behaviours);
        Hocompose.childContextTypes = (0, _utils.collect)('childContextTypes', behaviours);
        Hocompose.defaultProps = (0, _utils.collect)('defaultProps', behaviours.concat(BaseComponent));
        Hocompose.propTypes = (0, _utils.collect)('propTypes', behaviours.concat(BaseComponent));

        return Hocompose;
    };
};

exports.default = compose;