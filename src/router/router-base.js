import { LitElement } from 'lit'

import { routes } from './routes.js'
import AppEvents from '../shared/app-events.js'
import { getSessionUser } from '../shared/session.js'
import { appendParamsObjToPath, decodeQuerystringValues, getRouteByPath } from './router.util.js'

/**
 * @param {string} path
 * @param {SupportedParams} params
 * */
export function go(path, params = null) {
  if (getRouteByPath(path, routes)) {
    window.history.pushState(null, null, params ? appendParamsObjToPath(path, params) : path)
    window.dispatchEvent(new CustomEvent(AppEvents.ROUTE_CHANGE))
  }
}

/**
 * @param {Object} params
 */
export function updateUrlParams(params) {
  const url = new URL(window.location.href)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  window.history.pushState(null, null, url)
}

/**
 * @param {Array<string>} params
 */
export function removeUrlParams(params) {
  const url = new URL(window.location.href)
  params.forEach((p) => url.searchParams.delete(p))
  window.history.pushState(null, null, url)
}

const componentLoader = (/** @type {string} */ pathname) => import(`./../views${pathname}.js`)

export default class RouterBase extends LitElement {
  static properties = {
    current: { type: Object },
    showNav: { type: Boolean },
    showHeader: { type: Boolean },
    showBackArrow: { type: Boolean },
    showHeaderQuickNav: { type: Boolean },
  }
  constructor() {
    super()

    /** @type {RouteEnterArgs} */
    this.current = null
    /** @type {Boolean} Route property (showMobileNav). If true, displays mobile nav bar */
    this.showMobileNav = null
    /** @type {Boolean} Route property (showNav). If true, displays header bar for the app */
    this.showHeader = null
    /** @type {function} */
    this.getRouteByPath = getRouteByPath
    /** @type {function} */
    this.decodeQuerystringValues = decodeQuerystringValues
    /** @type {RouteEnterArgs} */
    // Handle direct url routing (including initial page load)
    window.addEventListener(AppEvents.PAGE_LOAD, () => this.urlChange(), false)
    // Handle back and forward button events
    window.addEventListener(AppEvents.POPSTATE, () => this.urlChange(), false)
  }

  connectedCallback() {
    super.connectedCallback()

    window.addEventListener(AppEvents.ROUTE_CHANGE, () => this.urlChange(), false)
  }

  /** @param {Route} routeObj */
  checkRoutePermissions(routeObj) {
    /** @type {PermissionParams} */
    const options = {
      sessionUser: getSessionUser(),
    }

    return !routeObj.permissions.some((permission) => !permission(options))
  }

  /**
   * @param {Route} routeObj
   * @param {RouteContext} context
   * */
  setRouteProperties(routeObj, context) {
    Object.assign(this, {
      showNav: routeObj.showNav && !!getSessionUser()?.id,
      showHeader: routeObj.showHeader == true,
      showBackArrow: routeObj.showBackArrow == true,
      showHeaderQuickNav: routeObj.showHeaderQuickNav,
      current: { nextView: routeObj, context },
    })
  }

  async urlChange() {
    if (window.location.pathname === '/') return go(routes.LOGIN.path)

    const routeObj = this.getRouteByPath(window.location.pathname, routes)
    if (!routeObj) return this.updateSlot(document.createElement('not-found'))
    if (!routeObj || !this.checkRoutePermissions(routeObj)) return go(routes.LOGIN.path)

    /**
     * @description converts querystring to object (e.g. ?name=Sue&age=43 -> { name: 'Sue', age: 43 })
     * @type {RouteContext}
     * */
    const context = {
      params: this.decodeQuerystringValues(window.location.search),
    }

    try {
      /** Load component file, which registers the custom elemnent with the DOM */
      await componentLoader(routeObj.componentPath)
    } catch (error) {
      return this.updateSlot(document.createElement('not-found'))
    }

    this.setRouteProperties(routeObj, context)
    this.updateUI(routeObj, context)
  }

  /**
   * @param {Route} nextView
   * @param {RouteContext} context
   * */
  async updateUI(nextView, context) {
    const component = /** @type {RouteContainerComponent} */ (document.createElement(nextView.componentName))

    // If component has a route enter, call it before appending it to the DOM
    component.routeEnter && (await component.routeEnter({ nextView, context }))

    this.updateSlot(component)
  }

  /** @param {RouteContainerComponent} component */
  updateSlot(component) {
    const slot = this.shadowRoot.querySelector('slot')
    slot.innerHTML = ''
    slot.append(component)
  }
}

/**
 * Chrome fires popstate on load, unlike Firefox and Safari which do not
 * This prevents that behavior and makes Chrome function like FF and S
 */
;(function () {
  let blockPopstateEvent = document.readyState != 'complete'
  window.addEventListener(
    'load',
    () =>
      // The timeout ensures that popstate-events will be unblocked right
      // after the load event occured, but not in the same event-loop cycle.
      setTimeout(function () {
        blockPopstateEvent = false
      }, 0),
    false
  )
  window.addEventListener(
    'popstate',
    (evt) => {
      if (blockPopstateEvent && document.readyState == 'complete') {
        evt.preventDefault()
        evt.stopImmediatePropagation()
      }
    },
    false
  )
})()
