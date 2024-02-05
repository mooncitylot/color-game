// @ts-nocheck
import { html, css, LitElement } from 'lit'
import BackArrowElement from '../../shared/back-arrow.js'
import ColorScannerElement from '../../shared/color-scanner.js'
import { go } from '../../router/router-base.js'
import routes from '../../router/routes.js'
import { loading } from '../../assets/animations.js'
import { getGoalColor, compareColors } from '../../utility/color-db.js'
class ColorScanContainerElement extends LitElement {
  static properties = {
    capture: { type: Object },
    captureTaken: { type: Boolean },
    isLoading: { type: Boolean },
    video: { type: Object },
    target: { type: Object },
  }

  constructor() {
    super()

    this.capture = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    }
    this.captureTaken = false
    this.isLoading = false
    this.video = null
    this.target = getGoalColor()
    console.log('Target Color:', this.target)
  }

  connectedCallback() {
    super.connectedCallback()
    setTimeout(() => {
      this.initCamera()
    }, 1000)
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

  render() {
    return html`
      <back-arrow
        @click=${() => {
          go(routes.DASHBOARD.path)
        }}
      ></back-arrow>

      ${this.captureTaken ? this.renderResult() : this.renderScanner()}
    `
  }

  renderScanner() {
    return html`
      <div class="${this.captureTaken ? 'hide' : ''} wrapper">
        <span class="video-mask"><video id="cameraFeed" autoplay webkit-playsinline playsinline></video></span>

        <canvas id="canvasOverlay" width="400" height="400"> </canvas>

        <div class="crosshairs"></div>
        <div class="loading-spinner">${loading}</div>

        <div class="buttons">
          <div class="color-zapper" @click="${this.captureImage}">Grab Color</div>
          <p>Having trouble?</p>
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
    `
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    this.drawCircle()
  }

  static styles = css`
    div {
      position: relative;
      display: inline-block;
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
      color: var(--black, #45474b);
    }

    .crosshairs {
      z-index: 100;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 4px solid white;
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
      color: var(--black, #45474b);
    }

    video {
      display: block;
    }

    .video-mask {
      position: relative;
      overflow: hidden;
      width: 400px;
      height: 400px;
      border-radius: 32px;
      scale: 0.75;
      border: 8px solid teal;
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
    }
    .hide {
      display: none;
    }

    .color-zapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      padding: 10px 20px;
      width: 180px;
      background-color: orange;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Arial';
      font-size: 100%;
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
