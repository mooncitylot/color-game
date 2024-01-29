// @ts-nocheck
import sinon from 'sinon'
import { expect, fixture, html } from '@open-wc/testing'

import './app-enter.js'
import './views/login/login-container.js'

import { routes } from './router/routes.js'
import { go } from './router/router-base.js'
import AppEvents from './shared/app-events.js'
import { setSessionUser } from './shared/session.js'

describe('Testing RouterMixin and urlChange', () => {
  let el
  let componentLoaderStub

  beforeEach(async () => {
    componentLoaderStub = sinon.stub().resolves()
    el = await fixture(html`<app-enter></app-enter>`)
    el.componentLoader = componentLoaderStub
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('RouterMixin', () => {
    it('should call routeEnter when updateUI is called for component', async () => {
      const routeEnterSpy = sinon.spy()

      if (!customElements.get('test-element')) {
        customElements.define(
          'test-element',
          class extends HTMLElement {
            routeEnter = routeEnterSpy
          }
        )
      }

      el.updateUI({ componentName: 'test-element' }, {})
      expect(routeEnterSpy.calledOnce).to.be.true
    })

    it('should update current route when updateUI is called', async () => {
      const routeEnterSpy = sinon.spy()

      if (!customElements.get('test-element-dos')) {
        customElements.define(
          'test-element-dos',
          class extends HTMLElement {
            routeEnter = routeEnterSpy
          }
        )
      }

      el.updateUI({ componentName: 'test-element-dos' }, {})
      expect(routeEnterSpy.calledOnce).to.be.true
    })

    it('should dispatch a custom event when navigating to a new route', (done) => {
      window.addEventListener(
        AppEvents.ROUTE_CHANGE,
        () => {
          expect(true).to.be.true
          done()
        },
        { once: true }
      )
      go(routes.SIGNUP.path)
    })
  })

  describe('urlChange', () => {
    beforeEach(() => {
      go(routes.LOGIN.path, { test: 'params' })
    })

    it('should call updateUI when url changes', async () => {
      el.updateUI = (nextView, context) => {
        expect(context.params.test).to.equal('params')
        expect(nextView).to.equal(routes.LOGIN)
      }

      await el.urlChange()
    })

    it('should call decodeQueryStringValues to set params value', async () => {
      const decodeQueryStringValuesStub = sinon.spy(el, 'decodeQuerystringValues')

      await el.urlChange()

      expect(decodeQueryStringValuesStub).to.be.calledWith('?test=params')
      expect(decodeQueryStringValuesStub.returnValues[0]).to.deep.equal({ test: 'params' })
    })

    it('should call getRouteByPath which should return the LOGIN routeObj', async () => {
      const getRouteByPathStub = sinon.spy(el, 'getRouteByPath')

      await el.urlChange()

      expect(getRouteByPathStub).to.be.calledWith('/login')
      expect(getRouteByPathStub.returnValues[0]).to.deep.equal(routes.LOGIN)
    })
  })
})

describe('Additional Tests for RouterMixin and urlChange', () => {
  let el

  beforeEach(async () => {
    el = await fixture(html`<app-enter></app-enter>`)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should correctly identify route permissions', () => {
    const routeObj = {
      permissions: [() => false],
    }
    expect(el.checkRoutePermissions(routeObj)).to.be.false
  })

  it('should set properties correctly based on provided route object and context', () => {
    const routeObj = {
      showNav: true,
      showHeader: true,
      showBackArrow: true,
      showHeaderQuickNav: true,
      path: '/test',
    }
    const context = {}

    setSessionUser({ id: '1d937456-da64-4e5b-a6ae-373cdfe4eb29' })

    el.setRouteProperties(routeObj, context)
    expect(el.showNav).to.be.true
    expect(el.showHeader).to.be.true
    expect(el.showBackArrow).to.be.true
    expect(el.showHeaderQuickNav).to.be.true
    expect(el.current.nextView).to.equal(routeObj)
    expect(el.current.context).to.equal(context)
  })

  it('should update UI correctly', async () => {
    const routeEnterSpy = sinon.spy()
    const componentName = 'test-element-update-ui'

    if (!customElements.get(componentName)) {
      customElements.define(
        componentName,
        class extends HTMLElement {
          routeEnter = routeEnterSpy
        }
      )
    }
    const nextView = { componentName: componentName }
    const context = {}

    await el.updateUI(nextView, context)

    expect(routeEnterSpy.calledOnce).to.be.true
    expect(el.shadowRoot.querySelector('slot').firstElementChild.nodeName.toLowerCase()).to.equal(componentName)
  })
})
