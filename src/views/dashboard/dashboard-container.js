import { LitElement, html, css } from 'lit'
// @ts-ignore
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getGoalColorName } from '../../utility/color-db.js'
// @ts-ignore
import ProgressBar from '../../shared/progress-bar.js'
import { getDailyHighScore, getMessage } from '../../utility/color-db.js'
import {} from '../../utility/color-db.js'

import { setValue, getColor } from '../../utility/firebase-utils.js'

class DashboardContainerElement extends LitElement {
  static properties = {
    color: { type: String },
    timeRemaining: { type: Number },
    score: { type: Number },
    message: { type: String },
    disable: { type: Boolean },
  }
  constructor() {
    super()
    this.animateContentFadeIn()
    this.color = ''
    this.timeRemaining = this.calculateTimeRemaining()
    this.startCountdown()
    this.score = getDailyHighScore()
    this.message = getMessage(this.score)
    if (this.score < 90) {
      this.disable = true
    }
  }

  async connectedCallback() {
    super.connectedCallback()
    this.color = await getGoalColorName()
    console.log('Dashboard', this.color)
    this.requestUpdate()
  }

  calculateTimeRemaining() {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    return midnight.getTime() - now.getTime()
  }

  startCountdown() {
    setInterval(() => {
      this.timeRemaining = this.calculateTimeRemaining()
      this.requestUpdate()
    }, 1000)
  }

  /**
   * @param {number} milliseconds
   */
  formatTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60)
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
    return `${hours.toString().padStart(2, '0')} hrs  ${minutes.toString().padStart(2, '0')} mins ${seconds
      .toString()
      .padStart(2, '0')} sec`
  }

  animateContentFadeIn() {
    requestAnimationFrame(() => {
      const content = this.shadowRoot.getElementById('content')
      setTimeout(() => {
        content.style.opacity = '1'
      }, 250)
    })
  }

  render() {
    return html`
      <div id="content" class="wrapper">
        ${this.disable
          ? html`<div class="stats">
              <h4>Color of the Day:</h4>
              <h2>"${this.color}"</h2>
              <div class="score-wrapper">
                <h4>Daily High Score: ${this.score}%</h4>
                <progress-bar .progress=${this.score}></progress-bar>
                <p>Score a 90% or higher to complete today's hunt!</p>
                <!-- <p>Time Remaining: <span>${this.formatTime(this.timeRemaining)}</span></p> -->
              </div>
            </div> `
          : ''}
        ${this.disable
          ? html` <button class="dashboard-option" @click=${() => go(routes.COLOR_SCAN.path)}>Scan a Color</button> `
          : 'Play Again Tomorrow'}
        <button class="dashboard-option" @click=${() => go(routes.LOGIN.path)}>Exit</button>
      </div>
    `
  }

  static styles = css`
    a {
      color: #515151;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
    }
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      font-family: 'Arial';
    }
    #content {
      opacity: 0;
      transition: opacity 1s;
    }
    .score-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin: 32px auto 32px auto;
    }
    .score-wrapper h4 {
      margin: 0;
    }
    .stats {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 80%;
      gap: 8px;
    }
    .stats p {
      margin: 0;
      text-align: center;
      color: #515151;
      font-size: 24px;
    }
    .stats h4 {
      margin: 0;
      text-align: center;
      color: #515151;
    }
    .stats h2 {
      margin: 0;
      text-align: center;
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
      width: 240px;
      color: #515151;
      background-color: #e3e1d9;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 24px;
      font-weight: bold;
      border: 4px solid;
      border-radius: 16px;
    }
  `
}

customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
