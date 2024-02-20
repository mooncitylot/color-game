import { html, css, LitElement } from 'lit'
import { getGoalColor, saveCurrentScore, getCurrentScore, getInput, getMessage } from '../../utility/color-db.js'
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
    differences: { type: Object },
    opened: { type: Boolean },
    message: { type: String },
    redOff: { type: Number },
    greenOff: { type: Number },
    blueOff: { type: Number },
  }

  constructor() {
    super()
    this.input = getInput()
    this.target = getGoalColor()
    this.opened = false
    this.score = getCurrentScore()
    this.message = getMessage(this.score)
    this.calculateDifference()
    this.animateContentFadeIn()
    if (this.score > 90) {
      this.won = true
    }
  }

  animateContentFadeIn() {
    requestAnimationFrame(() => {
      const content = this.shadowRoot.getElementById('content')
      setTimeout(() => {
        content.style.opacity = '1'
      }, 100)
    })
  }

  calculateDifference() {
    const redDiff = Math.abs(this.target.red - this.input.red)
    const greenDiff = Math.abs(this.target.green - this.input.green)
    const blueDiff = Math.abs(this.target.blue - this.input.blue)

    const redDiffPercent = (redDiff / this.target.red) * 100
    const greenDiffPercent = (greenDiff / this.target.green) * 100
    const blueDiffPercent = (blueDiff / this.target.blue) * 100

    this.redOff = 100 - redDiffPercent
    this.greenOff = 100 - greenDiffPercent
    this.blueOff = 100 - blueDiffPercent

    const averagePercent = (redDiffPercent + greenDiffPercent + blueDiffPercent) / 3

    const invertedPercent = 100 - averagePercent
    const roundedPercent = Math.round(invertedPercent)

    this.score = roundedPercent
    saveCurrentScore(this.score)
    console.log(this.score)
  }

  connectedCallback() {
    super.connectedCallback()
    console.log(this.target)
    console.log(this.input)
  }

  render() {
    return html`
      <div id="content">
        <div class="wrapper">
          <div class="head">
            <h1>Score: ${this.score}%</h1>
            ${this.won ? html`<h2>Congratulations! You've matched the color!</h2>` : html`<h2>Keep Going!</h2>`}
            <progress-bar .progress=${this.score}></progress-bar>
          </div>

          <div class="hint-wrapper">
            <span class="hint" @click=${() => (this.opened = !this.opened)}
              ><h3>RGB Hints</h3>
              ${questionIcon}</span
            >
            <div>
              <p>Red Accuracy: <span class="result-number">${this.redOff.toFixed(0)}%</span></p>
              <p>Green Accuracy: <span class="result-number">${this.greenOff.toFixed(0)}%</span></p>
              <p>Blue Accuracy: <span class="result-number">${this.blueOff.toFixed(0)}%</span></p>
            </div>
          </div>

          <dialog-box class="${this.opened ? '' : 'hide'}">
            <p>
              RGB stands for Red, Green, and Blue – the primary colors of light. In our game, each color is represented
              by a combination of these three values. The higher the value, the more of that color is present.
            </p>
            <p>
              Here's how it works: Snap a pic of a color you think matches the target. Our algorithm then compares the
              RGB values of your submission with the target color. The closer your values are to the target, the hotter
              you're getting! So, pay attention to the feedback.
            </p>
            <p>
              If your RGB values are a match or close, you're on the right track! Keep hunting until you hit the perfect
              hue. Good luck, and may the RGB be with you!"
            </p>
            <a @click=${() => (this.opened = !this.opened)}>Close</a>
          </dialog-box>
        </div>
        <a style="margin-top: 24px;" @click=${() => go(routes.DASHBOARD.path)}>Home</a>
      </div>
    `
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
      opacity: 0;
      transition: opacity 1s;
    }
    p {
      font-size: 18px;
      color: var(--black, #45474b);
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
      height: 100%;
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
  `
}

customElements.define('results-container', ResultsContainerElement)
export default ResultsContainerElement
