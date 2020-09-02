import counter, { increment, decrement } from './counter'

describe('SubscriptionFields', function () {
  describe('Actions', () => {
    it('creates increment action', () => {
      expect(increment()).toEqual({
        type: 'counter/increment',
      })
      expect(decrement()).toEqual({
        type: 'counter/decrement',
      })
    })
  })

  describe('Reducers', () => {
    it('increments correctly', () => {
      expect(
        counter(4, {
          type: 'counter/increment',
        }),
      ).toEqual(5)
    })
    it('decrements correctly', () => {
      expect(
        counter(18, {
          type: 'counter/decrement',
        }),
      ).toEqual(17)
    })
  })
})
