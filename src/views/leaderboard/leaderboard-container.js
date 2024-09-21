// @ts-nocheck
import { LitElement, html, css } from 'lit'
import { getAllUsers } from '../../utility/auth-service.js'
import { getDailyLeaderboard } from '../../utility/leaderboard-service.js'

class LeaderboardContainerElement extends LitElement {
  static properties = {
    leaderboard: { type: Array },
  }

  constructor() {
    super()
    this.leaderboard = []
  }

  async connectedCallback() {
    super.connectedCallback()
    const users = await getAllUsers()
    this.leaderboard = await getDailyLeaderboard()
    console.log(this.leaderboard)
    console.log(users)
  }

  render() {
    return html`
      <div class="leaderboard-wrap">
        <h1>Leaderboard</h1>

        ${[...new Map(this.leaderboard.map((item) => [item.username, item])).values()]
          .sort((a, b) => b.score - a.score)
          .map(
            (entry) => html`
              <div>
                <span>${entry.username}: </span>
                <span>${entry.score}%</span>
              </div>
            `
          )}
      </div>
    `
  }

  static styles = css`
    * {
      font-family: sans-serif;
    }
    .leaderboard-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  `
}

customElements.define('leaderboard-container', LeaderboardContainerElement)
