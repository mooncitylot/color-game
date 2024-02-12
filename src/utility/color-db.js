// @ts-nocheck
const COLOR_INPUT = 'color-input'
const CURRENT_SCORE = 'current-score'
const DAILY_HIGH_SCORE = 'daily-high-score'

const goalColorName = 'Peachy Pink'
const goalColor = {
  red: 231,
  green: 136,
  blue: 149,
  alpha: 1,
}

export function getGoalColor() {
  return goalColor
}

export function getGoalColorName() {
  return goalColorName
}
/**
 * @typedef {Object} Color
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 * @property {number} alpha
 */

export async function compareColors(color1, color2) {
  const redDiff = Math.abs(color1.red - color2.red)
  const greenDiff = Math.abs(color1.green - color2.green)
  const blueDiff = Math.abs(color1.blue - color2.blue)

  // Save differences to local storage
  await saveColorDifferences(redDiff, greenDiff, blueDiff)

  try {
    // Wait for the data to be stored before logging
    const differences = await getColorDifferences()
    return redDiff + greenDiff + blueDiff
  } catch (error) {
    console.error('Error retrieving color differences:', error)
    return null // Handle the error gracefully
  }
}

/**
 * @returns {Promise<Color>}
 */
export function saveColorDifferences(redDiff, greenDiff, blueDiff) {
  localStorage.setItem(COLOR_INPUT, JSON.stringify({ redDiff, greenDiff, blueDiff }))
}

export function getColorDifferences() {
  const differences = localStorage.getItem(COLOR_INPUT)
  return JSON.parse(differences)
}

export function clearColorDifferences() {
  localStorage.removeItem(COLOR_INPUT)
}

export function saveCurrentScore(score) {
  if (score > getDailyHighScore()) {
    saveDailyHighScore(score)
  }
  localStorage.setItem(CURRENT_SCORE, JSON.stringify(score))
}

export function getCurrentScore() {
  const score = localStorage.getItem(CURRENT_SCORE)
  return JSON.parse(score)
}

export function saveDailyHighScore(score) {
  localStorage.setItem(DAILY_HIGH_SCORE, JSON.stringify(score))
}

export function getDailyHighScore() {
  const score = localStorage.getItem(DAILY_HIGH_SCORE)
  return JSON.parse(score)
}

export function getMessage(highScore) {
  let message = ''
  if (highScore === 0) {
    message = 'Nothing yet'
  }
  if (highScore > 0 && highScore < 25) {
    message = 'Keep searching...'
  }
  if (highScore >= 25 && highScore < 50) {
    message = 'Getting closer...'
  }
  if (highScore >= 50 && highScore < 75) {
    message = 'Almost there...'
  }
  if (highScore >= 75 && highScore < 90) {
    message = 'So close!'
  }
  if (highScore >= 90) {
    message = 'You did it!'
  }
  return message
}

export function reset() {
  clearColorDifferences()
  localStorage.setItem(CURRENT_SCORE, JSON.stringify(0))
  localStorage.setItem(DAILY_HIGH_SCORE, JSON.stringify(0))
}
