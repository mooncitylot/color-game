// @ts-nocheck
import { html, css, LitElement } from 'lit'

class ColorScannerElement extends LitElement {
  static properties = {
    red: { type: String },
    green: { type: String },
    blue: { type: String },
    alpha: { type: String },
    captureTaken: { type: Boolean },
  }

  constructor() {
    super()
    this.red = '0'
    this.green = '0'
    this.blue = '0'
    this.alpha = '0'
    this.captureTaken = false
  }

  firstUpdated() {
    const video = this.shadowRoot.getElementById('cameraFeed')

    // Specify rear-facing camera by adding 'facingMode' constraint
    const constraints = {
      video: { facingMode: 'environment' }, // 'environment' uses the rear camera
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream
      })
      .catch((error) => {
        console.error('Error accessing camera:', error)
      })
  }

  drawCircle() {
    const canvas = this.shadowRoot.getElementById('canvasOverlay')
    const context = canvas.getContext('2d')

    // Clear previous drawings
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Add a circle overlay at the center
    const centerX = Math.floor(canvas.width / 2)
    const centerY = Math.floor(canvas.height / 2)
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

    // Get the RGB value in the middle of the image
    const centerX = Math.floor(canvas.width / 2)
    const centerY = Math.floor(canvas.height / 2)
    const pixel = context.getImageData(centerX, centerY, 1, 1).data

    this.red = pixel[0]
    this.green = pixel[1]
    this.blue = pixel[2]
    this.alpha = pixel[3] / 255

    console.log('RGB Values:', this.red, this.green, this.blue, this.alpha)
    this.captureTaken = true
  }

  render() {
    return html`
      <div class="${this.captureTaken ? 'hide' : ''}">
        <video id="cameraFeed" width="400" height="400" autoplay></video>
        <canvas id="canvasOverlay" width="400" height="400"></canvas>
        <button @click="${this.captureImage}">ZAP COLOR!</button>
      </div>
      <div class="result" style="background-color: rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})"></div>
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

    video {
      display: block;
      height: 400px;
      width: 400px;
      margin: 20px auto;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }

    button {
      margin-top: 10px;
    }
    .result {
      height: 100px;
      width: 100px;
    }
    .hide {
      display: none;
    }
  `
}

customElements.define('color-scanner', ColorScannerElement)
export default ColorScannerElement
