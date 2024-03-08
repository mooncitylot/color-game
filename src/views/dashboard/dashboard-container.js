//@ts
import { LitElement, html, css } from 'lit'
// @ts-ignore
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getGoalColorName, getGoalColor, getInput } from '../../utility/color-db.js'
// @ts-ignore
import ProgressBar from '../../shared/progress-bar.js'
import { getDailyHighScore, getMessage, GetLastColor } from '../../utility/color-db.js'
import {} from '../../utility/color-db.js'
import { setValue, getColor } from '../../utility/firebase-utils.js'
import lifeCount from '../../shared/life-count.js'
import { getLives } from '../../utility/color-db.js'
import FireworksElement from '../../shared/fireworks.js'
import { winIcon, loseIcon } from '../../assets/icons.js'

class DashboardContainerElement extends LitElement {
  static properties = {
    color: { type: String },
    timeRemaining: { type: Number },
    score: { type: Number },
    message: { type: String },
    disable: { type: Boolean },
    lifeCount: { type: Number },
    colorRGB: { type: Object },
    inputRGB: { type: Object },
    showResults: { type: Boolean },
  }
  constructor() {
    super()
    this.color = ''
    this.timeRemaining = this.calculateTimeRemaining()
    this.startCountdown()
    this.score = getDailyHighScore()
    this.message = getMessage(this.score)
    this.lifeCount = getLives()
    this.showResults = false
    console.log('Life', this.lifeCount)
    if (this.score < 90) {
      this.disable = true
    }
  }

  async connectedCallback() {
    super.connectedCallback()
    this.color = await getGoalColorName()
    this.colorRGB = await getGoalColor()
    this.inputRGB = await GetLastColor()
    console.log('input' + this.inputRGB)
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

  toggleResults() {
    this.showResults = !this.showResults
    console.log(this.showResults)
    this.requestUpdate()
  }
  render() {
    if (this.lifeCount === 0) {
      return this.renderYouWin()
    }
    if (this.score > 90) {
      return this.renderYouWin()
    }
    this.animateContentFadeIn()

    return this.renderDashboard()
  }

  renderDashboard() {
    return html`
      <div id="content" class="wrapper">
        ${this.disable
          ? html`<div class="stats">
              <div class="score-wrapper">
                <h4>Mystery Color:</h4>
                <h2>"${this.color}"</h2>
                <h4>Daily High Score: ${this.score}%</h4>
                <progress-bar .progress=${this.score}></progress-bar>
                <p>Score a 90% or higher to complete today's hunt!</p>
                <life-count></life-count>
              </div>
            </div> `
          : ''}
        ${this.disable
          ? html` <button class="dashboard-option" @click=${() => go(routes.COLOR_SCAN.path)}>Scan Color</button> `
          : 'Play Again Tomorrow'}
        <button class="dashboard-option" @click=${() => go(routes.TUTORIAL.path)}>How To Play</button>
        <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
      </div>
    `
  }

  renderYouLose() {
    return html` <div class="${this.showResults ? 'dimmer' : ''}"></div>

      <div class="wrapper">
        <div class="score-wrapper">
          <h1>Sorry, you lost!</h1>
          <p>Try Again Tomorrow</p>
          ${loseIcon}
          <div style="display: flex; gap: 16px;">
            <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
            <a @click=${this.toggleResults}>Results</a>
          </div>
        </div>
        <dialog-box title="Color Comparison" class=${this.showResults ? '' : 'hidden'}
          ><div>
            <p>Accuracy: ${this.score}%</p>
            <progress-bar .progress=${this.score}></progress-bar>
          </div>
          <div style="display: flex; gap: 16px;">
            <div
              class="small-result-preview"
              style="background-color: rgba(${this.colorRGB.red},${this.colorRGB.green},${this.colorRGB.blue}) "
            >
              <p>Goal Color</p>
            </div>
            <div
              class="small-result-preview"
              style="background-color: rgba(${this.inputRGB.red},${this.inputRGB.green},${this.inputRGB.blue}) "
            >
              <p>Your Color</p>
            </div>
          </div>

          <a @click=${this.toggleResults}>Close</a>
        </dialog-box>
      </div>`
  }

  renderYouWin() {
    return html` <div class="${this.showResults ? 'dimmer' : ''}"></div>

      <div class="wrapper">
        <div class="score-wrapper">
          <h1>Congratulations, you won!</h1>
          <p>See you tomorrow</p>
          ${winIcon}

          <div style="display: flex; gap: 16px;">
            <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
            <a @click=${this.toggleResults}>Results</a>
          </div>
        </div>
        <dialog-box title="Color Comparison" class=${this.showResults ? '' : 'hidden'}>
          <div>
            <p>Accuracy: ${this.score}%</p>
            <progress-bar .progress=${this.score}></progress-bar>
          </div>
          <div style="display: flex; gap: 16px;">
            <div
              class="small-result-preview"
              style="background-color: rgba(${this.colorRGB.red},${this.colorRGB.green},${this.colorRGB.blue}) "
            >
              <p>Goal Color</p>
            </div>
            <div
              class="small-result-preview"
              style="background-color: rgba(${this.inputRGB.red},${this.inputRGB.green},${this.inputRGB.blue}) "
            >
              <p>Your Color</p>
            </div>
          </div>

          <a @click=${this.toggleResults}>Close</a>
        </dialog-box>
      </div>`
  }

  static styles = css`
    a {
      color: #515151;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      text-decoration: underline;
    }
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
      font-family: 'Arial';
    }
    dialog-box {
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      top: 80px;
      gap: 24px;
      margin: auto;
      z-index: 100;
      padding: 16px;
      max-width: 500px;
      background-color: #e3e1d9;
      border: 2px solid #515151;
      border-radius: 16px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    }

    .dimmer {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
    }

    #content {
      opacity: 0;
      transition: opacity 1s;
    }
    .score-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      width: 100%;
      padding: 16px;
      background-color: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #d9d9d9;
    }
    .score-wrapper h4 {
      margin: 0;
    }
    .score-wrapper h1 {
      margin: 0;
      color: #515151;
    }
    .score-wrapper progress-bar {
      scale: 0.75;
    }
    .score-wrapper svg {
      width: 150px;
      height: 150px;
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
      text-align: center;
      gap: 24px;
      height: 100%;
      width: 80%;
    }
    .dashboard-option {
      padding: 16px;
      width: 90%;
      color: #515151;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 24px;
      font-weight: bold;
      border: 4px solid;
      border-radius: 16px;
    }
    .small-result-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      border: 4px solid #515151;
    }
    .small-result-preview p {
      font-size: 20px;
      box-shadow: 0 0 0 10 rgba(0, 0, 0, 0.5);
      color: #515151;
    }
    .hidden {
      display: none;
    }
  `
}

customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
