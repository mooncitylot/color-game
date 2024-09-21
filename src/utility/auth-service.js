// @ts-nocheck
import { auth } from '../app-enter.js'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import { go } from '../router/router-base.js'
import { routes } from '../router/routes.js'
import { getUserData } from './firebase-utils.js'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../app-enter.js'
import { ref, get } from 'firebase/database'
import { listUsers } from 'firebase/auth'

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export async function updateCurrentUser() {
  const user = await getCurrentUser()
  const additionalData = await getUserData(user.user.uid)
  const combinedData = {
    ...user,
    additionalData: additionalData,
  }
  setCurrentUser(combinedData)
}
export function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export function clearCurrentUser() {
  localStorage.removeItem('currentUser')
  go(routes.LOGIN.path)
}

export async function getAllUsers() {}
