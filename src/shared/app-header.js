import { LitElement, css, html } from 'lit'
import BackArrowElement from './back-arrow.js'
import { go } from '../router/router-base.js'
import routes from '../router/routes.js'
import getRoutes from '../router/routes.js'
import AppEvents from '../shared/app-events.js'

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
        <div style="display: flex; justify-content: center; align-items: center;" class="${this.hideButton ? '' : ''}">
          <svg
            @click=${() => {
              go(routes.DASHBOARD.path)
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha">
              <path fill="#D9D9D9" d="M0 0h24v24H0z" />
            </mask>
            <g mask="url(#a)">
              <path fill="#515151" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6H4Z" />
            </g>
          </svg>
        </div>
        <!-- <h1>Color Game</h1> -->
      </div>
    `
  }

  static styles = css`
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      width: 100vw;
      margin-bottom: 100px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      background-color: #f2efe5;
      font-family: 'Arial';
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }
    .rainbow-container {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
      position: absolute;
      left: 16px;
      cursor: pointer;
      height: 40px;
      width: 40px;
    }
    .hide {
      display: none;
    }
  `
}

customElements.define('app-header', AppHeaderElement)
export default AppHeaderElement
