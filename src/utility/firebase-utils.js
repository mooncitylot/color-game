//@ts-nocheck
import { get, getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { ref, set, onValue } from 'firebase/database'
import { html, css } from 'lit'

/**
 * @param {Number} value
 */
export function setValue(value) {
  const database = getDatabase()
  const reference = ref(database, '/my_key')

  set(reference, {
    key: value,
  })
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

export function getColor() {
  const database = getDatabase()
  const date = formatDate(new Date())
  console.log(date)
  const reference = ref(database, `/daily_color/${date}`)

  onValue(reference, (snapshot) => {
    const data = snapshot.val()
    const blue = data.blue
    const green = data.green
    const red = data.red
    const name = data.name
    console.log(red, blue, green, name)
  })
}

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {string} name
 * @param {number} date
 */
export function setColor(red, green, blue, name, date) {
  const database = getDatabase()
  const reference = ref(database, `/daily_color/${date}`)
  set(reference, {
    red,
    green,
    blue,
    name,
  })
}

/**
 * @param {string} userId
 * @param {string} username
 * @param {number} points
 * @param {string} profilePic
 * @param {string} friends
 */
export function setUserData(userId, username, points, profilePic, friends) {
  const database = getDatabase()
  const reference = ref(database, `/user_data/${userId}`)
  set(reference, {
    username,
    points,
    profilePic,
    friends,
  })
}

export function getUserData(userId) {
  const database = getDatabase()
  const reference = ref(database, `/user_data/${userId}`)

  return get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available for this user')
        return null
      }
    })
    .catch((error) => {
      console.error('Error getting user data:', error)
      throw error
    })
}

/**
 * Checks if a username already exists in the database
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} - A promise that resolves to true if the username exists, false otherwise
 */
export function checkUsernameExists(username) {
  const database = getDatabase()
  const reference = ref(database, '/user_data')

  return get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val()
        return Object.values(userData).some((user) => user.username === username)
      }
      return false
    })
    .catch((error) => {
      console.error('Error checking username:', error)
      throw error
    })
}
