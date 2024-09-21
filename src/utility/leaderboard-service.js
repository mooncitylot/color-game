// @ts-nocheck
import { formatDate } from './firebase-utils.js'
import { getCurrentUser } from './auth-service.js'
import { getDatabase, ref, push, set, get } from 'firebase/database'

export async function saveToDailyLeaderboard(score) {
  const date = formatDate(new Date())
  const username = (await getCurrentUser()).additionalData.username
  const scoreObject = {
    username: username,
    score: score,
  }
  const db = getDatabase()
  const leaderboardRef = ref(db, `daily-leaderboard/${date}`)
  const newScoreRef = push(leaderboardRef)
  await set(newScoreRef, scoreObject)
}

export async function getDailyLeaderboard() {
  const date = formatDate(new Date())
  const db = getDatabase()
  const leaderboardRef = ref(db, `daily-leaderboard/${date}`)

  try {
    const snapshot = await get(leaderboardRef)
    if (snapshot.exists()) {
      const leaderboardData = snapshot.val()
      return Object.entries(leaderboardData)
        .map(([key, value]) => ({ id: key, ...value }))
        .sort((a, b) => b.score - a.score)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}
