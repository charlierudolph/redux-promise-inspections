# redux-promise-inspections

A set of actions / reducer / helpers for inspecting the status of an asynchronous redux action.

This can be used to determine when to display a loading indicator and an error popup.

# Usage

### Store

When creating your store, combine the promise inspections reducer with your application reducers and use [redux-thunk](https://github.com/gaearon/redux-thunk) as middleware. Ensure `redux-thunk` is last middleware in the case that you are using other middleware such as [redux-inject](https://www.npmjs.com/package/redux-inject).

```javascript
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseInspectionsReducer } from 'redux-promise-inspections'
import reduxThunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    // ...
    promiseInspections: promiseInspectionsReducer
    // ...
  }),
  applyMiddleware(/* ... */, reduxThunk),
)
```

### Actions

Any async action can easily be converted to save its state into redux.

```javascript
// Async action using redux-thunk
const myAction = function (input) {
  return async function (dispatch, getState) {
    // ...
  }
}

// Async action using redux-thunk and redux-promise-inspections
import { inspectPromise } from 'redux-promise-inspections'

const myAction = function (input) {
  return inspectPromise('MY_ACTION', async function (dispatch, getState) {
    // ...
  })
}
```

When `myAction` is called, it will immediately dispatch an action that updates the `promiseInspections` part of state to contain:
```javascript
{
  'MY_ACTION': {
    pending: true
  }
}
```
If the async function resolves, it will be updated to:
```javascript
{
  'MY_ACTION': {
    fulfilled: true,
    value: // the value the async function resolved with
  }
}
```
**NOTE:** use of the value field is generally discouraged. It would be overwritten if `myAction` is triggered again. Save values elsewhere in the store if this action gets triggered multiple times in the life of the application.

If the async function rejects, it will be updated to:
```javascript
{
  'MY_ACTION': {
    rejected: true,
    error: // the reason the async function rejected
  }
}
```

Sometimes you need to remove the promise inspection to reset the status if the action is called again later. That can be accomplished with:
```javascript
import { promiseInspectionsActions } from 'redux-promise-inspections'

// ...
dispatch(promiseInspectionsActions.reset('MY_ACTION'))
// ...
```
This will remove the 'MY_ACTION' key from the `promiseInspections` section of the store.

### Usage in React components

One way to make use of these in react components in as follows:

```jsx
// Presentational Component
import { Component } from 'react'
import { isFulfilled } from 'redux-promise-inspections'

export class MyPage extends Component {
  componentDidMount() {
    this.props.myAction()
  }

  isLoaded() {
    return isFulfilled(this.props.myActionStatus)
  }

  render() {
    return this.isLoaded() ? (
      <div> My Content</div>
    ) : (
      <div> My loading spinner </div>
    )
  }
}

// Container Component
import { connect } from 'react-redux'
import actions from '<path to application actions>'

const mapDispatchToProps = {
  return {
    myAction: actions.myAction
  }
}

const mapStateToProps = (state) => {
  return {
    myActionStatus: state.promiseInspections['MY_ACTION']
  }
}

export class MyPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyPage)
```

The following helpers are provided:
```
getError(status)
getValue(status)
isFulfilled(status)
isPending(status)
isRejected(status)
```
`status` should be an object stored in `promiseInspections`. These functions account for the status being undefined and return the proper default value if that is the case.
