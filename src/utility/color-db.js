// @ts-nocheck
const goalColor = {
  red: 255,
  green: 255,
  blue: 255,
  alpha: 1,
}

export function getGoalColor() {
  return goalColor
}

/**
 * @typedef {Object} Color
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 * @property {number} alpha
 */

export function compareColors(color1, color2) {
  const redDiff = Math.abs(color1.red - color2.red)
  const greenDiff = Math.abs(color1.green - color2.green)
  const blueDiff = Math.abs(color1.blue - color2.blue)

  // Save differences to local storage
  saveColorDifferences(redDiff, greenDiff, blueDiff)

  console.log('redDiff', redDiff)
  console.log('greenDiff', greenDiff)
  console.log('blueDiff', blueDiff)

  return redDiff + greenDiff + blueDiff
}

// Function to save differences to local storage
export function saveColorDifferences(redDiff, greenDiff, blueDiff) {
  const differences = {
    redDiff,
    greenDiff,
    blueDiff,
  }

  localStorage.setItem('colorDifferences', JSON.stringify(differences))
}

// Function to get differences from local storage
export function getColorDifferences() {
  return JSON.parse(localStorage.getItem('colorDifferences'))
}
