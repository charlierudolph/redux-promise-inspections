import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  promiseInspectionsActions,
  promiseInspectionsReducer,
  inspectPromise,
} from '../src'
import { createActions, handleActions } from 'redux-actions'
import Promise from 'bluebird'
import reduxThunk from 'redux-thunk'

const { data: dataActions } = createActions({
  DATA: {
    SET: undefined,
    RESET: undefined,
  },
})

const dataReducer = handleActions(
  {
    'DATA/SET': (state, { payload }) => {
      return payload
    },
    'DATA/RESET': (state, { payload }) => {
      return null
    },
  },
  null
)

const fetchActionSuccess = () =>
  inspectPromise('FETCH/SUCCESS', async (dispatch, getState) => {
    dispatch(dataActions.reset())
    await Promise.delay(50)
    dispatch(dataActions.set(1))
  })

const fetchActionFailure = () =>
  inspectPromise('FETCH/FAILURE', async (dispatch, getState) => {
    dispatch(dataActions.reset())
    await Promise.delay(50)
    throw new Error('my error')
  })

export const actions = {
  data: dataActions,
  fetch: {
    failure: fetchActionFailure,
    success: fetchActionSuccess,
  },
  promiseInspections: promiseInspectionsActions,
}

export const buildStore = () => {
  const reducer = combineReducers({
    data: dataReducer,
    promiseInspections: promiseInspectionsReducer,
  })
  return createStore(reducer, applyMiddleware(reduxThunk))
}
