// @ts-nocheck
import { auth } from '../app-enter.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

// Store user info after successful login
export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

// Retrieve user info
export function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

// Clear user info on logout
export function clearCurrentUser() {
  localStorage.removeItem('currentUser')
}
