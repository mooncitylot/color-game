//@ts
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
import lifeCount from '../../shared/life-count.js'
import { getLives } from '../../utility/color-db.js'
import FireworksElement from '../../shared/fireworks.js'

class DashboardContainerElement extends LitElement {
  static properties = {
    color: { type: String },
    timeRemaining: { type: Number },
    score: { type: Number },
    message: { type: String },
    disable: { type: Boolean },
    lifeCount: { type: Number },
  }
  constructor() {
    super()
    this.color = ''
    this.timeRemaining = this.calculateTimeRemaining()
    this.startCountdown()
    this.score = getDailyHighScore()
    this.message = getMessage(this.score)
    this.lifeCount = getLives()
    console.log('Life', this.lifeCount)
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
    if (this.lifeCount === 0) {
      return this.renderYouLose()
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
    return html`<div class="wrapper">
      <h1>Sorry, you lost!</h1>
      <svg width="250" height="260" viewBox="0 0 250 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="125" cy="130" rx="125" ry="130" fill="#E19E2B" />
        <path
          d="M109 103.5C109 124.211 92.2107 141 71.5 141C50.7893 141 34 124.211 34 103.5C34 82.7893 50.7893 66 71.5 66C92.2107 66 109 82.7893 109 103.5Z"
          fill="#F2EFE5"
        />
        <path d="M72 141C92.7107 141 109.5 124.211 109.5 103.5C109.5 82.7893 92.7107 66 72 66V141Z" fill="#1C1B1F" />
        <path d="M70.0541 92.5827L87.1351 102.829L69.721 112.498L70.0541 92.5827Z" fill="#F2EFE5" />
        <path
          d="M219 103.5C219 124.211 202.211 141 181.5 141C160.789 141 144 124.211 144 103.5C144 82.7893 160.789 66 181.5 66C202.211 66 219 82.7893 219 103.5Z"
          fill="#F2EFE5"
        />
        <path d="M182 141C202.711 141 219.5 124.211 219.5 103.5C219.5 82.7893 202.711 66 182 66V141Z" fill="#1C1B1F" />
        <path d="M180.054 92.5827L197.135 102.829L179.721 112.498L180.054 92.5827Z" fill="#F2EFE5" />
        <rect x="139" y="123" width="95" height="25.2907" fill="#E19E2B" />
        <rect x="29" y="123" width="95" height="25.2907" fill="#E19E2B" />
        <path d="M72 217C88.5086 194.359 138.22 154.09 204.998 174.143" stroke="black" stroke-width="14" />
      </svg>

      <p>Try Again Tomorrow</p>
      <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
    </div>`
  }

  renderYouWin() {
    return html`<div class="wrapper">
      <h1>Congratulations, you won!</h1>
      <svg width="250" height="260" viewBox="0 0 250 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="125" cy="130" rx="125" ry="130" fill="#E19E2B" />
        <path
          d="M107 81.5C107 102.211 90.2107 119 69.5 119C48.7893 119 32 102.211 32 81.5C32 60.7893 48.7893 44 69.5 44C90.2107 44 107 60.7893 107 81.5Z"
          fill="#F2EFE5"
        />
        <path d="M70 119C90.7107 119 107.5 102.211 107.5 81.5C107.5 60.7893 90.7107 44 70 44V119Z" fill="#1C1B1F" />
        <path d="M68.0541 70.5827L85.1351 80.829L67.721 90.4985L68.0541 70.5827Z" fill="#F2EFE5" />
        <path
          d="M217 81.5C217 102.211 200.211 119 179.5 119C158.789 119 142 102.211 142 81.5C142 60.7893 158.789 44 179.5 44C200.211 44 217 60.7893 217 81.5Z"
          fill="#F2EFE5"
        />
        <path d="M180 119C200.711 119 217.5 102.211 217.5 81.5C217.5 60.7893 200.711 44 180 44V119Z" fill="#1C1B1F" />
        <path d="M178.054 70.5827L195.135 80.829L177.721 90.4985L178.054 70.5827Z" fill="#F2EFE5" />
        <rect x="32" y="115.976" width="95" height="25.2907" transform="rotate(-11.5221 32 115.976)" fill="#E19E2B" />
        <rect x="139.088" y="95" width="95" height="25.2907" transform="rotate(18.6518 139.088 95)" fill="#E19E2B" />
        <path
          d="M125 234C173.669 234 213.606 196.615 217.661 148.996C218.036 144.594 214.418 141 210 141H40C35.5817 141 31.9641 144.594 32.339 148.996C36.3942 196.615 76.3313 234 125 234Z"
          fill="#1C1B1F"
        />
        <mask
          id="mask0_36_28"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="32"
          y="141"
          width="186"
          height="93"
        >
          <path
            d="M125 234C173.669 234 213.606 196.615 217.661 148.996C218.036 144.594 214.418 141 210 141H40C35.5817 141 31.9641 144.594 32.339 148.996C36.3942 196.615 76.3313 234 125 234Z"
            fill="#1C1B1F"
          />
        </mask>
        <g mask="url(#mask0_36_28)">
          <circle cx="129" cy="238" r="50" fill="#FBB4F5" />
        </g>
      </svg>

      <p>See you tomorrow</p>
      <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
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
    #content {
      opacity: 0;
      transition: opacity 1s;
    }
    .score-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 16px;
      background-color: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #d9d9d9;
    }
    .score-wrapper h4 {
      margin: 0;
    }
    .score-wrapper progress-bar {
      scale: 0.75;
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
    // FIREWORKS
  `
}

customElements.define('dashboard-container', DashboardContainerElement)
export default DashboardContainerElement
