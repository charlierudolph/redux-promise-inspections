export const getError = status => (isRejected(status) ? status.error : null)
export const getValue = status => (isFulfilled(status) ? status.value : null)
export const isFulfilled = status => (status && status.fulfilled) || false
export const isPending = status => (status && status.pending) || false
export const isRejected = status => (status && status.rejected) || false
