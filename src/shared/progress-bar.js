import { LitElement, html, css } from 'lit'

class ProgressBar extends LitElement {
  static properties = {
    progress: { type: Number },
  }

  constructor() {
    super()
    this.progress = 50
  }

  render() {
    return html`
      <div class="progress-bar">
        <div class="progress" style="width: ${this.progress}%"></div>
      </div>
    `
  }

  static styles = css`
    .progress-bar {
      width: 274px;
      height: 20px;
      background-color: #f4f4f4;
      border-radius: 10px;
      border: 2px solid grey;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background-color: #4caf50;
    }
  `
}

customElements.define('progress-bar', ProgressBar)
export default ProgressBar
