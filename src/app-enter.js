import { html, css } from 'lit'
import AppHeaderElement from './shared/app-header.js'
import RouterBase from './router/router-base.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, set } from 'firebase/database'
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

class AppEnterElement extends RouterBase {
  connectedCallback() {
    super.connectedCallback()
    this.resetAtNewDay()
  }

  resetAtNewDay() {
    const date = getDate()
    const today = new Date().getDate()
    if (date !== today) {
      reset()
      saveDate(today)
    }
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
