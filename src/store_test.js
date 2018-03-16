import { describe, beforeEach, it } from 'mocha'
import { actions, buildStore } from '../test/fetch_store'
import { expect } from 'chai'

describe('usage in a redux store', () => {
  let store

  beforeEach(() => {
    store = buildStore()
  })

  describe('an async action that resolves', () => {
    it('is set to pending when in progress', async () => {
      const fetchPromise = store.dispatch(actions.fetch.success())
      expect(store.getState().promiseInspections).to.eql({
        'FETCH/SUCCESS': { pending: true },
      })
      await fetchPromise
    })

    it('is set to fulfilled once it completes', async () => {
      await store.dispatch(actions.fetch.success())
      expect(store.getState().promiseInspections).to.eql({
        'FETCH/SUCCESS': { fulfilled: true, value: undefined },
      })
    })

    it('resetting clears the promise inspection', async () => {
      await store.dispatch(actions.fetch.success())
      store.dispatch(actions.promiseInspections.reset('FETCH/SUCCESS'))
      expect(store.getState().promiseInspections).to.eql({})
    })
  })

  describe('an async action that rejects', () => {
    it('is set to pending when in progress', async () => {
      const fetchPromise = store.dispatch(actions.fetch.failure())
      expect(store.getState().promiseInspections).to.eql({
        'FETCH/FAILURE': { pending: true },
      })
      try {
        await fetchPromise
      } catch (e) {}
    })

    it('is set to fulfilled once it completes', async () => {
      let error
      try {
        await store.dispatch(actions.fetch.failure())
      } catch (e) {
        error = e
      }
      expect(error).to.be.instanceOf(Error)
      expect(store.getState().promiseInspections).to.eql({
        'FETCH/FAILURE': { rejected: true, error },
      })
    })

    it('resetting clears the promise inspection', async () => {
      try {
        await store.dispatch(actions.fetch.failure())
      } catch (e) {}
      store.dispatch(actions.promiseInspections.reset('FETCH/FAILURE'))
      expect(store.getState().promiseInspections).to.eql({})
    })
  })
})
