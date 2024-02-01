import { html, css, LitElement } from 'lit'

class BackArrowElement extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
      <div @click=${() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83L10.41 8.41L9 7L3 13L9 19L10.41 17.59L7.83 15H20V11Z" fill="black" />
        </svg>
      </div>
    `
  }
}
customElements.define('back-arrow', BackArrowElement)
export default BackArrowElement
