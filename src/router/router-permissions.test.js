import { userIsLoggedIn } from './router-permissions.js'

describe('userIsLoggedIn', () => {
  it('should return true if sessionUser is defined', () => {
    /** @type {PermissionParams} */
    const options = {
      sessionUser: { id: '954145b8-715c-4db4-8f01-c6fab78535fc' },
    }
    expect(userIsLoggedIn(options)).toBe(true)
  })

  it('should return false if sessionUser is undefined', () => {
    /** @type {PermissionParams} */
    const options = {
      sessionUser: null,
    }
    expect(userIsLoggedIn(options)).toBe(false)
  })
})
