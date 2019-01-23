import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC6J7vKykcjvpJFY8qlrE473FMdLlmejdg", // TODO .env?
  authDomain: "beer-of-the-day.firebaseapp.com",
  databaseURL: "https://beer-of-the-day.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

// this is a named export 🤙
export { firebaseApp };

// 
export default base;