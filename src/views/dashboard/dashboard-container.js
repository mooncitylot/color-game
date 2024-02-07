import { LitElement, html, css } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getGoalColorName } from '../../utility/color-db.js'
class DashboardContainerElement extends LitElement {
  constructor() {
    super()
    this.color = getGoalColorName()
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('DashboardContainerElement.routeEnter', { nextView, context })
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="stats">
          <h2>Color of the Day: <span>"${this.color}"</span></h2>
          <h3>Time Remaining: <span>00:00:00</span></h3>
          <h3>Today's Attempts: <span>0</span></h3>
        </div>
        <button class="dashboard-option" @click=${() => go(routes.COLOR_SCAN.path)}>Color Grabber</button>
        <button class="dashboard-option" @click=${() => go(routes.LOGIN.path)}>Exit</button>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      font-family: 'Arial';
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      height: 100%;
    }
    .dashboard-option {
      padding: 16px;
      border-radius: 8px;
      border: none;
      width: 240px;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  `
}
customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
