// @ts-nocheck
import { html, css, LitElement } from 'lit'
import { loading } from '../assets/animations.js'

class ColorScannerElement extends LitElement {
  static properties = {
    red: { type: String },
    green: { type: String },
    blue: { type: String },
    alpha: { type: String },
    captureTaken: { type: Boolean },
    isLoading: { type: Boolean },
    video: { type: Object },
  }

  constructor() {
    super()
    this.red = '0'
    this.green = '0'
    this.blue = '0'
    this.alpha = '0'
    this.captureTaken = false
    this.isLoading = false
    this.video = null
  }

  connectedCallback() {
    super.connectedCallback()
    requestAnimationFrame(() => {
      this.initCamera()
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

  drawCircle() {
    const canvas = this.shadowRoot.getElementById('canvasOverlay')
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Add a circle overlay at the center
    const centerX = Math.floor(canvas.width / 2.1)
    const centerY = Math.floor(canvas.height / 1.9)
    const radius = 20

    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.lineWidth = 8
    context.strokeStyle = 'white'
    context.stroke()
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

    this.red = pixel[0]
    this.green = pixel[1]
    this.blue = pixel[2]
    this.alpha = pixel[3] / 255

    console.log('RGB Values:', this.red, this.green, this.blue, this.alpha)
    this.captureTaken = true
    this.requestUpdate()
  }

  render() {
    return html` ${this.captureTaken ? this.renderResult() : this.renderScanner()}`
  }

  renderScanner() {
    return html`
      <div class="${this.captureTaken ? 'hide' : ''} wrapper">
        ${loading}
        <span class="video-mask"><video id="cameraFeed" autoplay></video></span>
        <canvas id="canvasOverlay" width="400" height="400"></canvas>
        <div class="color-zapper" @click="${this.captureImage}">ZAP COLOR!</div>
      </div>
    `
  }

  renderResult() {
    return html`
      <div class="wrapper">
        <div
          class="result"
          style="background-color: rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})"
        ></div>
        <p>Red: ${this.red}</p>
        <p>Green: ${this.green}</p>
        <p>Blue: ${this.blue}</p>
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

    svg {
      position: absolute;
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
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
      scale: 0.5;
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
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: teal;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Arial';
    }
  `
}

customElements.define('color-scanner', ColorScannerElement)
export default ColorScannerElement
