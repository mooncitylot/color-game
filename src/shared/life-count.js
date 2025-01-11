import { html, css, LitElement } from 'lit'
import { heartIconGrey, heartIconRed } from '../assets/icons.js'
import { getLives } from '../utility/color-db.js'

class lifeCount extends LitElement {
  static properties = {
    life: { type: Number },
  }

  constructor() {
    super()
    this.life = getLives()
  }

  render() {
    if (this.life === 5) {
      return this.renderFiveLives()
    }
    if (this.life === 4) {
      return this.renderFourLives()
    }
    if (this.life === 3) {
      return this.renderThreeLives()
    }
    if (this.life === 2) {
      return this.renderTwoLives()
    }
    if (this.life === 1) {
      return this.renderOneLife()
    }
    if (this.life === 0) {
      return this.renderZeroLives()
    }
  }

  renderFiveLives() {
    return html`<div class="life-count">
      <h4>Tries Left: 5</h4>
    </div>`
  }

  renderFourLives() {
    return html`<div
      class="life-count
      "
    >
      <h4>Tries Left: 4</h4>
    </div>`
  }

  renderThreeLives() {
    return html`<div
      class="life-count
      "
    >
      <h4>Tries Left: 3</h4>
    </div>`
  }

  renderTwoLives() {
    return html`<div
      class="life-count
      "
    >
      <h4>Tries Left: 2</h4>
    </div>`
  }

  renderOneLife() {
    return html`<div
      class="life-count
      "
    >
      <h4>Tries Left: 1</h4>
    </div>`
  }

  renderZeroLives() {
    return html`<div
      class="life-count
      "
    >
      ${heartIconGrey} ${heartIconGrey} ${heartIconGrey} ${heartIconGrey} ${heartIconGrey}
    </div>`
  }

  static styles = css`
    h4 {
      margin: 0;
    }
    .life-count {
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 8px;
    }
    svg {
      width: 24px;
      height: 24px;
      fill: #ff0000;
    }
  `
}

customElements.define('life-count', lifeCount)
export default lifeCount
