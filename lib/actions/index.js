'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.createType = createType;
exports.createCRUDActions = createCRUDActions;
var ADD = 'add';
exports.ADD = ADD;
var ADDING = 'adding';
exports.ADDING = ADDING;
var EDIT = 'edit';
exports.EDIT = EDIT;
var EDITING = 'editing';
exports.EDITING = EDITING;
var DELETE = 'delete';
exports.DELETE = DELETE;
var DELETING = 'deleting';

exports.DELETING = DELETING;

function createType(actionType, stateKey) {
	return actionType + '_' + stateKey;
}

function createCRUDActions(stateKey) {
	var conf = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	var asyncAdd = conf.asyncAdd;
	var asyncEdit = conf.asyncEdit;
	var asyncDelete = conf.asyncDelete;

	return {
		add: function add(entity) {
			var optimistic = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
			var optimisticOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

			return function (dispatch) {
				dispatch({
					type: createType(ADDING, stateKey),
					payload: entity
				});

				if (asyncAdd && !optimisticOnly) {
					dispatch(asyncAdd(entity, optimistic));
				}

				if (optimistic) {
					dispatch({
						type: createType(ADD, stateKey),
						payload: entity
					});
				}
			};
		},

		edit: function edit(index, id, toUpdate) {
			var optimistic = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
			var optimisticOnly = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

			return function (dispatch) {
				dispatch({
					type: createType(EDITING, stateKey),
					payload: toUpdate,
					index: index,
					id: id
				});

				if (asyncEdit && !optimisticOnly) {
					dispatch(asyncEdit(index, id, toUpdate, optimistic));
				}

				if (optimistic) {
					dispatch({
						type: createType(EDIT, stateKey),
						payload: toUpdate,
						index: index,
						id: id
					});
				}
			};
		},

		'delete': function _delete(index, id) {
			var deletePayload = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
			var optimistic = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
			var optimisticOnly = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

			return function (dispatch) {
				dispatch({
					type: createType(DELETING, stateKey),
					index: index,
					id: id
				});

				if (asyncDelete && !optimisticOnly) {
					dispatch(asyncDelete(index, id, deletePayload, optimistic));
				}

				if (optimistic) {
					dispatch({
						type: createType(DELETE, stateKey),
						index: index,
						id: id
					});
				}
			};
		}
	};
}