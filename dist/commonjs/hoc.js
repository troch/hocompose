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

var hocompose = function hocompose(behaviours) {
    return function (BaseComponent) {
        var Hocompose = (function (_React$Component) {
            _inherits(Hocompose, _React$Component);

            function Hocompose(props) {
                var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                _classCallCheck(this, Hocompose);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hocompose).call(this, props, context));

                _this.context = context;
                var model = { props: props, context: context };
                _this.state = (0, _utils.collect)('state', (0, _utils.onConstruct)(behaviours, model));
                return _this;
            }

            _createClass(Hocompose, [{
                key: 'getChildContext',
                value: function getChildContext() {
                    var _this2 = this;

                    var getChildContextResults = behaviours.filter(function (behaviours) {
                        return (0, _utils.isFunc)(behaviours.getChildContext);
                    }).map(function (behaviours) {
                        return { getChildContext: behaviours.getChildContext(_this2.props) };
                    });

                    return (0, _utils.collect)('getChildContext', getChildContextResults);
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var model = (0, _utils.buildModel)(this);
                    this.unmountHandlers = (0, _utils.onMount)(behaviours, model, this.setState);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var model = (0, _utils.buildModel)(this);
                    this.unmountHandlers.reverse().forEach(function (onUnmount) {
                        return onUnmount(model);
                    });
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    var shouldUpdateHandlers = behaviours.filter(function (_) {
                        return (0, _utils.isFunc)(_.shouldUpdate);
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
                        return (0, _utils.isFunc)(_.onUpdate);
                    }).forEach(function (_) {
                        return _(model, _this3.setState);
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var stateToProps = (0, _utils.omitPrivate)(this.state);

                    return React.createElement(BaseComponent, _extends({}, this.props, stateToProps));
                }
            }]);

            return Hocompose;
        })(React.Component);

        Hocompose.displayName = (0, _utils.buildDisplayName)(behaviours, BaseComponent);
        Hocompose.contextTypes = (0, _utils.collect)('contextTypes', behaviours);
        Hocompose.childContextTypes = (0, _utils.collect)('childContextTypes', behaviours);

        return Hocompose;
    };
};

exports.default = hocompose;