import { LitElement, html, css } from 'lit'
import { getCurrentUser } from '../utility/auth-service.js'

export class LevelViewer extends LitElement {
  constructor() {
    super()
    this.level = getCurrentUser()?.additionalData?.level || 0

    if (isNaN(this.level)) {
      this.level = 0
      this.userClass = 'Slug'
      this.toNextLevel = 1000
      return
    }

    this.toNextLevel = 1000 - (this.level % 1000)

    if (this.level >= 0) this.userClass = 'Slug'
    if (this.level >= 1000) this.userClass = 'Toad'
    if (this.level >= 2000) this.userClass = 'Chipmunk'
    if (this.level >= 3000) this.userClass = 'Squirrel'
    if (this.level >= 4000) this.userClass = 'Peasant'
    if (this.level >= 5000) this.userClass = 'Knight'
    if (this.level >= 6000) this.userClass = 'Warrior'
    if (this.level >= 7000) this.userClass = 'Samurai'
    if (this.level >= 8000) this.userClass = 'Ninja'
    if (this.level >= 9000) this.userClass = 'Samurai'
    if (this.level >= 10000) this.userClass = 'champion'
    if (this.level >= 11000) this.userClass = 'legendary'
    if (this.level >= 12000) this.userClass = 'mythical'
    if (this.level >= 13000) this.userClass = 'transcendent'
    if (this.level >= 14000) this.userClass = 'divine'
    if (this.level >= 15000) this.userClass = 'immortal'
    if (this.level >= 16000) this.userClass = 'celestial'
    if (this.level >= 17000) this.userClass = 'ethereal'
    if (this.level >= 18000) this.userClass = 'omniscient'
    if (this.level >= 19000) this.userClass = 'sovereign'
    if (this.level >= 20000) this.userClass = 'supreme'
  }

  render() {
    return html`<h4>
      <span class="level">Level: ${this.level} ${this.userClass} </span>|
      <span class="to-next-level">${this.toNextLevel} to next level</span>
    </h4>`
  }

  static styles = css`
    h4 {
      font-size: 12px;
      color: #515151;
      margin: 0;
    }
    .level {
      font-weight: 600;
    }
    .to-next-level {
      font-weight: 400;
    }
  `
}

customElements.define('level-viewer', LevelViewer)
export default LevelViewer
