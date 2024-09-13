import { LitElement, html, css } from 'lit'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { reset } from '../../utility/color-db.js'

import './login-form.js'
import { getCurrentUser } from '../../utility/auth-service.js'

class LoginContainerElement extends LitElement {
  static properties = {
    email: { type: String },
  }

  /** @param {RouteEnterArgs} next */
  routeEnter({ nextView, context }) {
    if (context.params?.email) this.email = context.params.email

    const currentUser = getCurrentUser()
    if (currentUser) {
      go(routes.DASHBOARD.path)
      return
    }

    window.dispatchEvent(
      new CustomEvent('update-header', {
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`
      <div class="background">
        <div class="wrapper">
          <login-form .email=${this.email}></login-form>
          <!-- <button class="login-option-1" @click=${() => go(routes.DASHBOARD.path)}>Start Game 🤯</button>
          <button class="login-option-1" @click=${() => go(routes.TUTORIAL.path)}>How To Play 🤓</button> -->
        </div>
        <div style="margin-top: 80px;" class="wrapper">
          <a style="color: #515151" href="mailto:mooncitylot@gmail.com">Report a Problem</a>
          <a style="text-decoration: none;">Made by Tyler 2024</a>
        </div>
      </div>
    `
  }

  static styles = [
    css`
      a {
        text-decoration: underline;
        color: grey;
      }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        height: 100%;
      }
      .wrapper > h1 {
        color: #515151;
      }
      .login-option-1 {
        padding: 16px;
        width: 240px;
        color: #515151;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 24px;
        font-weight: bold;
        border: 4px solid;
        border-radius: 16px;
      }
    `,
  ]
}

customElements.define('login-container', LoginContainerElement)
export default LoginContainerElement
