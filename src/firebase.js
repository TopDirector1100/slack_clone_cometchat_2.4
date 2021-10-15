import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { firebaseConfig } from './app.config'
import { FIREBASE_CONSTANTS } from './consts'

const firebaseApp = firebase.initializeApp(FIREBASE_CONSTANTS)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider } 
export default db