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
  }

  render() {
    return html`
      <div class="leaderboard-wrap">
        <div class="leaderboard-container">
          <h1>Daily <br />Leaderboard</h1>

          ${[...new Map(this.leaderboard.map((item) => [item.username, item])).values()]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(
              (entry, index) => html`
                <div
                  class="leaderboard-entry ${index % 2 === 0 ? 'background-color-1' : 'background-color-2'} "
                >
                  <h3><span class="rank"></span>${index + 1}</span>${
                index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index === 9 ? '🤡' : ''
              } <span class="username"> ${entry.username}</span> </h3>
                  <h3>${entry.score}</h3>
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
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #515151;
      margin: 0;
      margin-bottom: 16px;
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
      width: 80%;
      height: 80%;
      overflow-y: auto;
    }
    .leaderboard-entry {
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 8px 16px;
    }
    .background-color-1 {
      background-color: #f2efe5;
    }
    .background-color-2 {
      background-color: #f2f2f2;
    }
    .winner {
      background-color: lightgreen;
      color: black;
    }
    .rank {
      font-weight: bold;
    }
    .username {
      font-weight: 400;
    }
  `
}

customElements.define('leaderboard-container', LeaderboardContainerElement)
