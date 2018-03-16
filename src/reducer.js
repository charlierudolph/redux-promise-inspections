import { handleActions } from 'redux-actions'

const defaultState = {}

const reducerMap = {
  'PROMISE_INSPECTIONS/FULFILLED': (state, { payload: { key, value } }) => {
    return {
      ...state,
      [key]: { fulfilled: true, value },
    }
  },
  'PROMISE_INSPECTIONS/PENDING': (state, { payload: key }) => {
    return {
      ...state,
      [key]: { pending: true },
    }
  },
  'PROMISE_INSPECTIONS/REJECTED': (state, { payload: { key, reason } }) => {
    return {
      ...state,
      [key]: { error: reason, rejected: true },
    }
  },
  'PROMISE_INSPECTIONS/RESET': (state, { payload: key }) => {
    const newState = { ...state }
    delete newState[key]
    return newState
  },
}

export default handleActions(reducerMap, defaultState)
