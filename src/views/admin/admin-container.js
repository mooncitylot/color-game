import { LitElement, html, css } from 'lit'

import { setColor } from '../../utility/firebase-utils.js'

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
   * @param {{ preventDefault: () => void; target: any; }} event
   */
  handleFormSubmit(event) {
    event.preventDefault() // Prevents the default form submission behavior

    const form = event.target
    const red = form.querySelector('#redInput')
    const green = form.querySelector('#greenInput')
    const blue = form.querySelector('#blueInput')
    const name = form.querySelector('#nameInput')
    const date = form.querySelector('#dateInput')

    setColor(red.value, green.value, blue.value, name.value, date.value)
  }

  render() {
    return html`
      ${this.unlocked
        ? ''
        : html`<h1>Enter Pin</h1>
            <input type="password" />
            <button @click=${this.checkPassword}>Submit</button>`}
      ${this.unlocked ? this.renderContent() : ''}
    `
  }

  renderContent() {
    return html`<h1>Admin</h1>
      <form @submit="${this.handleFormSubmit}">
        <label for="redInput">Red:</label>
        <input type="number" id="redInput" name="numberInput" />
        <label for="greenInput">Green:</label>
        <input type="number" id="greenInput" name="numberInput" />
        <label for="blueInput">Blue:</label>
        <input type="number" id="blueInput" name="numberInput" />
        <label for="nameInput">Name:</label>
        <input type="text" id="nameInput" name="nameInput" />
        <label for="dateInput">Date:</label>
        <input type="number" id="dateInput" name="dateInput" />
        <button type="submit">Submit Color</button>
      </form>
      <button @click=${() => (this.unlocked = false)}>Lock</button> `
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      font-family: Roboto, sans-serif;
    }
  `
}

customElements.define('admin-container', AdminContainer)
export default AdminContainer
