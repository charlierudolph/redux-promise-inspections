import actions from './actions'

export default (key, promiseBuilder) => async (dispatch, getState) => {
  dispatch(actions.pending(key))

  let reason
  let value
  try {
    value = await promiseBuilder(dispatch, getState)
  } catch (e) {
    reason = e
  }

  if (reason) {
    dispatch(actions.rejected({ key, reason }))
    throw reason
  } else {
    dispatch(actions.fulfilled({ key, value }))
    return value
  }
}
