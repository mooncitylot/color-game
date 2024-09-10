import { LitElement, html, css } from 'lit'

import { signIn } from '../../utility/auth-service.js'

import { routes } from '../../router/routes.js'
import { go } from '../../router/router-base.js'
import globalStyles from '../../styles/global-styles.js'

class LoginFormElement extends LitElement {
  static properties = {
    email: { type: String },
  }
  constructor() {
    super()
    this.email = ''
  }

  /** @param {Event & {target: HTMLFormElement}} e */
  handleFormSubmit(e) {
    e.preventDefault() // Prevent form submission
    const data = Object.fromEntries(new FormData(e.target).entries())
    console.log(data)
    signIn(data.email, data.password)
  }

  render() {
    return html`
      <form
        slot="body"
        autocomplete="on"
        @submit=${this.handleFormSubmit}
        @keypress=${(/** @type {*} */ e) => {
          if (e.key === 'Enter')
            // @ts-ignore
            this.shadowRoot.querySelector('#submit-button').click()
        }}
      >
        <input
          autocomplete="on"
          @invalid="this.setCustomValidity('Please enter your email')"
          type="email"
          value=${this.email}
          name="email"
          placeholder="Email"
          required
        />
        <input
          autocomplete="on"
          @invalid="this.setCustomValidity('Please enter a valid password')"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" id="submit-button">Log In</button>
        <div class="separator-bar">
          <span class="separator-text">OR</span>
        </div>
        <button class="secondary outline" @click=${() => go(routes.SIGNUP.path)}>Sign Up</button>
      </form>
      <div class="background"></div>
    `
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: block;
      }
      .background {
        background-color: black;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
      }
      form {
        padding: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ]
}

customElements.define('login-form', LoginFormElement)
export default LoginFormElement
