import { LitElement, html, css } from 'lit'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'

import './login-form.js'

class LoginContainerElement extends LitElement {
  static properties = {
    email: { type: String },
  }

  /** @param {RouteEnterArgs} next */
  routeEnter({ nextView, context }) {
    if (context.params?.email) this.email = context.params.email
  }

  render() {
    return html`
      <div class="wrapper">
        <h1>Untitled Color Game</h1>
        <button class="login-option" @click=${() => go(routes.DASHBOARD.path)}>Start</button>
        <button class="login-option" @click=${() => window.alert('Not ready yet LOL')}>Tutorial</button>
      </div>

      <!-- <h1>LOGIN, BITCH!!!!!</h1>
      <login-form .email=${this.email}></login-form> -->
    `
  }

  static styles = [
    css`
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
      .login-option {
        padding: 16px;
        border-radius: 8px;
        border: none;
        width: 240px;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: background-color 0.3s;
      }
    `,
  ]
}

customElements.define('login-container', LoginContainerElement)
export default LoginContainerElement
