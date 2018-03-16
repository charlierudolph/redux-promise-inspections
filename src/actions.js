import { createActions } from 'redux-actions'

const { promiseInspections: actions } = createActions({
  PROMISE_INSPECTIONS: {
    FULFILLED: undefined,
    PENDING: undefined,
    REJECTED: undefined,
    RESET: undefined,
  },
})

export default actions
