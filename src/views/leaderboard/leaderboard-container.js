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
        <h1>Top 10 Leaderboard</h1>
        <div class="leaderboard-container">
          ${[...new Map(this.leaderboard.map((item) => [item.username, item])).values()]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(
              (entry, index) => html`
                <div
                  class="leaderboard-entry ${index % 2 === 0 ? 'background-color-1' : 'background-color-2'} ${index ===
                  0
                    ? 'winner'
                    : ''}"
                >
                  <h3>${index + 1}. ${entry.username}:</h3>
                  <h3>${entry.score}%</h3>
                </div>
              `
            )}
        </div>
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
    .leaderboard-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 80%;
      height: 80%;
      overflow-y: auto;
      border: 8px solid grey;
      border-radius: 8px;
    }
    .leaderboard-entry {
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
    }
    .background-color-1 {
      background-color: lightgray;
    }
    .background-color-2 {
      background-color: #fff;
    }
    .winner {
      background-color: lightgreen;
      color: black;
    }
  `
}

customElements.define('leaderboard-container', LeaderboardContainerElement)
