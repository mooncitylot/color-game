import { LitElement, html, css } from 'lit'

export class UpdatesContainerElement extends LitElement {
  render() {
    return html`
      <div class="updates-container">
        <h1>Updates: January 2025</h1>
        <ul>
          <li>New color scanning system.</li>
          <li>Demo mode added to the game. Try before you sign up.</li>
          <li>Leaderboard improvements.</li>
          <li>Level System added to game. Daily score added to your Level, level up every 1000 points.</li>
        </ul>
        <hr />
      </div>
    `
  }

  static styles = css`
    h1 {
      font-family: sans-serif;
      font-size: 24px;
      font-weight: bold;
      color: #515151;
    }
    p {
      font-family: sans-serif;
      font-size: 16px;
      color: #515151;
    }
    li {
      font-family: sans-serif;
      font-size: 16px;
      color: #515151;
    }
    .updates-container {
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: left;
      padding: 20px;
    }
  `
}
customElements.define('updates-container', UpdatesContainerElement)
export default UpdatesContainerElement
