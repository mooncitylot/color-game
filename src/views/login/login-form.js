import { LitElement, html, css } from 'lit'

import { setCurrentUser, signIn } from '../../utility/auth-service.js'

import { routes } from '../../router/routes.js'
import { go } from '../../router/router-base.js'
import globalStyles from '../../styles/global-styles.js'

import { getUserData } from '../../utility/firebase-utils.js'

import { updateCurrentUser } from '../../utility/auth-service.js'

class LoginFormElement extends LitElement {
  static properties = {
    email: { type: String },
  }
  constructor() {
    super()
    this.email = ''
  }

  /** @param {Event & {target: HTMLFormElement}} e */
  async handleFormSubmit(e) {
    e.preventDefault() // Prevent form submission
    const data = Object.fromEntries(new FormData(e.target).entries())

    signIn(data.email, data.password)
      .then(async (user) => {
        setCurrentUser(user)
        await updateCurrentUser()
        // Dispatch an event to update the header profile pic
        window.dispatchEvent(
          new CustomEvent('update-header', {
            bubbles: true,
            composed: true,
            detail: { user },
          })
        )
        setTimeout(() => {
          go(routes.DASHBOARD.path)
        }, 250)
      })
      .catch((error) => {
        console.error('Login failed:', error)
        alert('Invalid email or password')
      })
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
        <div class="button-wrap">
          <button class="login-option-1" type="submit" id="submit-button">Log In</button>
          <div class="separator-bar">
            <span class="separator-text">OR</span>
          </div>
          <button class="login-option-1" @click=${() => go(routes.SIGNUP.path)}>Sign Up</button>
        </div>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
      }
      .login-option-1 {
        padding: 8px;
        width: 180px;
        color: #515151;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 12px;
        font-weight: bold;
        border: 4px solid;
        border-radius: 16px;
      }

      .button-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
      }
    `,
  ]
}

customElements.define('login-form', LoginFormElement)
export default LoginFormElement
