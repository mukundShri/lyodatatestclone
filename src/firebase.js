import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


export const config = {
  apiKey: "AIzaSyA9JlUjBqNoO5d1gITMK5Z4eMRZiC1WsFo",
  authDomain: "lyodatatest.firebaseapp.com",
  databaseURL: "https://lyodatatest-default-rtdb.firebaseio.com",
  projectId: "lyodatatest",
  storageBucket: "lyodatatest.appspot.com",
  messagingSenderId: "302792799465",
  appId: "1:302792799465:web:12b5a722079a4f3948ac78",
  measurementId: "G-DBZLYGN235"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const storage = app.storage();//storage
export const storageRef = storage.ref()
export const db = app.firestore();
export const database = app.database()
export default app