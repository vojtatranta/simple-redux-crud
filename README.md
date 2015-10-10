# Simple Redux CRUD
Simple CRUD for your Redux app

## Motivation
I found some CRUD implementation of CRUD for redux, but they were a little bit complicated for my purpose.
So I created this simple thing, hope you will like it.

## Installation
```js
$ npm install simple-redux-crud
```
And you have to have **thunk middleware** enabled in your app!!

## Usage
```js
//assuming that you have 'todos' key in your state (in the root, not somewhere nested). 
//You may use this library only on keys that contain an array!
let state = {
	todos: [{
			text: 'My todo',
			completed: false,
			id: 99
		}, {
			text: 'Next todo',
			completed: true,
			id: 100
		}],
	isFetching: false
	//whatever else
}

//in your ./actions/todos/index.js
//import crud and create action creaters and CRUD reducer
import { createCRUDActions } from 'simple-redux-crud' //this function create action creators for your state key (e.g. todos)
import * as actions from './yourActions.js' //you will probably have your own action creators

export default Object.assign({}, createCRUDActions('todos'), actions) //combine newly created crud actions with your own actions
//you now get add, edit and delete action creators next to your own actions

```
### Action creators signatures
```js
/**
	@param {*} entity - thing you want to add to the state
	@param {boolean=} optimistic - whether adding should be done without waiting for some async function e.g. API call
	@param {boolean=} optimisticOnly - if you just want to add entity to state without calling API
*/
add(entity, optimistic = true, optimisticOnly = false) 

/**
	@param {number} index - index for simple editing (important!!)
	@param {number} id - id of object for API calls
	@param {Object} toUpdate - object of keys you want to update
	@param {boolean=} optimistic
	@param {boolean=} optimisticOnly
*/
edit(index, id, toUpdate, optimistic = true, optimisticOnly = false)

/**
	@param {number} index
	@param {number} id
	@param {Object=} deletePayload - anything you want to send in API request
	@param {boolean=} optimistic
	@param {boolean=} optimisticOnly
*/
delete(index, id, deletePayload = {}, optimistic = true, optimisticOnly = false)
```

### Creating CRUD reducer
```js
import { combineReducers } from 'redux'
import { createCRUDReducer } from 'simple-redux-crud'

export default combineReducers({
	todos: createCRUDReducer('todos') //argument is of course state key that is meant to be observed by reducer
})

//that's it, everything should be running now
```

### Calling action creators
```js
import React, { Component } from 'react'
import { connect } from 'redux'
import * as actions from '../actions/todos'

class Todo extends Component {
	
	toggleCompleted() {
		//you don't have to send whole entity, it is taken from previous state
		//don't forget to put right index of entity in state as first argument!!
		this.props.edit(this.props.index, this.props.id, {completed: !this.props.completed})
	},

	render() {
		<div className="todo">
			<strong>{this.props.text}</strong>
			<span>{this.completed ? 'Completed' : 'x'}</span>
			<span onClick={this.toggleCompleted}>Toggle completed!</span>
		</div>				
	}
}

export default connect((state) => {}, actions)(Todo) //that is it, everything should be running just fine now...
```

### Configuration
So how do you implement API calls?
Remember calling ```createCRUDActions()```?
You can add second argument to this function called ```conf``` look at source code:
```js
export default function(stateKey, conf = {}) {
	const { asyncAdd, asyncEdit, asyncDelete } = conf
```
Got it?
So you can just do this in your /actions/todos/index.js:
```js
//...

export default Object.assign({}, createCRUDActions('todos', {
	asyncAdd: function(entity, optimistic) {
		return (dispatch, getState) => { //that is why you have to use thunk middleware!!
			//some stuff
		}
	},
	asyncEdit: function(index, id, toUpdate, optimistic) {
		//same thing here
	},
	asyncDelete: function(index, id, deletePayload, optimistic) {
		//same here too
	}
}), actions)
```
## My first NPM package
I would:
* add tests :))
* get some users
* solve some of their issues
Thanks. VT.

