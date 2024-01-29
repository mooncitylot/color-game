import {
  appendParamsObjToPath,
  decodeQuerystringValues,
  _arrayFromQsList,
  _normalizeQsValue,
  getRouteByPath,
} from './router.util.js'
import { routes } from './routes.js'

describe('appendParamsObjToPath', () => {
  test('getRouteByPath', () => {
    // Test top level routes
    Object.values(routes).forEach((route) => {
      expect(getRouteByPath(route.path, routes)).toEqual(route)
    })

    // Test nested routes for LOGIN FORGOT_PASSWORD
    expect(getRouteByPath('/login/forgot-password', routes)).toEqual(routes.LOGIN.children.FORGOT_PASSWORD)

    // Test no route matches returns null
    expect(getRouteByPath('/some/invalid/path', routes)).toEqual(null)
  })

  test('should handle trailing slashes', () => {
    expect(getRouteByPath('/login/', routes)).toEqual(routes.LOGIN)
  })

  test('should append extra params if params already exist', () => {
    expect(appendParamsObjToPath('?some=param', { number: 9 })).toEqual('?some=param&number=9')
  })

  test('should append params if no params already exist', () => {
    expect(appendParamsObjToPath('', { number: 9 })).toEqual('?number=9')
  })

  test('should handle multiple parameters', () => {
    expect(appendParamsObjToPath('', { number: 9, string: 'test' })).toEqual('?number=9&string=test')
  })

  test('should encode values appropriately', () => {
    // Should encode the + symbol appropriately
    const params = {
      email: 'j+admin@gmail.com',
      bool: true,
    }

    expect(appendParamsObjToPath('', params)).toEqual('?email=j%2Badmin%40gmail.com&bool=true')
  })
})
describe('decodeQuerystringValues', () => {
  test('should return boolean strings as boolean values', () => {
    expect(decodeQuerystringValues('?bool=true')).toEqual({ bool: true })
    expect(decodeQuerystringValues('?bool=false')).toEqual({ bool: false })
  })

  test('should return number strings as numbers', () => {
    expect(decodeQuerystringValues('?num=1')).toEqual({ num: 1 })
  })

  test('should return encoded as normal symbol', () => {
    expect(decodeQuerystringValues('?email=j%2Badmin%40gmail.com')).toEqual({
      email: 'j+admin@gmail.com',
    })
  })

  test('should return array strings as array', () => {
    expect(decodeQuerystringValues('?list=1,2,3')).toEqual({ list: [1, 2, 3] })
  })

  test('should handle empty string values', () => {
    expect(decodeQuerystringValues('?string=')).toEqual({ string: '' })
  })

  test('_normalizeQsValue', () => {
    expect(_normalizeQsValue('true')).toEqual(true)
    expect(_normalizeQsValue('false')).toEqual(false)
    expect(_normalizeQsValue('0')).toEqual(0)
    expect(_normalizeQsValue('1')).toEqual(1)
    expect(_normalizeQsValue('')).toEqual('')
    expect(_normalizeQsValue('some string')).toEqual('some string')
    expect(_normalizeQsValue('some string,another string')).toEqual(['some string', 'another string'])
    expect(_normalizeQsValue('1,2,3')).toEqual([1, 2, 3])
    expect(_normalizeQsValue('true,false')).toEqual([true, false])
    expect(_normalizeQsValue('true,false,1,2,3')).toEqual([true, false, 1, 2, 3])
  })

  test('_arrayFromQsList', () => {
    expect(_arrayFromQsList('1,2,3')).toEqual([1, 2, 3])
    expect(_arrayFromQsList('true,false')).toEqual([true, false])
    expect(_arrayFromQsList('some string,another string')).toEqual(['some string', 'another string'])
  })
})
