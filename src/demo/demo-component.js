import { LitElement, html, css } from 'lit'
import { formatNumberAsDollar } from './demo-component.util.js'

/** @type {DemoElement} */
class DemoComponentElement extends LitElement {
  static properties = {
    demoProperty: { type: Object },
  }
  constructor() {
    super()

    this.demoProperty = {
      string: 'string',
      numbers: [1, 2, 3],
    }
  }

  handleButtonClick() {
    this.demoProperty = {
      string: 'new string',
      numbers: [4, 5, 6],
    }
  }

  // Causes test results to show missing coverage
  anUntestedFunction() {
    return 'this is an untested function'
  }

  render() {
    return html`
      <div>
        <h1>Demo Component</h1>
        <p>String: ${this.demoProperty.string}</p>
        <p>Numbers:</p>
        <ul>
          ${this.demoProperty.numbers.map((n) => html`<li>${formatNumberAsDollar(n)}</li>`)}
        </ul>
        <button @click=${this.handleButtonClick.bind(this)}>Click me</button>
      </div>
    `
  }
}
customElements.define('demo-component', DemoComponentElement)
export default DemoComponentElement
