import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDuMuKf7oqebg71RCWkEvupK2QFfswsJcc",
  authDomain: "imoney-effe9.firebaseapp.com",
  projectId: "imoney-effe9",
  storageBucket: "imoney-effe9.appspot.com",
  messagingSenderId: "209228229986",
  appId: "1:209228229986:web:219f2c79fe2566d604d03b",
  measurementId: "G-9Z1X7XTRG9",
};
firebase.initializeApp(firebaseConfig);
const projectFireStore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectAuth, projectFireStore, timestamp, projectStorage };
