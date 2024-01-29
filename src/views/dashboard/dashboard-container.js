import { LitElement, html, css } from 'lit'
class DashboardContainerElement extends LitElement {
  constructor() {
    super()
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('DashboardContainerElement.routeEnter', { nextView, context })
  }

  render() {
    return html`<h1>Dashboard</h1>`
  }
}
customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
