'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

module.exports = { createCRUDActions: _actions2['default'], createCRUDReducer: _reducers2['default'] };
exports['default'] = module.exports;
module.exports = exports['default'];