import { createType, ADD, EDIT, DELETE } from '../actions'

function removeIndexFromArray(index, array) {
	let ret = []
	array.forEach((item, i) => {
		if (i != index) {
			ret.push(item)
		}
	})
	return ret
}

export default function createCRUDReducer(stateKey, initialState = []) {
	return function(state = initialState, action) {
		let newState
		switch (action.type) {
			case createType(ADD, stateKey):
				newState = state.slice()
				newState.push(action.payload)
				return newState
			case createType(EDIT, stateKey):
				newState = state.slice()
				newState[action.index] = Object.assign({}, newState[action.index], action.payload)
				return newState
			case createType(DELETE, stateKey):
				if (state[action.index]) {
					newState = state.slice()
					return removeIndexFromArray(action.index, newState)
				} else {
					return state
				}
			default:
				return state
		}
	}
}