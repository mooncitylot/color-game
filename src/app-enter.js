import { html, css } from 'lit'
import RouterBase from './router/router-base.js'

class AppEnterElement extends RouterBase {
  render() {
    return html` <slot></slot> `
  }
}

customElements.define('app-enter', AppEnterElement)
export default AppEnterElement
