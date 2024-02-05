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

export async function compareColors(color1, color2) {
  const redDiff = Math.abs(color1.red - color2.red)
  const greenDiff = Math.abs(color1.green - color2.green)
  const blueDiff = Math.abs(color1.blue - color2.blue)

  // Save differences to local storage
  await saveColorDifferences(redDiff, greenDiff, blueDiff)

  try {
    // Wait for the data to be stored before logging
    const differences = await getColorDifferences()
    console.log('color differences:', differences)
    return redDiff + greenDiff + blueDiff
  } catch (error) {
    console.error('Error retrieving color differences:', error)
    return null // Handle the error gracefully
  }
}

// Function to save differences to local storage
export async function saveColorDifferences(redDiff, greenDiff, blueDiff) {
  const differences = {
    redDiff,
    greenDiff,
    blueDiff,
  }

  localStorage.setItem('colorDifferences', JSON.stringify(differences))

  console.log('Differences saved:', differences)
}

export async function getColorDifferences() {
  const differencesString = localStorage.getItem('colorDifferences')
  // Parse the string as JSON
  const differencesObject = JSON.parse(differencesString)
  return differencesObject
}
