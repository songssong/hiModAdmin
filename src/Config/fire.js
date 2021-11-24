import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDq46AaFf8sQW08HZiI7AwBn2hps3MoLgY",
  authDomain: "himod-593b2.firebaseapp.com",
  projectId: "himod-593b2",
  storageBucket: "himod-593b2.appspot.com",
  messagingSenderId: "952347196314",
  appId: "1:952347196314:web:81da191876be4ce6a75823",
  measurementId: "G-JQFVZBY8PS"
});
export const authen = firebaseConfig.auth();
export const firestore = firebaseConfig.firestore();

export default firebaseConfig;

