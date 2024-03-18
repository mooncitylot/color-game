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
    return html` <h1>Incredible!</h1>
      <div>${goldStar}${goldStar}${goldStar}${goldStar}${goldStar}</div>`
  }
  renderFourStars() {
    return html` <h4>Great job!</h4>
      <div>${goldStar}${goldStar}${goldStar}${goldStar}${greyStar}</div>`
  }
  renderThreeStars() {
    return html` <h4>Not bad!</h4>
      <div>${goldStar}${goldStar}${goldStar}${greyStar}${greyStar}</div>`
  }
  renderTwoStars() {
    return html` <h4>I think you can do better...</h4>
      <div>${goldStar}${goldStar}${greyStar}${greyStar}${greyStar}</div>`
  }
  renderOneStar() {
    return html` <h4>Too bad...</h4>
      <div>${goldStar}${greyStar}${greyStar}${greyStar}${greyStar}</div>`
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
      margin: 16px;
      color: #515151;
    }
  `
}

export default StarsElement
customElements.define('stars-element', StarsElement)
