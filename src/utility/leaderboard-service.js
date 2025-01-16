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

export async function generateBotScores(count = 10) {
  const date = formatDate(new Date())
  const score = () => Math.floor(Math.random() * 90)
  const userNames = [
    'gamer_pro123',
    'ninja_master456',
    'cool_kid789',
    'epic_player42',
    'dragon_slayer99',
    'super_star777',
    'pixel_warrior55',
    'cosmic_hero88',
    'mega_gamer365',
    'power_player44',
    'ultimate_boss22',
    'legendary_user11',
    'master_chief117',
    'dark_knight999',
    'space_ranger33',
    'cyber_punk2077',
    'retro_gamer64',
    'elite_player101',
    'pro_gamer360',
    'epic_winner777',
    'game_master42',
    'pixel_ninja99',
    'cosmic_warrior55',
    'mega_boss365',
    'power_user123',
    'ultimate_player88',
    'legendary_hero44',
    'master_gamer22',
    'dark_warrior11',
    'space_master117',
    'cyber_hero999',
    'retro_master33',
    'elite_ninja2077',
    'pro_chief64',
    'epic_knight101',
    'game_ranger360',
    'pixel_punk777',
    'cosmic_gamer42',
    'mega_ninja99',
    'power_warrior55',
    'ultimate_user365',
    'legendary_boss123',
    'master_player88',
    'dark_hero44',
    'space_warrior22',
    'cyber_master11',
    'retro_hero117',
    'elite_warrior999',
    'pro_master33',
    'epic_ninja2077',
    'game_ninja99',
    'pixel_chief55',
    'cosmic_chief365',
    'mega_chief123',
    'power_chief88',
    'ultimate_chief44',
    'legendary_chief11',
    'master_chief55',
    'dark_chief999',
    'space_chief117',
    'cyber_chief2077',
    'retro_chief64',
    'gamer_pro123',
    'ninja_master456',
    'cool_kid789',
    'epic_player42',
    'dragon_slayer99',
    'super_star777',
    'pixel_warrior55',
    'cosmic_hero88',
    'mega_gamer365',
    'power_player44',
    'ultimate_boss22',
  ]

  const db = getDatabase()
  const leaderboardRef = ref(db, `daily-leaderboard/${date}`)

  // Generate multiple random scores
  for (let i = 0; i < count; i++) {
    const randomUsername = userNames[Math.floor(Math.random() * userNames.length)]
    const scoreObject = {
      username: randomUsername,
      score: score(),
    }

    const newScoreRef = push(leaderboardRef)
    await set(newScoreRef, scoreObject)
  }
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
