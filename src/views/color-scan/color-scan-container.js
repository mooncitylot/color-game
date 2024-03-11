// @ts-nocheck
import { html, css, LitElement } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import ColorScannerElement from '../../shared/color-scanner.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { loading } from '../../assets/animations.js'
import { getGoalColor, getGoalColorName, saveInput } from '../../utility/color-db.js'
import { getDailyHighScore } from '../../utility/color-db.js'
import RainbowButtonElement from '../../shared/rainbow-button.js'
class ColorScanContainerElement extends LitElement {
  static properties = {
    capture: { type: Object },
    captureTaken: { type: Boolean },
    isLoading: { type: Boolean },
    video: { type: Object },
    target: { type: Object },
    goalColorName: { type: String },
    input: { type: Object },
    score: { type: Number },
  }

  constructor() {
    super()
    this.score = getDailyHighScore()
    this.capture = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    }
    this.captureTaken = false
    this.isLoading = false
    this.video = null
    this.target = ''
    this.animateContentFadeIn()
  }

  async connectedCallback() {
    super.connectedCallback()
    this.target = await getGoalColor()
    console.log('Target', this.target)
    this.goalColorName = await getGoalColorName()
    if (this.score > 90) {
      go(routes.DASHBOARD.path)
    }
    setTimeout(() => {
      this.initCamera()
    }, 1000)
  }

  animateContentFadeIn() {
    requestAnimationFrame(() => {
      const content = this.shadowRoot.getElementById('content')
      setTimeout(() => {
        content.style.opacity = '1'
      }, 100)
    })
  }

  initCamera() {
    this.video = this.shadowRoot.getElementById('cameraFeed')
    const constraints = {
      video: { facingMode: 'environment' },
      width: { ideal: 180 },
      height: { ideal: 180 },
      displayMode: { exact: 'inline' },
      frameRate: { ideal: 10 },
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.video.srcObject = stream
        console.log('Camera access granted:', stream)
      })
      .catch((error) => {
        console.error('Error accessing camera:', error)
      })
  }

  captureImage() {
    const video = this.shadowRoot.getElementById('cameraFeed')
    const canvas = this.shadowRoot.getElementById('canvasOverlay')
    const context = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const centerX = Math.floor(200)
    const centerY = Math.floor(200)
    const pixel = context.getImageData(centerX, centerY, 1, 1).data

    this.capture = {
      red: pixel[0],
      green: pixel[1],
      blue: pixel[2],
      alpha: pixel[3] / 255,
    }

    this.captureTaken = true
    this.requestUpdate()
  }

  retryConnection() {
    setTimeout(() => {
      this.initCamera(), console.log('Retrying connection...')
    }, 3000)
  }

  async handleSubmit() {
    saveInput(this.capture)
    go(routes.RESULTS.path)
  }

  render() {
    return html`
      <div class="wrapper-card">
        <div id="content">${this.captureTaken ? this.renderResult() : this.renderScanner()}</div>
      </div>
    `
  }

  renderScanner() {
    return html`
      <div class="${this.captureTaken ? 'hide' : ''} wrapper">
        <h1>"${this.goalColorName}"</h1>
        <span class="video-mask"><video id="cameraFeed" autoplay webkit-playsinline playsinline></video></span>

        <canvas id="canvasOverlay" width="400" height="400"> </canvas>

        <div class="crosshairs"></div>
        <div class="loading-spinner">${loading}</div>

        <div class="buttons">
          <rainbow-button @click="${this.captureImage}" text="Scan Color"></rainbow-button>
          <p>Having Trouble?</p>
          <a @click="${this.retryConnection}">Relaunch Camera</a>
        </div>
      </div>
    `
  }

  renderResult() {
    return html`
      <div class="wrapper">
        <div
          class="result"
          style="background-color: rgba(${this.capture.red}, ${this.capture.green}, ${this.capture.blue}, ${this.capture
            .alpha})"
        ></div>
      </div>
      <div class="buttons">
        <rainbow-button @click="${this.handleSubmit}" text="Submit"></rainbow-button>
        <a @click=${() => go(routes.COLOR_SCAN.path)}>Re-Scan Color</a>
      </div>
    `
  }

  renderScore() {
    return html`
      <div class="wrapper">
        <p>Score: ${compareColors(this.capture, this.target)}</p>
      </div>
    `
  }

  updated(changedProperties) {
    super.updated(changedProperties)
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 16px;
      overflow-x: hidden;
      font-family: 'Arial';
    }
    back-arrow {
      position: fixed;
      bottom: 24px;
    }
    rainbow-button {
      margin-bottom: 24px;
    }
    div {
      position: relative;
      display: inline-block;
    }

    h1 {
      font-family: 'Arial';
      color: var(--black, #515151);
      font-size: 24px;
      margin: 0;
    }

    #content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 1s;
    }

    .wrapper-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80%;
      gap: 16px;
      overflow-x: hidden;
      font-family: 'Arial';
      background-color: #f2efe5;
      padding: 16px;
      border-radius: 16px;
      border: 2px solid #b4b4b8;
    }

    .loading-spinner {
      z-index: -1;
      display: block;
      position: absolute;
      top: 41%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    a {
      color: black;
      cursor: pointer;
      font-family: 'Arial';
      text-decoration: underline;
      color: var(--black, #515151);
    }

    p {
      font-family: 'Arial';
      color: var(--black, #515151);
    }

    .crosshairs {
      z-index: 100;
      position: absolute;
      top: 41%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 4px solid #f2efe5;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0 0 0 10 rgba(0, 0, 0, 0.5);
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .wrapper p {
      margin: 0;
      padding: 0;
      font-family: 'Arial';
      color: var(--black, #515151);
    }

    video {
      display: block;
    }

    .video-mask {
      position: relative;
      overflow: hidden;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      scale: 0.75;
      border: 8px solid grey;
    }

    canvas {
      position: absolute;
      height: 200;
      width: 200;
      top: 0;
      left: 0;
    }

    .result {
      height: 200px;
      width: 200px;
      margin-bottom: 24px;
      border: 8px solid #515151;
      border-radius: 50%;
    }
    .hide {
      display: none;
    }

    .color-zapper {
      padding: 16px;
      width: 240px;
      color: #515151;
      background-color: #e3e1d9;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 24px;
      font-weight: bold;
      border: 8px solid;
      border-image: linear-gradient(to right, #9e4597, #5574b8, #429754, #e19e2b, #bd3339) 1;
      font-family: 'Arial';
      text-align: center;
    }

    .relaunch-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      padding: 10px 20px;
      width: 75vw;
      background-color: teal;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Arial';
    }

    .buttons {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `
}
customElements.define('color-scan-container', ColorScanContainerElement)
export default ColorScanContainerElement
