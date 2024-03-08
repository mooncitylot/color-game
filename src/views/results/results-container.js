import { html, css, LitElement } from 'lit'
import {
  getGoalColor,
  saveCurrentScore,
  getCurrentScore,
  getInput,
  getMessage,
  getLives,
  saveLives,
} from '../../utility/color-db.js'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { questionIcon } from '../../assets/icons.js'
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
    if (this.score > 90) {
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

    console.log('redScore', redScore)
    console.log('greenScore', greenScore)
    console.log('blueScore', blueScore)
    console.log('average', average)

    this.score = Math.abs(100 - average).toFixed(0)
    this.roundedScore = Math.round(this.score)

    console.log('score', this.roundedScore)

    saveLives(newLife)
    saveCurrentScore(this.roundedScore)
  }

  render() {
    if (this.roundedScore >= 90) {
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
