//@ts-nocheck
import { LitElement, html, css } from 'lit'
import { signUp, setCurrentUser } from '../../utility/auth-service.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { getCurrentUser } from '../../utility/auth-service.js'
import { setUserData, checkUsernameExists } from '../../utility/firebase-utils.js'
import { updateCurrentUser } from '../../utility/auth-service.js'
class SignupContainerElement extends LitElement {
  constructor() {
    super()
    this.step = 1
  }
  /** @param {Event & {target: HTMLFormElement}} e */
  handleStepOne(e) {
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
        this.step = 2
        this.requestUpdate()
      })
      .catch((error) => {
        console.error('Signup failed:', error)
      })
  }

  async setAdditionalUserData(e) {
    e.preventDefault()

    const currentUser = await getCurrentUser()

    console.log('Current user:', currentUser)
    if (!currentUser) {
      console.error('No current user found')
      return
    }

    const formData = new FormData(e.target)
    const username = formData.get('username')
    const profilePicFile = formData.get('profilePic')

    if (!username || !profilePicFile) {
      console.error('Username or profile picture file is missing')
      return
    }

    try {
      const usernameExists = await checkUsernameExists(username)
      if (usernameExists) {
        alert('Username already exists. Please choose a different username.')
        return
      }

      // Convert profile picture to base64
      const profilePicBase64 = await this.fileToBase64(profilePicFile)

      const initialPoints = 0
      const friends = []
      console.log('Data to be set:', {
        uid: currentUser.user.uid,
        username,
        initialPoints,
        profilePic: profilePicBase64,
        friends,
      })

      await setUserData(currentUser.user.uid, username, initialPoints, profilePicBase64, friends)
      updateCurrentUser()
      console.log(getCurrentUser())
      go(routes.DASHBOARD.path)
    } catch (error) {
      console.error('Error setting additional user data:', error)
      alert('An error occurred while completing signup. Please try again.')
    }
  }

  // Add this new method to handle file to base64 conversion
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  render() {
    const currentUser = getCurrentUser()

    return html` ${this.step === 1 ? this.renderStep1() : this.renderStep2()} `
  }

  renderStep1() {
    return html`<form @submit=${this.handleStepOne}>
      <label for="email">Email</label>
      <input type="email" name="email" />
      <label for="password">Password</label>
      <input type="password" name="password" />
      <label for="confirm-password">Confirm Password</label>
      <input type="password" name="confirm-password" />
      <button type="submit">Signup</button>
    </form>`
  }

  renderStep2() {
    return html`
      <form @submit=${this.setAdditionalUserData}>
        <label for="username">Username</label>
        <input type="text" name="username" required />
        <label for="profilePic">Profile Picture</label>
        <input type="file" name="profilePic" accept="image/*" required />
        <button type="submit">Complete Signup</button>
      </form>
    `
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Arial';
      gap: 16px;
    }

    button {
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
  `
}
customElements.define('signup-container', SignupContainerElement)
export default SignupContainerElement
