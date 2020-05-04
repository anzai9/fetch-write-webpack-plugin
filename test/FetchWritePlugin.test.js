import { standardizeFilePath } from '../lib/index'

describe('standardizeFilePath', () => {
  it('would return standard path and name', () => {
    const mockData = {
      name: '\\a\\filename',
      path: '\\foo\\bar'
    }

    const result = standardizeFilePath(mockData)

    expect(result).toEqual({ name: '/a/filename', path: '/foo/bar' })
  })

  it('would return undefined value both name and path while the both values are undefined', () => {
    const mockData = {
      name: undefined,
      path: undefined
    }

    const result = standardizeFilePath(mockData)

    expect(result).toEqual({ name: undefined, path: undefined })
  })
})
