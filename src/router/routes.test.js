// @ts-nocheck

import { processRoute } from './routes.js'

describe('processRoute', () => {
  it('should process a route without a parent route', () => {
    const key = 'TEST'
    const route = {
      isPublic: true,
    }
    const expectedRoute = {
      id: 'TEST',
      path: '/test',
      pathRegexp: expect.any(RegExp), // RegExp from pathToRegexp
      componentPath: '/test/test-container',
      componentName: 'test-container',
      isPublic: true,
      showNav: false,
      showBackArrow: false,
      showHeader: true,
      showHeaderQuickNav: false,
      permissions: [],
      children: {},
    }

    expect(processRoute(key, route)).toEqual(expectedRoute)
  })

  it('should process a route with a parent route', () => {
    const key = 'CHILD'
    const route = {
      isPublic: false,
    }
    const parentRoute = {
      id: 'PARENT',
      path: '/parent',
      pathRegexp: expect.any(RegExp), // RegExp from pathToRegexp
      componentPath: '/parent/parent-container',
      componentName: 'parent-container',
      isPublic: false,
      showNav: false,
      showBackArrow: false,
      showHeader: true,
      showHeaderQuickNav: false,
      permissions: [],
      children: {},
    }
    const expectedRoute = {
      id: 'CHILD',
      path: '/parent/child',
      pathRegexp: expect.any(RegExp), // RegExp from pathToRegexp
      // parent included in path
      componentPath: '/parent/child/parent-child-container',
      // parent included in component name
      componentName: 'parent-child-container',
      isPublic: false,
      showNav: false,
      showBackArrow: true,
      showHeader: true,
      showHeaderQuickNav: false,
      permissions: [],
      children: {},
    }

    expect(processRoute(key, route, parentRoute)).toEqual(expectedRoute)
  })
})
