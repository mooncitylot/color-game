// @ts-nocheck
import { html, css, LitElement } from 'lit'
import { setUserData, getUserData } from '../../utility/firebase-utils.js'

class SandboxContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `

  async connectedCallback() {
    super.connectedCallback()

    this.requestUpdate() // Request a re-render after setting user data
  }

  async upadateUser() {
    console.log('Setting user data')
    const userId = 'mj6hwyBTMsMWtgl5SeuzxPfJMZc2'
    const username = 'mooncitylot2'
    const points = 1234
    const profilePic = 1234
    await setUserData(userId, username, points, profilePic)
  }

  async getUserData() {
    const response = await getUserData('mj6hwyBTMsMWtgl5SeuzxPfJMZc2')
    console.log(response)
  }

  render() {
    return html`
      <h1>Sandbox</h1>
      <button @click=${() => this.upadateUser()}>Update</button>
      <button @click=${() => this.getUserData()}>Get</button>
    `
  }
}

customElements.define('sandbox-container', SandboxContainer)
