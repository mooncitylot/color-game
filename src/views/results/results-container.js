import { html, css, LitElement } from 'lit'
import {
  getColorDifferences,
  getGoalColor,
  saveCurrentScore,
  getCurrentScore,
  clearColorDifferences,
} from '../../utility/color-db.js'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { questionIcon } from '../../assets/icons.js'
import ProgressBar from '../../shared/progress-bar.js'

class ResultsContainerElement extends LitElement {
  static properties = {
    target: { type: Object },
    targetTotal: { type: Number },
    inputTotal: { type: Number },
    result: { type: Object },
    score: { type: Number },
    differences: { type: Object },
    opened: { type: Boolean },
  }

  constructor() {
    super()
    this.target = getGoalColor()
    this.result = null
    this.differences = getColorDifferences()
    this.targetTotal = this.target.red + this.target.green + this.target.blue
    this.inputTotal = this.differences.redDiff + this.differences.greenDiff + this.differences.blueDiff
    this.score = this.calculateDifference(this.targetTotal, this.inputTotal)
    this.opened = false
  }

  /**
   * @param {Number} [a]
   * @param {Number} [b]
   */
  calculateDifference(a, b) {
    let n1 = a
    let n2 = b

    if (n1 < n2) {
      const temp = n1
      n1 = n2
      n2 = temp
    }

    const difference = Math.abs(n1 - n2)
    const maxDifference = Math.max(Math.abs(n1), Math.abs(n2))
    const percentCloseness = ((maxDifference - difference) / maxDifference) * 100

    // Round the percent closeness to the nearest whole number
    const roundedPercentCloseness = Math.round(percentCloseness)

    const displayValue = 100 - roundedPercentCloseness

    saveCurrentScore(displayValue)
    console.log('current score', getCurrentScore())

    return displayValue
  }

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="head">
          <h1>Score: ${this.score}%</h1>
          <progress-bar .progress=${this.score}></progress-bar>
        </div>

        <div class="hint-wrapper">
          <span class="hint" @click=${() => (this.opened = !this.opened)}
            ><h3>RGB Hints</h3>
            ${questionIcon}</span
          >
          <div>
            <h4>
              <span style="color: #BD3339">Red</span> Accuracy:
              ${this.calculateDifference(this.target.red, this.differences.redDiff)}%
            </h4>
            <h4>
              <span style="color: #429754">Green</span> Accuracy:
              ${this.calculateDifference(this.target.green, this.differences.greenDiff)}%
            </h4>
            <h4>
              <span style="color: #5574B8">Blue</span> Accuracy:
              ${this.calculateDifference(this.target.blue, this.differences.blueDiff)}%
            </h4>
          </div>
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
