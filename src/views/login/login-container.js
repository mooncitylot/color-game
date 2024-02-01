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
      <button @click=${() => go(routes.DASHBOARD.path)}>Enter!!!</button>

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
      }
    `,
  ]
}

customElements.define('login-container', LoginContainerElement)
export default LoginContainerElement
