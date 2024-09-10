import { LitElement, html, css } from 'lit'
import { signUp, setCurrentUser } from '../../utility/auth-service.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getCurrentUser } from '../../utility/auth-service.js'
class SignupContainerElement extends LitElement {
  /** @param {Event & {target: HTMLFormElement}} e */
  handleFormSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    console.log(data)
    if (data.password !== data['confirm-password']) {
      alert('Passwords do not match')
      return
    }
    signUp(data.email, data.password)
      .then((user) => {
        setCurrentUser(user)
        go(routes.DASHBOARD.path)
      })
      .catch((error) => {
        console.error('Signup failed:', error)
      })
  }

  render() {
    const currentUser = getCurrentUser()
    if (currentUser) {
      go(routes.HOME.path)
    }

    return html`<form @submit=${this.handleFormSubmit}>
      <label for="email">Email</label>
      <input type="email" name="email" />
      <label for="password">Password</label>
      <input type="password" name="password" />
      <label for="confirm-password">Confirm Password</label>
      <input type="password" name="confirm-password" />
      <button type="submit">Signup</button>
    </form>`
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `
}
customElements.define('signup-container', SignupContainerElement)
export default SignupContainerElement
