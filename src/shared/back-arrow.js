import { html, css, LitElement } from 'lit'

class BackArrowElement extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
      <div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_3136_21567"
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_3136_21567)">
            <path d="M10 22L0 12L10 2L11.775 3.775L3.55 12L11.775 20.225L10 22Z" fill="#1C1B1F" />
          </g>
        </svg>
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
