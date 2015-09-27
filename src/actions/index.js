export const ADD = 'add'
export const ADDING = 'adding'
export const EDIT = 'edit'
export const EDITING = 'editing'
export const DELETE = 'delete'
export const DELETING = 'deleting'


export function createType(actionType, stateKey) {
	return `${actionType}_${stateKey}`
}

export default function(stateKey, conf = {}) {
	const { asyncAdd, asyncEdit, asyncDelete } = conf

	return {
		add(entity, optimistic = true, optimisticOnly = false) {
			return dispatch => {
				dispatch({
					type: createType(ADDING, stateKey),
					payload: entity
				})

				if (asyncAdd && !optimisticOnly) {
					dispatch(asyncAdd(entity, optimistic))
				}

				if (optimistic) {
					dispatch({
						type: createType(ADD, stateKey),
						payload: entity
					})
				}
			}
		},

		edit(index, id, toUpdate, optimistic = true, optimisticOnly = false) {
			return dispatch => {
				dispatch({
					type: createType(EDITING, stateKey),
					payload: toUpdate,
					index,
					id
				})

				if (asyncEdit && !optimisticOnly) {
					dispatch(asyncEdit(id, index, toUpdate, optimistic))
				}

				if (optimistic) {
					dispatch({
						type: createType(EDIT, stateKey),
						payload: toUpdate,
						index,
						id
					})
				}
			}
		},

		delete(index, id, deletePayload = {}, optimistic = true, optimisticOnly = false) {
			return dispatch => {
				dispatch({
					type: createType(DELETING, stateKey),
					index,
					id
				})

				if (asyncDelete && !optimisticOnly) {
					dispatch(asyncDelete(id, index, deletePayload, optimistic))
				}

				if (optimistic) {
					dispatch({
						type: createType(DELETE, stateKey),
						index,
						id
					})
				}
			}

		}
	}
}