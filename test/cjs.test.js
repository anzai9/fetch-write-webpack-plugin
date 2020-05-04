import lib from '../lib'
import cjs from '../lib/cjs'

describe('cjs', () => {
  it('should exported cjs', () => {
    expect(cjs).toEqual(lib)
  })
})
