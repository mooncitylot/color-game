import { html, css, LitElement } from 'lit'
import { getColorDifferences, getGoalColor } from '../../utility/color-db.js'
import BackArrowElement from '../../shared/back-arrow.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'

class ResultsContainerElement extends LitElement {
  static properties = {
    target: { type: Object },
    targetTotal: { type: Number },
    inputTotal: { type: Number },
    result: { type: Object },
    score: { type: Number },
    differences: { type: Object },
  }

  constructor() {
    super()
    this.target = getGoalColor()
    this.result = null
    this.differences = getColorDifferences()
    this.targetTotal = this.target.red + this.target.green + this.target.blue
    this.inputTotal = this.differences.redDiff + this.differences.greenDiff + this.differences.blueDiff
    this.score = this.calculateDifference(this.targetTotal, this.inputTotal)
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

    return displayValue
  }

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    return html`
      <back-arrow @click=${() => go(routes.DASHBOARD.path)}></back-arrow>
      <div class="wrapper">
        <h1>Score: ${this.score}%</h1>
        <h3>RGB Hints:</h3>
        <h4>Red Accuracy: ${this.calculateDifference(this.target.red, this.differences.redDiff)}%</h4>
        <h4>Green Accuracy: ${this.calculateDifference(this.target.green, this.differences.greenDiff)}%</h4>
        <h4>Blue Accuracy: ${this.calculateDifference(this.target.blue, this.differences.blueDiff)}%</h4>
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
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `
}

customElements.define('results-container', ResultsContainerElement)
export default ResultsContainerElement
