import { html, css, LitElement } from 'lit'
import { heartIcon } from '../assets/icons'

class lifeCount extends LitElement {
  static properties = {
    life: { type: Number },
  }

  constructor() {
    super()
    this.life = 3
  }

  render() {
    return html`
      <div class="life-count">
        <span>${heartIcon}</span>
        <span>${this.life}</span>
      </div>
    `
  }

  static styles = css`
    .life-count {
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 8px;
    }
  `
}

customElements.define('life-count', lifeCount)
export default lifeCount
