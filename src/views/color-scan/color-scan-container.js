import { html, css, LitElement } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import ColorScannerElement from '../../shared/color-scanner.js'

class ColorScanContainerElement extends LitElement {
  constructor() {
    super()
  }

  /** @param {RouteEnterArgs} arg0 */
  routeEnter({ nextView, context }) {
    console.log('ColorScanContainerElement.routeEnter', { nextView, context })
  }

  render() {
    return html`
      <back-arrow></back-arrow>
      <color-scanner></color-scanner>
    `
  }
}
customElements.define('color-scan-container', ColorScanContainerElement)
export default ColorScanContainerElement
