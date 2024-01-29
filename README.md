# Kula Dao App Template

A ready to go app with router, build, and tests, ready to go for your next project.

## Prerequisites

1. NVM installed (or npm and node v18.12.1 installed)

## Getting Started

### Run The App

1. `npm install`
2. `npm run start`

### Test Routes

These routes will show you a view header.

- `/login`
- `/signup`
- `/login/forgot-password`

### Setting Up Environment Variables

_While variables are required for tracing, defaults are already in place to start local development. An .env file is not even necessary to start._

1. Copy `.env.example` to `.env`
2. Add appropriate environment variables to `.env`

For more information on routes, see the [Router](#router) section.

## Typing

We use [JSDoc](https://jsdoc.app/) to type our code. This allows opt in typing where needed, without having to commit to a full typing solution or extra build layer.

An example of a model declaratin with jsDocs can be found in `src/demo/demo-component.model.js`.

Any new models should be added to the `src/models` directory. in `[your-model].model.js`.

Any models added in this way are immediately available app wide.

```js
// models/user.model.js

/**
 * @typedef {Object} User
 * @property {string} firstName
 * */

/** @type {User} */
const user = {
  firstName: 'John',
  lastName: 'Doe', // this line will throw an error because lastName is not a property of User
}
```

### Typing Guidelines

1. JsDoc is meant to be an aid, not a perfect solution. As such, in the event that there is a frustrating and time consuming typing issue, use `// @ts-ignore` to ignore the specific instance in order to keep moving so long as you have explored options on how to type it.

2. If you want to write code first, then type later, you can use `// @ts-nocheck` to ignore all typing errors in a file. Deleting it at the end of your work will reveal any spots that need further typing.

## Tests

### Unit

Unit tests are written using [Jest](https://jestjs.io/). To run the unit tests.

To run tests: `npm test:unit`

### Component

In order to get testing coverage for the components, we use @web/test-runners. This allows us to test the components in a browser environment.

To run tests: `npm run test:components`

## Router

### Creating A New View

1. Add a new view component to `src/views/[name-of-view]/[name-of-view-container].js`

_Note: See "Creating A Sub Route" for sub routes_

2. The component should have the same name as the file for it's html tag.

**[name-of-view]-container.js**

```js
import { LitElement, html, css } from 'lit'
class [NameOfView]ContainerElement extends LitElement {
  static properties = {}
  constructor() {
    super()
  }
  render() {
    return html``
  }
}
customElements.define('[name-of-view]-container', [NameOfView]ContainerElement)
export default [NameOfView]ContainerElement
```

3. Add new route in `src/router/routes.js`.

```js
export const routes = processRoutes({
  MAP: {},
})
```

_This is the bare minimum needed to build the route. The `MAP` key is used to populate any needed default values for path, componentName, etc. See the `Route` model for available options._

### Creating A Sub Route

To add a route RESOURCES as a sub-route of MAP, add it to `MAP.children`. The route configuration is same, no matter how many levels you go down.

In this example I also added CATEGORIES as a sub-route of RESOURCES.

**routes.js**

```js
export const routes = processRoutes({
  MAP: {
    children: {
      RESOURCES: {
        showNav: false,
        showHeaderQuickNav: true,
        children: {
          CATEGORIES: {},
        },
      },
    },
  },
})
```

This creates routes accessible at:

- `/map`
- `/map/resources`
- `/map/resources/categories`

and looks for the components at

- `/views/map/map-container.js`
- `/views/map/resources/map-resources-container.js`
- `/views/map/resources/categories/map-resources-categories-container.js`

### Route Configuration

#### Permissions

The permissions array is an array of functions that return a boolean. If any of the functions return false, the route will not be accessible.

Passed in arguments for the function can be seen in the `PermissionParams` type in route.model.js. For example the session user object is available.

```js
/** @type {PermissionCheck} */
function userIsLoggedIn(options) {
  return !!options.sessionUser
}
```

To add a new permission check function:

1. Add a new function to `src/router/router-permissions.js`
2. Add a new test for the function to `src/router/router-permissions.test.js`
3. Import for use in routes.js

If new options are needed for your function, make sure to update the `PermissionParams` type in `src/router/route.model.js`

### Route Lifecycle

In addition to lifecycle hooks for native web components, container components can also be given a routeEnter function. If you add a routeEnter function to your container it will be called when the route is entered, but before it is appended to the dom.

This includes information about the route as well as converts url query params to an object for use in the component.

An example can be seen in `/login` by adding `email=someemail@gmail.com`, which the login-container will use to pre-populate the email field.

## Using Global Styles

Global styles can be found in `/src/styles` and imported to a component where needed.

```js
import { globalStyles } from '../styles/global-styles.js'

class MyElement extends LitElement {
  static styles = [
    globalStyles,
    css`
      // component specific styles
      // Any css here will override global styles
    `,
  ]
}
```

If you just want global styles for a specific item like input or button, you can import the more specific styles.

```js
import { globalInputStyles } from '../styles/global-input-styles.js'

class MyElement extends LitElement {
  static styles = [
    globalInputStyles,
    css`
      // component specific styles
      // Any css here will override global styles
    `,
  ]
}
```

### Updating

Updating any global styles should be done sparingly. Please consult design before changing styles at this level. Global styles are not intended to handle all use cases, just the most common ones.

## Telemetry

This app uses open telemetry to help trace user interactions with the API. This is useful for debugging and performance monitoring.

By default telemetry is being sent to honeycomb.io.

To get started, you will need to create a honeycomb.io account and get your API KEY and add it to your `.env` file

```sh
  TELEMETRY_API_KEY=YOUR_API_KEY
```

Header and telemetry urls are already set as defaults.

### Telemetry Defaults

Currently telemetry is set to track any fetch requests made to any endpoint via the javascript fetch api.
