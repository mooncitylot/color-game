import { html, css, LitElement } from 'lit'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import RainbowButtonElement from '../../shared/rainbow-button.js'

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
      <h1>How to Play</h1>
      <p>
        Welcome to the Color Scan Challenge! Your mission: Find a real-world color that matches the mystery color with
        90% accuracy or higher. Scan colors using your phone's camera, receive feedback on your matches, and aim to
        solve the mystery within 5 tries.
      </p>
      <rainbow-button .text=${'Lets Go!'} @click=${() => go(routes.DASHBOARD.path)}></rainbow-button>
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
    }
    .tutorial-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
