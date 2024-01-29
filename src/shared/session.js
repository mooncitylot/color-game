const sessionVariables = {
  USER: 'user',
  USER_TOKEN: 'userToken',
  SESSION_EXPIRATION: 'sessionExpiration',
}

/** @param {{expiry: string, token: string, user?: User}} param */
export function setSessionData({ expiry, user, token }) {
  setSessionExpiration(expiry)
  setUserToken(token)
  if (user) setSessionUser(user)
}

/**
 * @param {User} user a logged in user
 * @returns
 */
export function setSessionUser({ id }) {
  /** @type {SessionUser} */
  const sessionUser = { id }

  return window.sessionStorage.setItem(sessionVariables.USER, JSON.stringify(sessionUser))
}

/** @returns {SessionUser | null} */
export function getSessionUser() {
  return JSON.parse(window.sessionStorage.getItem(sessionVariables.USER))
}

export function clearSession() {
  window.sessionStorage.clear()
}

export function deleteSessionUser() {
  window.sessionStorage.removeItem(sessionVariables.USER)
}

/** @param {string} token */
export function setUserToken(token) {
  return window.sessionStorage.setItem(sessionVariables.USER_TOKEN, token)
}

/** @returns {string} the users session token */
export function getUserToken() {
  return window.sessionStorage.getItem(sessionVariables.USER_TOKEN)
}

/** @param {string} expiry the UTC timestamp example: YYYY-MM-DDT19:00:00.000000Z */
export function setSessionExpiration(expiry) {
  return window.sessionStorage.setItem(sessionVariables.SESSION_EXPIRATION, expiry)
}

/** @returns {string} the UTC expiration timestamp example: YYYY-MM-DDT19:00:00.000000Z */
export function getSessionExpiration() {
  return window.sessionStorage.getItem(sessionVariables.SESSION_EXPIRATION)
}
