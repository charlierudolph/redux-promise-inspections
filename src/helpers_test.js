import { describe, it } from 'mocha'
import { isFulfilled, isRejected, isPending, getError, getValue } from './'
import { expect } from 'chai'

const fulfilledStatus = { fulfilled: true, value: 'abc' }
const pendingStatus = { pending: true }
const rejectedError = new Error('my error')
const rejectedStatus = { rejected: true, error: rejectedError }

describe('getError', () => {
  it('returns null if the status is undefined ', () => {
    expect(getError(undefined)).to.eql(null)
  })

  it('returns null if the status is fulfilled', () => {
    expect(getError(fulfilledStatus)).to.eql(null)
  })

  it('returns null if the status is pending', () => {
    expect(getError(pendingStatus)).to.eql(null)
  })

  it('returns the error if the status is rejected', () => {
    expect(getError(rejectedStatus)).to.eql(rejectedError)
  })
})

describe('getValue', () => {
  it('returns null if the status is undefined ', () => {
    expect(getValue(undefined)).to.eql(null)
  })

  it('returns the value if the status is fulfilled', () => {
    expect(getValue(fulfilledStatus)).to.eql('abc')
  })

  it('returns null if the status is pending', () => {
    expect(getValue(pendingStatus)).to.eql(null)
  })

  it('returns null if the status is rejected', () => {
    expect(getValue(rejectedStatus)).to.eql(null)
  })
})

describe('isFulfilled', () => {
  it('returns false if the status is undefined ', () => {
    expect(isFulfilled(undefined)).to.eql(false)
  })

  it('returns true if the status is fulfilled', () => {
    expect(isFulfilled(fulfilledStatus)).to.eql(true)
  })

  it('returns false if the status is pending', () => {
    expect(isFulfilled(pendingStatus)).to.eql(false)
  })

  it('returns false if the status is rejected', () => {
    expect(isFulfilled(rejectedStatus)).to.eql(false)
  })
})

describe('isPending', () => {
  it('returns false if the status is undefined ', () => {
    expect(isPending(undefined)).to.eql(false)
  })

  it('returns false if the status is fulfilled', () => {
    expect(isPending(fulfilledStatus)).to.eql(false)
  })

  it('returns true if the status is pending', () => {
    expect(isPending(pendingStatus)).to.eql(true)
  })

  it('returns false if the status is rejected', () => {
    expect(isPending(rejectedStatus)).to.eql(false)
  })
})

describe('isRejected', () => {
  it('returns false if the status is undefined ', () => {
    expect(isRejected(undefined)).to.eql(false)
  })

  it('returns false if the status is fulfilled', () => {
    expect(isRejected(fulfilledStatus)).to.eql(false)
  })

  it('returns false if the status is pending', () => {
    expect(isRejected(pendingStatus)).to.eql(false)
  })

  it('returns false if the status is rejected', () => {
    expect(isRejected(rejectedStatus)).to.eql(true)
  })
})
