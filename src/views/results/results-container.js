import { html, css, LitElement } from 'lit'

class ResultsContainerElement extends LitElement {
  static properties = {
    results: { type: Object },
    target: { type: Object },
    score: { type: Number },
  }

  constructor() {
    super()
    this.results = null
    this.target = null
    this.score = 0
  }

  connectedCallback() {
    super.connectedCallback()
    this.results = localStorage.getItem('colorDifferences')
  }
  render() {
    return html` <p>Results: ${this.results}</p>`
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
