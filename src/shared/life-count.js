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
    console.log('Life', this.life)
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
      ${heartIconRed} ${heartIconRed} ${heartIconRed} ${heartIconRed} ${heartIconRed}
    </div>`
  }

  renderFourLives() {
    return html`<div
      class="life-count
      "
    >
      ${heartIconRed} ${heartIconRed} ${heartIconRed} ${heartIconRed} ${heartIconGrey}
    </div>`
  }

  renderThreeLives() {
    return html`<div
      class="life-count
      "
    >
      ${heartIconRed} ${heartIconRed} ${heartIconRed} ${heartIconGrey} ${heartIconGrey}
    </div>`
  }

  renderTwoLives() {
    return html`<div
      class="life-count
      "
    >
      ${heartIconRed} ${heartIconRed} ${heartIconGrey} ${heartIconGrey} ${heartIconGrey}
    </div>`
  }

  renderOneLife() {
    return html`<div
      class="life-count
      "
    >
      ${heartIconRed} ${heartIconGrey} ${heartIconGrey} ${heartIconGrey} ${heartIconGrey}
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
