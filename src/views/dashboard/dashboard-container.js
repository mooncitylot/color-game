//@ts
import { LitElement, html, css } from 'lit'
// @ts-ignore
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getGoalColorName, getGoalColor, getInput, getGameObject } from '../../utility/color-db.js'
// @ts-ignore
import ProgressBar from '../../shared/progress-bar.js'
import { getDailyHighScore, getMessage, GetLastColor } from '../../utility/color-db.js'
import { setValue, getColor } from '../../utility/firebase-utils.js'
import lifeCount from '../../shared/life-count.js'
import { getLives, saveLives } from '../../utility/color-db.js'
import FireworksElement from '../../shared/fireworks.js'
import StarsElement from '../../shared/stars.js'
import shareElement from '../../shared/share.js'
import { clearCurrentUser, getCurrentUser, updateCurrentUser } from '../../utility/auth-service.js'
import { saveToDailyLeaderboard } from '../../utility/leaderboard-service.js'
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
    showShare: { type: Boolean },
    shareMessage: { type: String },
    user: { type: Object },
    gameObject: { type: Object },
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
    this.showShare = false
    this.shareMessage = this.createShareMessage()
    this.gameObject = getGameObject()
    console.log('gameObject', this.gameObject)
    if (this.score < 90) {
      this.disable = true
    }
  }

  async connectedCallback() {
    super.connectedCallback()
    this.color = await getGoalColorName()
    this.colorRGB = await getGoalColor()
    this.inputRGB = await GetLastColor()
    const currentUser = getCurrentUser()
    this.user = currentUser.additionalData ? currentUser.additionalData.username : 'Player'
    this.requestUpdate()
    setTimeout(() => {
      this.requestUpdate()
      this.dispatchEvent(new CustomEvent('update-header', { bubbles: true, composed: true }))
    }, 1000)
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
    this.requestUpdate()
  }
  toggleShare() {
    this.showShare = !this.showShare
    this.requestUpdate()
  }
  createShareMessage() {
    return 'I scored ' + this.score + '% on the Color Game. Can you beat me? ' + 'https://the-color-game.com/login'
  }
  copyText() {
    const copyText = this.shadowRoot.getElementById('copyMe')
    const textArea = document.createElement('textarea')
    textArea.value = copyText.innerText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Copied to clipboard!')
    this.toggleShare()
  }
  render() {
    if (this.lifeCount === 0) {
      return this.renderGameOver()
    }

    this.animateContentFadeIn()

    return this.renderDashboard()
  }

  async endGame() {
    saveLives(0)
    await saveToDailyLeaderboard(this.score)
    go(routes.DASHBOARD.path)
    this.requestUpdate()
  }

  renderDashboard() {
    return html`
      <div id="content" class="wrapper">
        <div class="${this.showResults ? 'dimmer' : ''}"></div>
        <div class="stats">
          <div class="score-wrapper">
            <h4>Mystery Color:</h4>
            <h2 class="do-hyeon-h2">${this.color}</h2>
            <h4>Daily High Score: ${this.score}%</h4>
            <progress-bar .progress=${this.score}></progress-bar>
            <a @click=${this.endGame}>Submit Score & End Game 😇</a>
            <life-count></life-count>
          </div>
        </div>
        <button class="dashboard-option" @click=${() => go(routes.COLOR_SCAN.path)}>Scan Color 🌈</button>
        <button class="dashboard-option" @click=${this.toggleResults}>Progress 📈</button>
        <button class="dashboard-option" @click=${() => go(routes.TUTORIAL.path)}>How To Play 🤓</button>
        <button class="dashboard-option" @click=${() => go(routes.LEADERBOARD.path)}>Leaderboard 🏆</button>
        <a style="border: none; text-decoration: underline;" @click=${() => clearCurrentUser()}>Log Out ${this.user}</a>

        <dialog-box title="Color Comparison" class=${this.showResults ? '' : 'hidden'}>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <progress-bar .progress=${this.score}></progress-bar>
            <div>
              <div style="display: flex; flex-direction: column; border: 4px solid #515151; border-radius: 8px;">
                ${this.gameObject
                  ? html`${Object.keys(this.gameObject).map((date) => {
                      return html`
                        ${Object.keys(this.gameObject[date]).map((lives) => {
                          return html`<div
                            class="past-result-preview"
                            style="background-color: rgba(${this.gameObject[date][lives].color.red},${this.gameObject[
                              date
                            ][lives].color.green},${this.gameObject[date][lives].color.blue})"
                          >
                            <p>Guess ${6 - (parseInt(lives) + 1)}: ${this.gameObject[date][lives].score}%</p>
                          </div>`
                        })}
                      `
                    })}`
                  : ''}
              </div>
            </div>
          </div>
          <a @click=${this.toggleResults}>Close</a>
        </dialog-box>
      </div>
    `
  }

  renderGameOver() {
    return html` <div class="${this.showResults ? 'dimmer' : ''}"></div>
      <div class="wrapper">
        <div class="score-wrapper">
          <h1>Game Over!</h1>
          <h2>Score: ${this.score}%</h2>
          <stars-element score=${this.score}></stars-element>
          <h4 style="color: grey">Play again in ${this.formatTime(this.timeRemaining)}</h4>
          <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
            <button class="dashboard-option" @click=${() => go(routes.LEADERBOARD.path)}>Leaderboard</button>
            <button class="dashboard-option" @click=${this.toggleResults}>Results</button>
            <button class="dashboard-option" @click=${this.toggleShare}>Share</button>
          </div>
          <a
            style="border: none; text-decoration: underline; color: #515151; background-color: transparent;"
            @click=${() => clearCurrentUser()}
            >Log Out ${this.user}</a
          >
          <div class="${this.showShare ? '' : 'hidden'}">
            <div class="popup">
              <div class="popup-content">
                <h1>Share your score</h1>
                <div class="share-box">
                  <p id="copyMe">${this.shareMessage}</p>
                </div>
                <button class="share-button" @click=${this.copyText}>Copy</button>
                <button class="share-button" @click=${() => go(routes.DASHBOARD.path)}>Close</button>
              </div>
            </div>
          </div>
        </div>

        <dialog-box title="Color Comparison" class=${this.showResults ? '' : 'hidden'}>
          <div></div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <progress-bar .progress=${this.score}></progress-bar>
            <div>
              <div style="display: flex; flex-direction: column; border: 4px solid #515151; border-radius: 8px;">
                <div
                  class="small-result-preview"
                  style="background-color: rgba(${this.colorRGB.red},${this.colorRGB.green},${this.colorRGB.blue}) "
                >
                  <p>${this.color}</p>
                </div>
                ${this.gameObject
                  ? html`${Object.keys(this.gameObject).map((date) => {
                      return html`
                        ${Object.keys(this.gameObject[date]).map((lives) => {
                          return html`<div
                            class="past-result-preview"
                            style="background-color: rgba(${this.gameObject[date][lives].color.red},${this.gameObject[
                              date
                            ][lives].color.green},${this.gameObject[date][lives].color.blue})"
                          >
                            <p>Guess ${6 - (parseInt(lives) + 1)}: ${this.gameObject[date][lives].score}%</p>
                          </div>`
                        })}
                      `
                    })}`
                  : ''}
              </div>
            </div>
          </div>

          <a @click=${this.toggleResults}>Close</a>
        </dialog-box>
      </div>`
  }

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

    a {
      text-decoration: underline;
      color: #515151;
      background-color: transparent;
      border: none;
      cursor: pointer;
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

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 24px;
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
    .score-wrapper h2 {
      margin: 0;
      color: #515151;
      font-family: 'Do Hyeon', sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 40px;
    }
    .score-wrapper h1 {
      margin: 0;
      color: #515151;
      font-family: 'Do Hyeon', sans-serif;
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
      align-self: center;
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
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 48px;
      margin: 0;
    }
    .small-result-preview p {
      width: 50%;
      background-color: white;
      font-size: 20px;
      box-shadow: 0 0 0 10 rgba(0, 0, 0, 0.5);
      color: #515151;
      background-color: white;
      border-radius: 8px;
      padding: 4px;
      border: 2px solid #515151;
      margin: 0;
      font-family: 'Do Hyeon', sans-serif;
    }
    .past-result-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 48px;
      margin: 0;
    }
    .past-result-preview p {
      width: 50%;
      font-size: 20px;
      box-shadow: 0 0 0 10 rgba(0, 0, 0, 0.5);
      color: #515151;
      background-color: white;
      border-radius: 8px;
      padding: 4px;
      border: 2px solid #515151;
      margin: 0;
      font-family: 'Do Hyeon', sans-serif;
    }

    .hidden {
      display: none;
    }
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .popup-content {
      background-color: white;
      padding: 24px;
      border-radius: 8px;
    }
    .share-buttons {
      display: flex;
      justify-content: space-between;
    }
    .share-button {
      padding: 8px 16px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      color: #515151;
    }
    .share-button:hover {
      cursor: pointer;
    }
    .share-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      margin: 16px;
      background-color: white;
      border: 2px solid #515151;
    }
    .submit-score {
      background-color: transparent;
      border: none;
      border-radius: 8px;
      color: #515151;
      margin: 0;
      cursor: pointer;
    }
    .do-hyeon-h2 {
      font-family: 'Do Hyeon', sans-serif;
      font-weight: 400;
      font-style: normal;
    }
  `
}

customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
