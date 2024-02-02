import { html, css } from 'lit'
import RouterBase from './router/router-base.js'

class AppEnterElement extends RouterBase {
  render() {
    return html` <slot></slot> `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
    }
  `
}

customElements.define('app-enter', AppEnterElement)
export default AppEnterElement
