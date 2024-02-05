import { html, css, LitElement } from 'lit'

class BackArrowElement extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
      <div @click=${() => window.history.back()}>
        <h2>Back</h2>
      </div>
    `
  }

  static styles = css`
    h2 {
      font-size: 16px;
      color: var(--color-primary);
      cursor: pointer;
      font-family: 'Arial';
      color: var(--black, #45474b);
    }
  `
}
customElements.define('back-arrow', BackArrowElement)
export default BackArrowElement
