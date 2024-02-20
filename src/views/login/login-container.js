import { LitElement, html, css } from 'lit'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { reset } from '../../utility/color-db.js'

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
      <div class="background">
        <div class="wrapper">
          <button class="login-option-1" @click=${() => go(routes.DASHBOARD.path)}>Start</button>
          <button class="login-option-1" @click=${() => window.alert('Not ready yet LOL')}>Tutorial</button>
          <button class="login-option-1" @click=${() => reset()}>Reset</button>
        </div>
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
      .wrapper > h1 {
        color: #515151;
      }
      .login-option-1 {
        padding: 16px;
        width: 240px;
        color: #515151;
        background-color: #e3e1d9;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 24px;
        font-weight: bold;
        border: 4px solid;
      }
    `,
  ]
}

customElements.define('login-container', LoginContainerElement)
export default LoginContainerElement
