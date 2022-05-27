const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDckRXBn0m1DmReCaAtT8ck7hj4bgIgYy0",
    authDomain: "cfmt-b7151.firebaseapp.com",
    projectId: "cfmt-b7151",
    storageBucket: "cfmt-b7151.appspot.com",
    messagingSenderId: "960672290802",
    appId: "1:960672290802:web:73128b37308ced794dfd6b",
    measurementId: "G-9Y1EP91WNX"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const CompanyFunding = db.collection("CompanyFundings")
module.exports = CompanyFunding;