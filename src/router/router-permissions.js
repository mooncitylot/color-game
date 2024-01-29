/** @type {PermissionCheck} */
export function userIsLoggedIn(options) {
  return !!options.sessionUser?.id
}
