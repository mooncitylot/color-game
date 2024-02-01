import { html, css, LitElement } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'

class ColorScanContainerElement extends LitElement {
  constructor() {
    super()
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('ColorScanContainerElement.routeEnter', { nextView, context })
  }

  render() {
    return html` <back-arrow></back-arrow>
      <h1>Color Scan</h1>`
  }
}
customElements.define('color-scan-container', ColorScanContainerElement)
export default ColorScanContainerElement
