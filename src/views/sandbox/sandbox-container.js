// @ts-nocheck
import { html, css, LitElement } from 'lit'
import { setUserData, getUserData } from '../../utility/firebase-utils.js'
import { getCurrentUser, getAllUsers } from '../../utility/auth-service.js'
import { saveToDailyLeaderboard, getDailyLeaderboard } from '../../utility/leaderboard-service.js'
import { autoSetColor } from '../../utility/firebase-utils.js'
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
    console.log('getting', await getAllUsers())
    this.requestUpdate()
    this.autoSetColor()
  }

  async getUserData() {
    const response = await getUserData('mj6hwyBTMsMWtgl5SeuzxPfJMZc2')
    console.log(response)
  }

  async saveScore() {
    await saveToDailyLeaderboard(10)
  }

  async getScore() {
    const leaderboard = await getDailyLeaderboard()
    console.log(leaderboard)
  }

  async autoSetColor() {
    await autoSetColor()
  }

  render() {
    if (!this.user) {
      return html`<p>Loading...</p>`
    }
    return html`
      <h1>Sandbox</h1>
      <button @click=${this.saveScore}>Save Score</button>
      <button @click=${this.getScore}>Get Leaderboard</button>
    `
  }
}

customElements.define('sandbox-container', SandboxContainer)
