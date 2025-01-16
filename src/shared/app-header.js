//@ts-nocheck
import { LitElement, css, html } from 'lit'
import BackArrowElement from './back-arrow.js'
import { go } from '../router/router-base.js'
import routes from '../router/routes.js'
import getRoutes from '../router/routes.js'
import AppEvents from '../shared/app-events.js'
import { logoutIcon, homeIcon } from '../assets/icons.js'
import { getCurrentUser } from '../utility/auth-service.js'
import { LevelViewer } from './level-viewer.js'

class AppHeaderElement extends LitElement {
  static properties = {
    user: { type: Object },
    profilePic: { type: String },
  }

  constructor() {
    super()
    this.user = null
    this.profilePic = ''
    this.currentLocation = window.location.pathname
    this.hideButton = this.currentLocation === '/dashboard'
  }

  async connectedCallback() {
    super.connectedCallback()
    this.user = await getCurrentUser()
    this.profilePic = this.user?.additionalData?.profilePic || ''
    window.addEventListener('update-header', async () => {
      this.user = await getCurrentUser()
      this.profilePic = this.user?.additionalData?.profilePic || ''
      this.requestUpdate()
    })
    this.requestUpdate()
  }

  render() {
    return html`
      <div class="header">
        <div class="header-left" @click=${() => go(routes.DASHBOARD.path)}>
          <h1>The Color Game</h1>
          ${this.user?.additionalData?.level ? html`<level-viewer></level-viewer>` : ''}
        </div>
        ${this.profilePic
          ? html` <div class="profile-pic" style="background-image: url('${this.profilePic}')"></div> `
          : ''}
      </div>
    `
  }

  static styles = css`
    svg {
      scale: 4;
      margin-left: 40px;
    }
    .header {
      display: flex;
      justify-content: left;
      align-items: center;
      align-content: center;
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

    .header-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .header-left > h1 {
      margin: 0;
      font-family: 'Arial';
      color: #515151;
      font-size: 24px;
    }
    .header-left > level-viewer {
      margin: 0;
    }

    .header > h1 {
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
    .profile-pic {
      position: absolute;
      right: 32px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ccc;
      background-size: cover;
      background-position: center;
      border: 4px solid grey;
      cursor: pointer;
    }
  `
}

customElements.define('app-header', AppHeaderElement)
export default AppHeaderElement
