// @ts-nocheck
import { auth } from '../app-enter.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { go } from '../router/router-base.js'
import { routes } from '../router/routes.js'

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export function setCurrentUser(user) {
  console.log('setting current user')
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export function getCurrentUser() {
  console.log('getting current user')
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export function clearCurrentUser() {
  console.log('clearing current user')
  localStorage.removeItem('currentUser')
  go(routes.LOGIN.path)
}
