import { html, css, LitElement } from 'lit-element'

class shareElement extends LitElement {
  static properties = {
    score: { type: Number },
  }
  constructor() {
    super()
    this.score = 0
  }
  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <h1>Share your score</h1>
          <p>Share your score with your friends and challenge them to beat it!</p>
          <div class="share-buttons">
            <button class="share-button">Facebook</button>
            <button class="share-button">Twitter</button>
            <button class="share-button">Instagram</button>
          </div>
        </div>
      </div>
    `
  }
  static styles = css`
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .popup-content {
      background-color: white;
      padding: 24px;
      border-radius: 8px;
    }
    .share-buttons {
      display: flex;
      justify-content: space-between;
    }
    .share-button {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background-color: #3b5998;
      color: white;
    }
    .share-button:hover {
      cursor: pointer;
    }
  `
}

export default shareElement
customElements.define('share-element', shareElement)
