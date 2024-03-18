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
    if (this.score <= 50) {
      return this.renderOneStar()
    }
  }
  renderFiveStars() {
    return html`<div>${goldStar}${goldStar}${goldStar}${goldStar}${goldStar}</div>`
  }
  renderFourStars() {
    return html`<div>${goldStar}${goldStar}${goldStar}${goldStar}${greyStar}</div>`
  }
  renderThreeStars() {
    return html`<div>${goldStar}${goldStar}${goldStar}${greyStar}${greyStar}</div>`
  }
  renderTwoStars() {
    return html`<div>${goldStar}${goldStar}${greyStar}${greyStar}${greyStar}</div>`
  }
  renderOneStar() {
    return html`<div>${goldStar}${greyStar}${greyStar}${greyStar}${greyStar}</div>`
  }
  static styles = css`
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div > svg {
      width: 50px;
      height: 50px;
    }
  `
}

export default StarsElement
customElements.define('stars-element', StarsElement)
