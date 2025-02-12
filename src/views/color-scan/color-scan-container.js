// @ts-nocheck
import { html, css, LitElement } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import ColorScannerElement from '../../shared/color-scanner.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { loading } from '../../assets/animations.js'
import { getGoalColor, getGoalColorName, saveInput, getDemoGoalColor } from '../../utility/color-db.js'
import { getDailyHighScore } from '../../utility/color-db.js'
import RainbowButtonElement from '../../shared/rainbow-button.js'
import { getCurrentUser } from '../../utility/auth-service.js'

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
    demoMode: { type: Boolean },
    currentColor: { type: Object },
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
    this.currentColor = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    }
  }

  async connectedCallback() {
    this.demoMode = getCurrentUser() ? false : true
    super.connectedCallback()
    if (this.demoMode) {
      this.demoMode = true
      this.goalColorName = 'Mystic Mango'
      this.target = await getDemoGoalColor()
    } else {
      this.target = await getGoalColor()
      this.goalColorName = await getGoalColorName()
    }

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
      frameRate: { ideal: 30 },
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.video.srcObject = stream
        this.startColorSampling()
      })
      .catch((error) => {
        console.error('Error accessing camera:', error)
      })
  }

  startColorSampling() {
    const video = this.shadowRoot.getElementById('cameraFeed')
    const canvas = this.shadowRoot.getElementById('canvasOverlay')
    const context = canvas.getContext('2d')

    const sampleColor = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const centerX = Math.floor(canvas.width / 2)
      const centerY = Math.floor(canvas.height / 2)
      const pixel = context.getImageData(centerX, centerY, 1, 1).data

      this.currentColor = {
        red: pixel[0],
        green: pixel[1],
        blue: pixel[2],
        alpha: 1,
      }
      this.requestUpdate()
      requestAnimationFrame(sampleColor)
    }

    requestAnimationFrame(sampleColor)
  }

  captureImage() {
    const video = this.shadowRoot.getElementById('cameraFeed')
    const canvas = this.shadowRoot.getElementById('canvasOverlay')
    const context = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const centerX = Math.floor(canvas.width / 2)
    const centerY = Math.floor(canvas.height / 2)
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
    return html` <div
        style="background-color: rgba(${this.currentColor.red}, ${this.currentColor.green}, ${this.currentColor
          .blue}, ${this.currentColor.alpha})"
        class="wrapper-card"
      >
        <div id="content">${this.captureTaken ? this.renderResult() : this.renderScanner()}</div>
      </div>
      <p>Having Trouble?</p>
      <a @click="${this.retryConnection}">Relaunch Scanner!</a>`
  }

  renderScanner() {
    const isColorReady = this.currentColor.red > 0 || this.currentColor.green > 0 || this.currentColor.blue > 0
    return html`
      <div class="${this.captureTaken ? 'hide' : ''} wrapper">
        <div
          class="current-color"
          style="background-color: rgba(${this.currentColor.red}, ${this.currentColor.green}, ${this.currentColor
            .blue}, ${this.currentColor.alpha})"
        ></div>
        <video id="cameraFeed" autoplay webkit-playsinline playsinline style="display: none;"></video>
        <canvas id="canvasOverlay" width="400" height="400" style="display: none;"></canvas>
        <div class="loading-spinner">${loading}</div>
        <div class="buttons">
          <button ?disabled="${!isColorReady}" @click="${this.captureImage}">${this.goalColorName}?</button>
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
        <button style="width: 100%;" @click=${() => go(routes.COLOR_SCAN.path)}>Redo</button>
        <button style="width: 100%;" @click="${this.handleSubmit}">Submit</button>
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
      overflow-x: hidden;
      font-family: 'Arial';
    }

    button {
      width: 100%;
      padding: 16px;
      background-color: #e3e1d9;
      font-family: sans-serif;
      font-size: 24px;
      font-weight: bold;
      border: 2px solid #b4b4b8;
      text-align: center;
      color: #515151;
      border-radius: 8px;
      cursor: pointer;
    }

    back-arrow {
      position: fixed;
      bottom: 24px;
    }
    rainbow-button {
      margin-bottom: 24px;
    }
    video {
      transform: translate(-175px, -150px);
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
      width: 90%;
      height: 60vh;
      gap: 16px;
      overflow-x: hidden;
      font-family: 'Arial';
      padding: 16px;
      border-radius: 16px;
      border: 2px solid #b4b4b8;
    }

    .loading-spinner {
      z-index: -1;
      display: block;
      position: absolute;
      top: 38%;
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
      // TODO: Not Needed but not sure if I might need it later
      display: none;
      z-index: 100;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 4px solid #f2efe5;
      border-radius: 16px;
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
      // TODO: Not Needed but not sure if I might need it later
      display: none;
      position: relative;
      overflow: hidden;
      width: 250px;
      height: 250px;
      border-radius: 24px;
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
      width: 100%;
      position: relative;
      display: flex;
      gap: 8px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .current-color {
      width: 250px;
      height: 250px;
      border-radius: 24px;
      margin: 40px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `
}
customElements.define('color-scan-container', ColorScanContainerElement)
export default ColorScanContainerElement
