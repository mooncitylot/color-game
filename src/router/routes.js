import { pathToRegexp } from 'path-to-regexp'
import { userIsLoggedIn } from './router-permissions.js'

/**
 * @param {string} path
 * @returns {string}
 * */
export function getComponentName(path) {
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path

  return `${trimmedPath.replace(/\//g, '-')}-container`
}
/** @param {string} path */
export function getComponentPath(path) {
  return `${path}/${getComponentName(path)}`
}

/**
 * Extracts the path from route or parent.
 * @param {Route|null} parent - The parent route object.
 * @param {Route} route - The route object to process.
 * @returns {string} - The processed path string.
 */
export function extractPath(parent, route) {
  return (parent ? `${parent.path}/${route.id}` : `/${route.id}`).toLowerCase().replace('_', '-')
}

/**
 * Processes a single route object and adds the pathToRegexp property.
 * @param {string} key - The key of the route object.
 * @param {Route} route - The route object to process.
 * @param {Route|null} parent - The parent route object.
 * @returns {Route} - The processed route object.
 */
export function processRoute(key, route, parent = null) {
  route.id = route.id || key
  const path = route.path || extractPath(parent, route)
  const componentName = route.componentName || getComponentName(path)
  const componentPath = route.componentPath || getComponentPath(path)

  // Any sub routes should have a back arrow
  const showBackArrow = route.hasOwnProperty('showBackArrow') ? route.showBackArrow : !!parent

  const processed = {
    id: route.id,
    path,
    pathRegexp: pathToRegexp(path),
    componentPath,
    componentName,
    isPublic: route.isPublic || false,
    showNav: route.showNav || false,
    showBackArrow,
    showHeader: route.showHeader ?? true,
    showHeaderQuickNav: route.showHeaderQuickNav || false,
    permissions: route.permissions || [],
    children: route.children || {},
    disabled: route.disabled || false,
  }

  // After parent is initialized, we can process the child routes
  processed.children = processRoutes(processed.children, processed)

  return processed
}

/**
 * Processes the given route objects and adds the pathToRegexp property.
 * @param {Object<string, Route>} routes - The route objects to process.
 * @param {Route|null} parent - The parent route object.
 * @returns {Object<string, Route>} - The processed route objects.
 */
function processRoutes(routes, parent = null) {
  return Object.entries(routes).reduce((acc, [key, route]) => {
    // @ts-ignore
    acc[key] = processRoute(key, route, parent)
    return acc
  }, {})
}

export const routes = processRoutes({
  LOGIN: {
    isPublic: true,
    children: {
      FORGOT_PASSWORD: {
        isPublic: true,
      },
    },
  },
  SIGNUP: {
    isPublic: true,
  },
  DASHBOARD: {
    isPublic: true,
  },
  COLOR_SCAN: {
    isPublic: false,
    permissions: [userIsLoggedIn],
  },
  RESULTS: {
    isPublic: false,
    permissions: [userIsLoggedIn],
  },
  ADMIN: {
    isPublic: false,
    permissions: [userIsLoggedIn],
  },
  SANDBOX: {
    isPublic: true,
    permissions: [userIsLoggedIn],
  },
  TUTORIAL: {
    isPublic: true,
    permissions: [userIsLoggedIn],
  },
  LEADERBOARD: {
    permissions: [userIsLoggedIn],
  },
  DEMO_MODE: {
    isPublic: true,
  },
})

export default routes
