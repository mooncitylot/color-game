import { LitElement, html, css } from 'lit'
class LoginForgotPasswordContainerElement extends LitElement {
  constructor() {
    super()
  }
  render() {
    return html`<h1>Forgot Password</h1>`
  }
}
customElements.define('login-forgot-password-container', LoginForgotPasswordContainerElement)
export default LoginForgotPasswordContainerElement
