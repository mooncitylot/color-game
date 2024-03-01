import { html } from 'lit-html'
export const questionIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha">
    <path fill="#D9D9D9" d="M0 0h24v24H0z" />
  </mask>
  <g mask="url(#a)">
    <path
      fill="#515151"
      d="M11.95 18c.35 0 .646-.12.888-.363.241-.241.362-.537.362-.887s-.12-.646-.362-.887a1.207 1.207 0 0 0-.888-.363 1.2 1.2 0 0 0-.887.363 1.207 1.207 0 0 0-.363.887c0 .35.12.646.363.887.241.242.537.363.887.363Zm-.9-3.85h1.85c0-.55.063-.983.188-1.3.125-.317.479-.75 1.062-1.3a7.494 7.494 0 0 0 1.025-1.238c.25-.391.375-.862.375-1.412 0-.933-.342-1.65-1.025-2.15-.683-.5-1.492-.75-2.425-.75-.95 0-1.72.25-2.313.75a3.97 3.97 0 0 0-1.237 1.8l1.65.65c.083-.3.27-.625.563-.975.291-.35.737-.525 1.337-.525.533 0 .933.146 1.2.437.267.292.4.613.4.963 0 .333-.1.646-.3.938-.2.291-.45.562-.75.812-.733.65-1.183 1.142-1.35 1.475-.167.333-.25.942-.25 1.825ZM12 22a9.738 9.738 0 0 1-3.9-.788 10.099 10.099 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 0 1 2 12a9.74 9.74 0 0 1 .788-3.9 10.099 10.099 0 0 1 2.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0 1 12 2a9.74 9.74 0 0 1 3.9.788 10.098 10.098 0 0 1 3.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0 1 22 12a9.738 9.738 0 0 1-.788 3.9 10.098 10.098 0 0 1-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0 1 12 22Zm0-2c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20Z"
    />
  </g>
</svg> `

export const logoutIcon = html`<svg
  width="12"
  height="12"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask id="mask0_21_7" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_21_7)">
    <path
      d="M20.15 13H8V11H20.15L18.6 9.45L20 8L24 12L20 16L18.6 14.55L20.15 13ZM15 9V5H5V19H15V15H17V19C17 19.55 16.8042 20.0208 16.4125 20.4125C16.0208 20.8042 15.55 21 15 21H5C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H15C15.55 3 16.0208 3.19583 16.4125 3.5875C16.8042 3.97917 17 4.45 17 5V9H15Z"
      fill="#515151"
    />
  </g>
</svg> `

export const homeIcon = html`<svg
  width="12"
  height="12"
  viewBox="0 0 25 25"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask id="mask0_15_7" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
    <rect x="0.963623" y="0.528259" width="24" height="24" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_15_7)">
    <path
      d="M4.96362 21.5283V12.1533L3.16362 13.5283L1.96362 11.9283L4.96362 9.62826V6.52826H6.96362V8.10326L12.9636 3.52826L23.9636 11.9283L22.7636 13.5033L20.9636 12.1533V21.5283H4.96362ZM6.96362 19.5283H11.9636V15.5283H13.9636V19.5283H18.9636V10.6283L12.9636 6.05326L6.96362 10.6283V19.5283ZM4.96362 5.52826C4.96362 4.69493 5.25529 3.98659 5.83862 3.40326C6.42196 2.81993 7.13029 2.52826 7.96362 2.52826C8.24696 2.52826 8.48446 2.43243 8.67612 2.24076C8.86779 2.04909 8.96362 1.81159 8.96362 1.52826H10.9636C10.9636 2.36159 10.672 3.06993 10.0886 3.65326C9.50529 4.23659 8.79696 4.52826 7.96362 4.52826C7.68029 4.52826 7.44279 4.62409 7.25112 4.81576C7.05946 5.00743 6.96362 5.24493 6.96362 5.52826H4.96362Z"
      fill="#515151"
    />
  </g>
</svg> `

export const heartIconGrey = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask id="mask0_25_3" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#BD3339" />
  </mask>
  <g mask="url(#mask0_25_3)">
    <path
      d="M11.975 22.15L9.95 20.325C8.2 18.7583 6.75417 17.4 5.6125 16.25C4.47083 15.1 3.57083 14.0667 2.9125 13.15C2.25417 12.2333 1.79167 11.3833 1.525 10.6C1.25833 9.81666 1.125 8.99999 1.125 8.14999C1.125 6.33408 1.73113 4.8176 2.9434 3.60057C4.15568 2.38352 5.66622 1.77499 7.475 1.77499C8.32387 1.77499 9.13192 1.92499 9.89915 2.22499C10.6664 2.52499 11.3583 2.96666 11.975 3.54999C12.5917 2.96666 13.2836 2.52499 14.0508 2.22499C14.8181 1.92499 15.6261 1.77499 16.475 1.77499C18.298 1.77499 19.8205 2.38352 21.0423 3.60057C22.2641 4.8176 22.875 6.33408 22.875 8.14999C22.875 8.98333 22.7458 9.79166 22.4875 10.575C22.2292 11.3583 21.7667 12.2042 21.1 13.1125C20.4333 14.0208 19.525 15.0542 18.375 16.2125C17.225 17.3708 15.7667 18.7417 14 20.325L11.975 22.15Z"
      fill="#515151"
    />
  </g>
</svg> `

export const heartIconRed = html`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask id="mask0_22_36" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#BD3339" />
  </mask>
  <g mask="url(#mask0_22_36)">
    <path
      d="M11.975 22.15L9.95 20.325C8.2 18.7583 6.75417 17.4 5.6125 16.25C4.47083 15.1 3.57083 14.0667 2.9125 13.15C2.25417 12.2333 1.79167 11.3833 1.525 10.6C1.25833 9.81666 1.125 8.99999 1.125 8.14999C1.125 6.33408 1.73113 4.8176 2.9434 3.60057C4.15568 2.38352 5.66622 1.77499 7.475 1.77499C8.32387 1.77499 9.13192 1.92499 9.89915 2.22499C10.6664 2.52499 11.3583 2.96666 11.975 3.54999C12.5917 2.96666 13.2836 2.52499 14.0508 2.22499C14.8181 1.92499 15.6261 1.77499 16.475 1.77499C18.298 1.77499 19.8205 2.38352 21.0423 3.60057C22.2641 4.8176 22.875 6.33408 22.875 8.14999C22.875 8.98333 22.7458 9.79166 22.4875 10.575C22.2292 11.3583 21.7667 12.2042 21.1 13.1125C20.4333 14.0208 19.525 15.0542 18.375 16.2125C17.225 17.3708 15.7667 18.7417 14 20.325L11.975 22.15Z"
      fill="#BD3339"
    />
  </g>
</svg> `
