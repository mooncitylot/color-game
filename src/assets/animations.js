import { html, css, LitElement } from 'lit-element'

export const loading = html`<svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <style>
    .spinner_GuJz {
      transform-origin: center;
      animation: spinner_STY6 1.5s linear infinite;
      fill: orange;
    }
    @keyframes spinner_STY6 {
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <g class="spinner_GuJz">
    <circle cx="3" cy="12" r="2" />
    <circle cx="21" cy="12" r="2" />
    <circle cx="12" cy="21" r="2" />
    <circle cx="12" cy="3" r="2" />
    <circle cx="5.64" cy="5.64" r="2" />
    <circle cx="18.36" cy="18.36" r="2" />
    <circle cx="5.64" cy="18.36" r="2" />
    <circle cx="18.36" cy="5.64" r="2" />
  </g>
</svg>`
