// @ts-nocheck
const COLOR_INPUT = 'color-input'
const CURRENT_SCORE = 'current-score'

const goalColorName = 'Shrek Green'
const goalColor = {
  red: 120,
  green: 148,
  blue: 97,
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
  localStorage.setItem(CURRENT_SCORE, JSON.stringify(score))
}

export function getCurrentScore() {
  const score = localStorage.getItem(CURRENT_SCORE)
  return JSON.parse(score)
}
