import { LitElement, html, css } from 'lit'

import { setColor } from '../../utility/firebase-utils.js'
import { set } from 'firebase/database'
import { reset } from '../../utility/color-db.js'
export class AdminContainer extends LitElement {
  static properties = {
    unlocked: { type: Boolean },
  }

  constructor() {
    super()
    this.unlocked = false
  }
  checkPassword() {
    const input = this.shadowRoot.querySelector('input')
    if (input.value === '1234') {
      console.log('correct password')
      this.unlocked = true
    } else {
      alert('Incorrect password')
    }
  }

  /**
   * @param {string} hex
   */
  hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16)
    const g = parseInt(hex.substring(3, 5), 16)
    const b = parseInt(hex.substring(5, 7), 16)
    return { r, g, b }
  }

  /**
   * @param {{ preventDefault: () => void; target: any; }} event
   */
  handleFormSubmit(event) {
    event.preventDefault() // Prevents the default form submission behavior

    const form = event.target
    const color = form.querySelector('#colorInput')
    const colorRGB = this.hexToRgb(color.value)
    const name = form.querySelector('#nameInput')
    const date = form.querySelector('#dateInput')
    console.log(colorRGB, name.value, date.value)

    setColor(colorRGB.r, colorRGB.g, colorRGB.b, name.value, date.value)

    // setColor(red.value, green.value, blue.value, name.value, date.value)
  }

  render() {
    return html`
      ${this.unlocked
        ? ''
        : html` <div class="wrapper">
            <h3>Enter Passphrase</h3>
            <input type="password" />
            <button @click=${this.checkPassword}>Submit</button>
          </div>
      </div>`}
      ${this.unlocked ? this.renderContent() : ''}
    `
  }

  renderContent() {
    return html` <div class="wrapper">
      <h3>Add Color</h3>
      <form @submit="${this.handleFormSubmit}">
        <label for="colorInput">Color:</label>
        <input type="color" id="colorInput" name="colorInput" />

        <label for="nameInput">Name:</label>
        <input type="text" id="nameInput" name="nameInput" />

        <label for="dateInput">Date:</label>
        <input type="number" id="dateInput" name="dateInput" />

        <button type="submit">Submit Color</button>
      </form>
      <button @click=${() => (this.unlocked = false)}>Lock</button>
      <button class="login-option-1" @click=${() => reset()}>Reset for testing purposes</button>
    </div>`
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      font-family: Roboto, sans-serif;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto;
      width: 100px;
      gap: 16px;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    input {
      width: 100px;
    }
  `
}

customElements.define('admin-container', AdminContainer)
export default AdminContainer
