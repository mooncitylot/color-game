/**
 * @typedef {{
 *  ROUTE_CHANGE: 'app:route_change',
 *  URL_UPDATED: 'app:url_updated',
 *  PAGE_LOAD: 'load',
 *  POPSTATE: 'popstate',
 *  TOAST: 'app:toast'
 * }} AppEvents
 */

/** @type {AppEvents} */
const AppEvents = {
  ROUTE_CHANGE: 'app:route_change',
  URL_UPDATED: 'app:url_updated',
  PAGE_LOAD: 'load',
  POPSTATE: 'popstate',
  TOAST: 'app:toast',
}

export default AppEvents
