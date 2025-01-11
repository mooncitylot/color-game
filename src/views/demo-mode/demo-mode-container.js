import { LitElement, html, css } from 'lit-element'
class DemoModeContainer extends LitElement {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    return html`<h1>Demo</h1>`
  }

  static styles = css`
h1 {
font-family: 'Roboto', sans-serif;
`
}

customElements.define('demo-mode-container', DemoModeContainer)
export default DemoModeContainer
