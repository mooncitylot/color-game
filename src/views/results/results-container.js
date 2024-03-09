import { html, css, LitElement } from 'lit'
import {
  getGoalColor,
  saveCurrentScore,
  getCurrentScore,
  getInput,
  getMessage,
  getLives,
  saveLives,
  saveLastColor,
} from '../../utility/color-db.js'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { questionIcon, winIcon, loseIcon } from '../../assets/icons.js'
import ProgressBar from '../../shared/progress-bar.js'

class ResultsContainerElement extends LitElement {
  static properties = {
    input: { type: Object },
    target: { type: Object },
    targetTotal: { type: Number },
    inputTotal: { type: Number },
    score: { type: Number },
    roundedScore: { type: Number },
    differences: { type: Object },
    opened: { type: Boolean },
    message: { type: String },
    redOff: { type: Number },
    greenOff: { type: Number },
    blueOff: { type: Number },
    lives: { type: Number },
  }

  constructor() {
    super()
    this.lives = getLives()
    this.input = getInput()
    this.target = {
      red: 0,
      green: 0,
      blue: 0,
    }
    this.opened = false
    this.score = getCurrentScore()
    this.message = getMessage(this.score)
    setTimeout(() => {
      this.calculateDifference()
    }, 100)
    if (this.score > 80) {
      this.won = true
    }
  }

  async connectedCallback() {
    super.connectedCallback()
    this.target = await getGoalColor()

    this.calculateDifference()
  }

  calculateDifference() {
    const target = this.target
    const newLife = this.lives - 1
    const input = this.input

    // early return and dont store if color is black
    if (input.red === 0 && input.green === 0 && input.blue === 0) {
      alert('That aint no color, son!')
      go(routes.DASHBOARD.path)
      return
    }

    const redScore = Math.abs(Math.ceil(target.red / 10) * 10 - Math.ceil((input.red / 10) * 10))
    const greenScore = Math.abs(Math.ceil(target.green / 10) * 10 - Math.ceil((input.green / 10) * 10))
    const blueScore = Math.abs(Math.ceil(target.blue / 10) * 10 - Math.ceil((input.blue / 10) * 10))
    const average = Math.abs((redScore + greenScore + blueScore) / 3)

    this.score = Math.abs(100 - average).toFixed(0)
    this.roundedScore = Math.round(this.score)

    saveLastColor(input)

    saveLives(newLife)
    saveCurrentScore(this.roundedScore)
  }

  render() {
    if (this.roundedScore >= 80) {
      return this.renderYouWin()
    }

    return this.renderResults()
  }

  renderResults() {
    return html`
      <div id="content">
        <div class="wrapper">
          <div class="head">
            <h1>Score: ${this.score}%</h1>
            <progress-bar .progress=${this.score}></progress-bar>
          </div>
          <div
            style="background-color: rgba(${this.input.red} ${this.input.green} ${this.input.blue})"
            class="result-preview"
          ></div>
        </div>
        <div class="results-option" @click=${() => go(routes.DASHBOARD.path)}>Try Again</div>
      </div>
    `
  }

  renderYouWin() {
    return html`<div class="wrapper">
      <h1>Congratulations, you won!</h1>
      <script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></script>
      ${winIcon}
      <p>See you tomorrow</p>
      <!-- <div
        style="background-color: rgba(${this.input.red} ${this.input.green} ${this.input.blue})"
        class="result-preview"
      ></div> -->
      <div class="results-option" @click=${() => go(routes.LOGIN.path)}>Exit</div>
    </div>`
  }

  renderYouLose() {
    return html`<div class="wrapper">
      <h1>Sorry, you lost!</h1>
      ${loseIcon}
      <div
        class="small-result-preview"
        style="background-color: rgba(${this.input.red} ${this.input.green} ${this.input.blue})"
      >
        <p>Your Color</p>
      </div>
      <div
        class="small-result-preview"
        style="background-color: rgba(${this.target.red} ${this.target.green} ${this.target.blue})"
      >
        <p>Goal Color</p>
      </div>
      <p>See you tomorrow</p>
      <a @click=${() => go(routes.LOGIN.path)}>Exit</a>
    </div>`
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 16px;
      overflow-x: hidden;
      font-family: 'Arial';
    }
    #content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 1s;
      gap: 32px;
    }
    p {
      font-size: 18px;
      color: var(--black, #45474b);
    }
    .result-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      width: 300px;
      height: 300px;
      border-radius: 8px;
      border: 2px solid #d9d9d9;
    }
    .small-result-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      width: 75px;
      height: 75px;
      border-radius: 8px;
      border: 2px solid #d9d9d9;
    }
    .head {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px;
    }

    .hint {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 8px;
      cursor: pointer;
    }
    .hint svg {
      width: 16px;
      height: 16px;
    }

    .hint-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 240px;
      height: auto;
      background-color: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #d9d9d9;
      gap: 8px;
      padding: 16px;
    }
    .hint-wrapper h4 {
      margin: 0;
    }
    .hint-wrapper h3 {
      margin: 0;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      width: 80%;
      gap: 24px;
    }
    .wrapper > h1 {
      color: #515151;
      margin: 0;
    }
    dialog-box {
      width: 80%;
      max-width: 600px;
      padding: 16px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      border: 2px solid grey;
      z-index: 100;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .hide {
      display: none;
    }

    a {
      color: black;
      cursor: pointer;
      font-family: 'Arial';
      text-decoration: underline;
      color: grey;
    }
    .buttons {
      padding: 16px;
      border-radius: 8px;
      border: none;
      width: 80px;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .result-number {
      font-weight: bold;
      color: #515151;
    }
    .results-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
  `
}

customElements.define('results-container', ResultsContainerElement)
export default ResultsContainerElement
