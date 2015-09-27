'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _actions = require('../actions');

function removeIndexFromArray(index, array) {
	var ret = [];
	array.forEach(function (item, i) {
		if (i != index) {
			ret.push(item);
		}
	});
	return ret;
}

exports['default'] = function (stateKey) {
	var initialState = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	return function (state, action) {
		if (state === undefined) state = initialState;

		var newState = undefined;
		switch (action.type) {
			case (0, _actions.createType)(_actions.ADD, stateKey):
				newState = state.slice();
				newState.push(action.payload);
				return newState;
			case (0, _actions.createType)(_actions.EDIT, stateKey):
				newState = state.slice();
				newState[action.index] = Object.assign({}, newState[action.index], action.payload);
				return newState;
			case (0, _actions.createType)(_actions.DELETE, stateKey):
				if (state[action.index]) {
					newState = state.slice();
					return removeIndexFromArray(action.index, newState);
				} else {
					return state;
				}
			default:
				return state;
		}
	};
};

module.exports = exports['default'];