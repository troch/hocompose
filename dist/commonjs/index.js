'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = exports.setContext = exports.pure = undefined;

var _hoc = require('./hoc');

var _hoc2 = _interopRequireDefault(_hoc);

var _behaviours = require('./behaviours');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _hoc2.default;
exports.pure = _behaviours.pure;
exports.setContext = _behaviours.setContext;
exports.getContext = _behaviours.getContext;