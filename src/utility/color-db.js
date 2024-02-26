import { getColor } from './firebase-utils.js'
import { getDatabase, set, ref, onValue } from 'firebase/database'
// @ts-nocheck
const COLOR_INPUT = 'color-input'
const CURRENT_SCORE = 'current-score'
const DAILY_HIGH_SCORE = 'daily-high-score'
const LIVES = 'lives'

/**
 * @param {{ getMonth: () => number; getDate: () => any; getFullYear: () => any; }} date
 */
export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = String(date.getFullYear())
  return month + day + year
}

export async function getGoalColor() {
  const database = getDatabase()
  const date = formatDate(new Date())
  console.log('Function', date)
  const reference = ref(database, `/daily_color/${date}`)
  console.log('Function', reference)
  let goalColor = {}

  return new Promise((resolve, reject) => {
    onValue(
      reference,
      (snapshot) => {
        const data = snapshot.val()
        const red = parseInt(data.red, 10) // Parse red as an integer
        const blue = parseInt(data.blue, 10) // Parse blue as an integer
        const green = parseInt(data.green, 10) // Parse green as an integer
        goalColor = {
          red,
          blue,
          green,
        }
        resolve(goalColor)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export async function getGoalColorName() {
  const database = getDatabase()
  const date = formatDate(new Date())
  const reference = ref(database, `/daily_color/${date}`)

  return new Promise((resolve, reject) => {
    onValue(
      reference,
      (snapshot) => {
        const data = snapshot.val()
        const name = data.name
        const goalColorName = name
        resolve(goalColorName)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
/**
 * @typedef {Object} Color
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 * @property {number} alpha
 */

// @ts-ignore
export function saveInput(color) {
  localStorage.setItem(COLOR_INPUT, JSON.stringify(color))
}

export function getInput() {
  const input = localStorage.getItem(COLOR_INPUT)
  return JSON.parse(input)
}

export function clearColorDifferences() {
  localStorage.removeItem(COLOR_INPUT)
}
// @ts-ignore

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
// @ts-ignore

export function saveDailyHighScore(score) {
  localStorage.setItem(DAILY_HIGH_SCORE, JSON.stringify(score))
}

export function getDailyHighScore() {
  const score = localStorage.getItem(DAILY_HIGH_SCORE)
  return JSON.parse(score)
}
// @ts-ignore

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
  localStorage.setItem(LIVES, JSON.stringify(5))
}
