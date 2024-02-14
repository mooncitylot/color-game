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
  }

  constructor() {
    super()
    this.input = getInput()
    this.target = getGoalColor()
    this.opened = false
    this.score = getCurrentScore()
    this.message = getMessage(this.score)
    this.calculateDifference()
  }

  calculateDifference() {
    this.differences = {
      red: Math.abs(this.target.red - this.input.red),
      green: Math.abs(this.target.green - this.input.green),
      blue: Math.abs(this.target.blue - this.input.blue),
    }
    this.targetTotal = this.target.red + this.target.green + this.target.blue
    this.inputTotal = this.input.red + this.input.green + this.input.blue
    this.score = Math.floor(100 - (Math.abs(this.targetTotal - this.inputTotal) / this.targetTotal) * 100)
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
      <div class="wrapper">
        <div class="head">
          <h1>Score: ${this.score}%</h1>
          <h2>${this.message}</h2>
          <progress-bar .progress=${this.score}></progress-bar>
        </div>

        <div class="hint-wrapper">
          <span class="hint" @click=${() => (this.opened = !this.opened)}
            ><h3>RGB Hints</h3>
            ${questionIcon}</span
          >
          <div></div>
        </div>

        <dialog-box class="${this.opened ? '' : 'hide'}">
          <p>
            RGB stands for Red, Green, and Blue – the primary colors of light. In our game, each color is represented by
            a combination of these three values. The higher the value, the more of that color is present.
          </p>
          <p>
            Here's how it works: Snap a pic of a color you think matches the target. Our algorithm then compares the RGB
            values of your submission with the target color. The closer your values are to the target, the hotter you're
            getting! So, pay attention to the feedback.
          </p>
          <p>
            If your RGB values are a match or close, you're on the right track! Keep hunting until you hit the perfect
            hue. Good luck, and may the RGB be with you!"
          </p>
          <a @click=${() => (this.opened = !this.opened)}>Close</a>
        </dialog-box>
      </div>
      <a @click=${() => go(routes.DASHBOARD.path)}>Home</a>
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
  `
}

customElements.define('results-container', ResultsContainerElement)
export default ResultsContainerElement
