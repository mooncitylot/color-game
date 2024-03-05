import { LitElement, html, css } from 'lit'

class FireworksElement extends LitElement {
  static properties = {
    color: { type: String },
  }

  constructor() {
    super()
    this.color = ''
  }

  render() {
    return html`<img src= />`
  }

  static styles = css``
}

customElements.define('fireworks-element', FireworksElement)
export default FireworksElement
