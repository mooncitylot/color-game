import { getCurrentUser } from '../utility/auth-service.js'

/** @type {PermissionCheck} */
export function userIsLoggedIn(options) {
  const user = getCurrentUser()
  if (!user) {
    return false
  }
  return true
}
