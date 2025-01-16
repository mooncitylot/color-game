import { html, css } from 'lit'
import AppHeaderElement from './shared/app-header.js'
import RouterBase from './router/router-base.js'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { reset, getDate, saveDate } from './utility/color-db.js'

// @ts-ignore
import routes from './router/routes.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPmIDCJc_QJz4g_WL7Aou0RMy9gbcF-MU',
  authDomain: 'color-game-16519.firebaseapp.com',
  databaseURL: 'https://color-game-16519-default-rtdb.firebaseio.com',
  projectId: 'color-game-16519',
  storageBucket: 'color-game-16519.appspot.com',
  messagingSenderId: '719115016654',
  appId: '1:719115016654:web:7f17ee630af7b1ffd2339f',
  measurementId: 'G-88W618NSMR',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// @ts-ignore
const analytics = getAnalytics(app)
export const auth = getAuth(app) // Initialize and export Auth
export const database = getDatabase(app) // Add this line

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful')
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}

class AppEnterElement extends RouterBase {
  connectedCallback() {
    super.connectedCallback()
    this.resetAtNewDay()

    if (this.isInAppBrowser()) {
      alert(
        'Hey you silly goose, please open the-color-game.com in your default browser instead of whatever you are using now. I mean, you can use it now but its going to suck and not work good. Ya feel?'
      )
    }
  }

  resetAtNewDay() {
    const date = getDate()
    const today = new Date().getDate()
    if (date !== today) {
      reset()
      saveDate(today)
    }
  }

  isInAppBrowser() {
    // @ts-ignore
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Common in-app browser identifiers
    const inAppBrowsers = [
      'Instagram',
      'FBAN', // Facebook Android
      'FBAV', // Facebook App
      'Twitter', // Twitter App
      'Line', // Line App
      'WeiXin', // WeChat
      'LinkedIn', // LinkedIn App
      'WhatsApp', // WhatsApp Browser
      'FB_IAB', // Facebook In-App Browser
    ]

    return inAppBrowsers.some((browser) => userAgent.includes(browser))
  }

  render() {
    return html`
      <app-header></app-header>
      <slot></slot>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
    }

    app-header {
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 1;
    }

    slot {
      display: block;
      margin-top: 80px;
    }
  `
}

customElements.define('app-enter', AppEnterElement)
export default AppEnterElement
