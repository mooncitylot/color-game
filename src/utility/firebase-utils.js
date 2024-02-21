import { get, getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { ref, set } from 'firebase/database'
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
