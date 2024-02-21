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
