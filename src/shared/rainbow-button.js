import { html, css, LitElement } from 'lit'

class RainbowButtonElement extends LitElement {
  static properties = {
    text: { type: String },
    color: { type: String },
  }

  constructor() {
    super()
    this.text = 'Click Me'
    this.color = '#9E4597'
  }

  render() {
    return html`
      <div class="container">
        <button>${this.text}</button>
        <div class="rainbow-container">
          <div class="rainbow-child" style="background-color: #9E4597;"></div>
          <div class="rainbow-child" style="background-color: #5574B8;"></div>
          <div class="rainbow-child" style="background-color: #429754;"></div>
          <div class="rainbow-child" style="background-color: #E19E2B;"></div>
          <div class="rainbow-child" style="background-color: #BD3339;"></div>
        </div>
      </div>
    `
  }

  static styles = css`
    .container {
      position: relative;
      display: inline-block;
    }

    button {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px;
      width: 240px;
      color: #515151;
      background-color: #e3e1d9;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s;
      font-size: 24px;
      font-weight: bold;
      font-family: 'Arial';
      text-align: center;
      z-index: 1;
    }

    .rainbow-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0;
    }

    .rainbow-child {
      height: 80px;
      width: 52px;
    }
  `
}

customElements.define('rainbow-button', RainbowButtonElement)
export default RainbowButtonElement
