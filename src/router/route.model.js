/** @typedef {Object<string, string>} Paths */

/**
 * @typedef {Object} Route
 * @property {string} [id] - The route id
 * @property {string} [path] - The route path
 * @property {RegExp} [pathRegexp] - A Regexp used to match the route to its path
 * @property {string} [componentPath] - The path to the component in the views folder
 * @property {string} [componentName] - The name of the web-component
 * @property {boolean} [isPublic] - Public routes can be accessed by users that aren't logged in.
 * @property {boolean} [showNav] - Whether or not the nav bar should be shown for the route.
 * @property {boolean} [showHeader] - Whether or not the header should be shown for the route.
 * @property {boolean} [showHeaderQuickNav] - Whether or not the header quick nav should be shown for the route that has login or home icon.
 * @property {boolean} [showBackArrow] - Whether or not the header back navigation arrow should be shown in a sub route
 * @property {PermissionCheck[]} [permissions]
 *  - A function determining whether or not the user has access to the route.
 *  - If any return false, the user will be redirected to the login page.
 * @property {Object<string, Route>} [children] - The child routes of the route.
 */

/**
 * @typedef {HTMLElement & {
 *  routeEnter?: (arg0: RouteEnterArgs) => void
 * }} RouteContainerComponent
 */

/**
 * @typedef {Object} RouteContext
 * @property {SupportedParams}  params
 */

/**
 * @typedef {Object} SupportedParams
 * @property {string} [email]
 * @property {string} [id]
 */

/**
 * @typedef {(arg0: PermissionParams) => Boolean} PermissionCheck
 */

/**
 * @typedef {Object} PermissionParams
 * @property {SessionUser} sessionUser
 */

/**
 * @typedef {{nextView: Route, context: RouteContext}} RouteEnterArgs
 */
