import { LitElement, html, css } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getGoalColorName } from '../../utility/color-db.js'
import ProgressBar from '../../shared/progress-bar.js'
import { getDailyHighScore, getMessage } from '../../utility/color-db.js'
import {} from '../../utility/color-db.js'
class DashboardContainerElement extends LitElement {
  constructor() {
    super()
    this.color = getGoalColorName()
    this.timeRemaining = this.calculateTimeRemaining()
    this.startCountdown()
    this.score = getDailyHighScore()
    this.message = getMessage(this.score)
    if (this.score < 80) {
      this.disable = true
    }
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('DashboardContainerElement.routeEnter', { nextView, context })
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

  render() {
    return html`
      <div class="wrapper">
        ${this.disable
          ? html`<div class="stats">
              <h2>Color of the Day: <span>"${this.color}"</span></h2>
              <div class="score-wrapper">
                <h4>Daily High Score: ${this.score}</h4>
                <progress-bar .progress=${this.score}></progress-bar>
                <p>Time Remaining: <span>${this.formatTime(this.timeRemaining)}</span></p>
              </div>
            </div>`
          : ''}
        ${this.disable
          ? html` <button class="dashboard-option" @click=${() => go(routes.COLOR_SCAN.path)}>Color Grabber</button> `
          : 'Play Again Tomorrow'}
        <button class="dashboard-option" @click=${() => go(routes.LOGIN.path)}>Exit</button>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      font-family: 'Arial';
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
      gap: 8px;
    }
    .stats p {
      margin: 0;
      text-align: center;
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
      border-radius: 8px;
      border: none;
      width: 240px;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  `
}

customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
