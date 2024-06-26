import { html, css, LitElement } from 'lit-element'
import { goldStar, greyStar } from '../assets/icons.js'

class StarsElement extends LitElement {
  static properties = {
    score: { type: Number },
  }

  constructor() {
    super()
    this.score = 0
  }

  async connectedCallback() {
    super.connectedCallback()
  }

  render() {
    if (this.score >= 90) {
      return this.renderFiveStars()
    }
    if (this.score >= 80) {
      return this.renderFourStars()
    }
    if (this.score >= 70) {
      return this.renderThreeStars()
    }
    if (this.score >= 60) {
      return this.renderTwoStars()
    }
    return this.renderOneStar()
  }
  renderFiveStars() {
    return html` <h1>🤩 🤯 🙀</h1>`
  }
  renderFourStars() {
    return html` <h1>😄 🥳 🤪</h1>`
  }
  renderThreeStars() {
    return html` <h1>😎 😌 😏</h1>`
  }
  renderTwoStars() {
    return html` <h1>🙃 🫤 😐</h1>`
  }
  renderOneStar() {
    return html` <h1>😵 🥺 🤬</h1>`
  }
  static styles = css`
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    div > svg {
      width: 32px;
      height: 32px;
    }
    h4 {
      margin: 0;
      color: #515151;
    }
    h1 {
      margin: 16px;
      font-size: 50px;
    }
  `
}

export default StarsElement
customElements.define('stars-element', StarsElement)
