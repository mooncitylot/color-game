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
    'bigDave',
    'carlFromNextdoor',
    'masterShake100',
    'MEAT_WAD',
    'frylock76',
    'rickyFromCanada420',
    'bubbles01',
    'ROLL_TID3',
    'your_mom',
    'good_ol_boy',
    'funyun_crusher',
    'the_reel_slim_$hady',
    'dolla_billz82',
    'TheSenatorTedCruz',
    'billy_the_kid',
    'slay_queen',
    'dr_düm',
    'slip_on_a_banana_peel',
    'certified_public_enemy',
    'denis_the_menace08',
    'minnie_mouse',
    'micky_mouse',
    'bradly_pitts',
    'username123',
    'username456',
    'aquaTeenHungerForce4Ever',
    'Rocky_Balboa99',
    'gandalf_the_grey42',
    'gandalf_the_white99',
    'sauce_boss420',
    'the_dude_abides69',
    'space_ghost_coast2coast',
    'harvey_birdman_atty',
    'sealab2021',
    'early_cuyler_hat',
    'robot_chicken_seth',
    'venture_bros_dean',
    'brock_samson_mullet',
    'metalocalypse_nathan',
    'tim_eric_awesome',
    'carl_brutananadilewski',
    'master_shake_cup',
    'meatwad_gaming',
    'ignignokt_mooninite',
    'err_mooninite_2',
    'dr_weird_science',
    'steve_brule_health',
    'xavier_renegade',
    'superjail_warden',
    'boondocks_huey',
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
    console.log(scoreObject)

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
