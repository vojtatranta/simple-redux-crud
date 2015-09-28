import expect from 'expect';
import * as crudActions from '../../lib/actions';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = function(state, action) {
  return state
}

const store = createStore(rootReducer, {todos: []})

const actions = crudActions.createCRUDActions('todos')

describe('crud actions', () => {

  it('add should create ADD_todo action', () => {
    let res = actions.add({isReduxGreat: true}, true, true)
    console.log(res(store.dispatch))
  })

})

