import { html, css, LitElement } from 'lit'
import { getColorDifferences, getGoalColor } from '../../utility/color-db.js'

class ResultsContainerElement extends LitElement {
  static properties = {
    target: { type: Object },
    result: { type: Object },
    score: { type: Number },
  }

  constructor() {
    super()
    this.target = getGoalColor()
    this.result = null
    this.score = 0
  }

  async connectedCallback() {
    super.connectedCallback()
    const differences = await getColorDifferences()
    this.result = differences
    this.score = differences.redDiff + differences.greenDiff + differences.blueDiff
  }
  render() {
    return html`
      <h2>Results</h2>
      <p>Result: ${this.result}</p>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      font-family: 'Arial';
    }
  `
}

customElements.define('results-container', ResultsContainerElement)
export default ResultsContainerElement
