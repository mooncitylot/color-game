import { LitElement, css, html } from 'lit'
import BackArrowElement from './back-arrow.js'
import { go } from '../router/router-base.js'
import routes from '../router/routes.js'
import getRoutes from '../router/routes.js'
import AppEvents from '../shared/app-events.js'
import { logoutIcon, homeIcon } from '../assets/icons.js'

class AppHeaderElement extends LitElement {
  constructor() {
    super()
    this.currentLocation = window.location.pathname
    console.log(this.currentLocation)
    if (this.currentLocation === '/dashboard') {
      this.hideButton = true
    } else {
      this.hideButton = false
    }
  }

  render() {
    return html`
      <div class="header">
        <div class="rainbow-container">
          <div class="rainbow-child" style="background-color: #9E4597;"></div>
          <div class="rainbow-child" style="background-color: #5574B8;"></div>
          <div class="rainbow-child" style="background-color: #429754;"></div>
          <div class="rainbow-child" style="background-color: #E19E2B;"></div>
          <div class="rainbow-child" style="background-color: #BD3339;"></div>
        </div>
        <span @click=${() => go(routes.DASHBOARD.path)}>${homeIcon}</span>
      </div>
    `
  }

  static styles = css`
    .header {
      display: flex;
      justify-content: left;
      align-items: center;
      height: 64px;
      width: 100vw;
      padding-left: 16px;
      margin-bottom: 100px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      background-color: #f2efe5;
      font-family: 'Arial';
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      gap: 16px;
      margin: 0;
    }
    .rainbow-container {
      position: absolute;
      right: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: left;
      gap: 0;
    }
    .header > h1 {
      position: absolute;
      left: 16px;
      margin: 0;
      font-family: 'Arial';
      color: #515151;
      font-size: 24px;
    }
    .rainbow-child {
      height: 64px;
      width: 16px;
    }
    svg {
      cursor: pointer;
      height: 32px;
      width: 32px;
    }
    .hide {
      display: none;
    }
  `
}

customElements.define('app-header', AppHeaderElement)
export default AppHeaderElement
