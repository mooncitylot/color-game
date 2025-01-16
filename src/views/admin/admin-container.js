// @ts-nocheck
import { LitElement, html, css } from 'lit'

import { setColor } from '../../utility/firebase-utils.js'
import { set } from 'firebase/database'
import { reset, generateRandomColorScheme } from '../../utility/color-db.js'

import { generateBotScores } from '../../utility/leaderboard-service.js'

import LeaderboardContainer from '../leaderboard/leaderboard-container.js'
export class AdminContainer extends LitElement {
  static properties = {
    unlocked: { type: Boolean },
    randomColor: { type: Object },
  }

  constructor() {
    super()
    this.unlocked = false
    this.newColor = {
      red: 0,
      green: 0,
      blue: 0,
      name: '',
      date: 0,
    }
  }

  async createColor() {
    this.newColor = await generateRandomColorScheme()
    this.requestUpdate()
  }

  checkPassword() {
    const input = this.shadowRoot.querySelector('input')
    if (input.value === '1234') {
      console.log('correct password')
      this.unlocked = true
    } else {
      alert('Incorrect password')
    }
  }

  /**
   * @param {{ preventDefault: () => void; target: any; }} event
   */
  handleFormSubmit(event) {
    event.preventDefault() // Prevents the default form submission behavior

    const form = event.target
    const date = new Date(form.date.value) // Convert string to Date object
    const formattedDate = this.dateFormat(date)
    setColor(this.newColor.red, this.newColor.green, this.newColor.blue, this.newColor.name, formattedDate)

    alert('Color added')
  }

  dateFormat(date) {
    const day = String(date.getDate() + 1).padStart(2, '0')
    let month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return month + day + year
  }

  resetAndAlert() {
    alert('Resetting the database')
    reset()
  }

  render() {
    return html`
      ${this.unlocked
        ? ''
        : html` <div class="wrapper">
            <h3>Enter Passphrase</h3>
            <input type="password" />
            <button @click=${this.checkPassword}>Submit</button>
          </div>
      </div>`}
      ${this.unlocked ? this.renderContent() : ''}
    `
  }

  generateBotScores() {
    generateBotScores()
  }

  renderContent() {
    return html` <div class="wrapper">
      <button @click=${() => this.createColor()}>Generate New Color</button>
      <h1>${this.newColor.name}</h1>
      <div
        class="preview"
        style="background-color: rgb(${this.newColor.red}, ${this.newColor.green}, ${this.newColor.blue})"
      ></div>
      <form @submit="${this.handleFormSubmit}">
        <input id="date" type="date" name="date" id="dateInput" />
        <button type="submit">Submit Color</button>
      </form>
      <button class="login-option-1" @click=${this.resetAndAlert}>Reset for testing purposes</button>
      <button class="login-option-1" @click=${this.generateBotScores}>Generate 10 Bot Scores</button>
      <leaderboard-container></leaderboard-container>
    </div>`
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      font-family: Roboto, sans-serif;
    }
    input {
      width: 100px;
      font-size: 16px; /* Prevent zooming on iOS */
    }

    .preview {
      width: 100px;
      height: 100px;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto;
      width: 100px;
      gap: 16px;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    input {
      width: 100px;
    }
  `
}

customElements.define('admin-container', AdminContainer)
export default AdminContainer
