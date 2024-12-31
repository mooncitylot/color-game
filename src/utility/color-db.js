import { getColor } from './firebase-utils.js'
import { getDatabase, set, ref, onValue } from 'firebase/database'
// @ts-nocheck
const COLOR_INPUT = 'color-input'
const CURRENT_SCORE = 'current-score'
const DAILY_HIGH_SCORE = 'daily-high-score'
const LIVES = 'lives'
const DATE = 'date'
const LAST_COLOR = 'last-color'
const GAME_OBJECT = 'game-object'

/**
 * @param {number} percentage
 * @param {number} score
 * @param {number} lives
 * @param {string} date
 * @param {Object} color
 */
export function updateGameObject(date, percentage, score, lives, color) {
  const existingGameObject = getGameObject()

  const updatedGameObject = {
    ...existingGameObject,
    [date]: {
      ...(existingGameObject[date] || {}),
      [lives]: { percentage, score, color },
    },
  }

  localStorage.setItem(GAME_OBJECT, JSON.stringify(updatedGameObject))
}

export function getGameObject() {
  const gameObject = localStorage.getItem(GAME_OBJECT)
  if (!gameObject) {
    return {}
  }
  return JSON.parse(gameObject)
}

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
  const reference = ref(database, `/daily_color/${date}`)
  let goalColor = {}

  try {
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
  } catch (error) {
    console.error('Error getting goal color', error)
  }
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
        if (data === null) {
          resolve('No color... text Tyler')
        }
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

/**
 * @param {any} color
 */
export function saveLastColor(color) {
  localStorage.setItem(LAST_COLOR, JSON.stringify(color))
}

export function GetLastColor() {
  const color = localStorage.getItem(LAST_COLOR)
  return JSON.parse(color)
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

/**
 * @param {Number} lives
 */
export function saveLives(lives) {
  localStorage.setItem(LIVES, JSON.stringify(lives))
}

export function getLives() {
  const lives = localStorage.getItem(LIVES)
  return JSON.parse(lives)
}

export function reset() {
  clearColorDifferences()
  localStorage.setItem(CURRENT_SCORE, JSON.stringify(0))
  localStorage.setItem(DAILY_HIGH_SCORE, JSON.stringify(0))
  localStorage.setItem(LIVES, JSON.stringify(5))
  localStorage.setItem(GAME_OBJECT, JSON.stringify({}))
}

/**
 * @param {any} date
 */
export function saveDate(date) {
  localStorage.setItem(DATE, JSON.stringify(date))
}

export function getDate() {
  const date = localStorage.getItem(DATE)
  return JSON.parse(date)
}

export async function generateRandomColorScheme() {
  const randomIndex = Math.floor(Math.random() * 6)
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const response = await fetch(
    `https://www.thecolorapi.com/scheme?rgb=(${r},${g},${b})&mode=analogic&count=6&format=json`
  )
  const data = await response.json()
  const color = data.colors[randomIndex]
  const colorObject = {
    name: color.name.value,
    red: color.rgb.r,
    green: color.rgb.g,
    blue: color.rgb.b,
  }
  return colorObject
}
