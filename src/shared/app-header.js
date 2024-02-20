import { LitElement, css, html } from 'lit'

class AppHeaderElement extends LitElement {
  render() {
    return html`
      <div class="header">
        <div class="rainbow-container">
          <div class="rainbow-child" style="background-color: #9E4597;"></div>
          <div class="rainbow-child" style="background-color: #5574B8;"></div>
          <div class="rainbow-child" style="background-color: #429754;"></div>
          <div class="rainbow-child" style="background-color: #E19E2B;"></div>
          <div class="rainbow-child" style="background-color: #BD3339;"></div>
        </div>
        <h1>Color Game</h1>
      </div>
    `
  }

  static styles = css`
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      width: 100vw;
      margin-bottom: 100px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      background-color: #f2efe5;
      font-family: 'Arial';
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }
    .rainbow-container {
      position: absolute;
      left: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0;
    }
    .header > h1 {
      position: absolute;
      right: 16px;
      margin: 0;
      font-family: 'Arial';
      color: #515151;
    }
    .rainbow-child {
      height: 64px;
      width: 16px;
    }
  `
}

customElements.define('app-header', AppHeaderElement)
export default AppHeaderElement
