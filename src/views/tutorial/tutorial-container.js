import { html, css, LitElement } from 'lit'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { dashboardHelpIcon, dashboardScanIcon } from '../../assets/icons.js'

class TutorialContainerElement extends LitElement {
  static properties = {
    step: { type: Number },
  }

  constructor() {
    super()
    this.step = 1
  }

  render() {
    return html`<div class="wrapper">
      <span class="icon">${dashboardHelpIcon}</span>
      <h1>How to Play</h1>
      <p>
        Welcome to the Color Game you silly goose! Here's the deal... the game will give you the name of a color and
        then you have to figure out what that color looks like. You'll use your phone to scan colors and then the super
        smart app will tell you how close you are! Here's the deal... you only get 5 tries. In the end, you'll get your
        score for how well you did! Try to beat your friends! Also, tell your friends to play this game!
      </p>

      <button class="tutorial-option" @click=${() => go(routes.DASHBOARD.path)}>${dashboardScanIcon} Lets Go!</button>
    </div> `
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
    }
    .icon > svg {
      width: 15vw;
      height: 15vw;
    }
    .tutorial-steps {
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: left;
      gap: 8px;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      width: 250px;
      max-width: 600px;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #b4b4b8;
      background-color: #f2efe5;
    }
    .wrapper h1 {
      margin: 0;
      color: #515151;
      font-family: sans-serif;
    }
    .tutorial-option {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      width: 90%;
      color: #515151;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 24px;
      font-weight: bold;
      border: 4px solid;
      border-radius: 16px;
    }
  `
}

export default TutorialContainerElement
customElements.define('tutorial-container', TutorialContainerElement)
