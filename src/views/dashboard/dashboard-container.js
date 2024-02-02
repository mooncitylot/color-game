import { LitElement, html, css } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
class DashboardContainerElement extends LitElement {
  constructor() {
    super()
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('DashboardContainerElement.routeEnter', { nextView, context })
  }

  render() {
    return html` <h1>Dashboard</h1>
      <button @click=${() => go(routes.COLOR_SCAN.path)}>Color Scanner</button>
      <button @click=${() => go(routes.LOGIN.path)}>Exit</button>`
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      font-family: 'Arial';
    }
  `
}
customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
