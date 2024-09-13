// @ts-nocheck
import { html, css, LitElement } from 'lit'
import { setUserData, getUserData } from '../../utility/firebase-utils.js'
import { getCurrentUser } from '../../utility/auth-service.js'

class SandboxContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
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
      cursor: pointer;
    }
  `

  async connectedCallback() {
    super.connectedCallback()
    this.user = await getCurrentUser()
    console.log(this.user?.additionalData?.profilePic)
    this.requestUpdate()
  }

  async getUserData() {
    const response = await getUserData('mj6hwyBTMsMWtgl5SeuzxPfJMZc2')
    console.log(response)
  }

  render() {
    if (!this.user) {
      return html`<p>Loading...</p>`
    }
    return html`
      <h1>Sandbox</h1>
      <div class="profile-pic" style="background-image: url('${this.user.additionalData?.profilePic || ''}')"></div>
    `
  }
}

customElements.define('sandbox-container', SandboxContainer)
