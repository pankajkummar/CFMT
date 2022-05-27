const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDEy-LUwxFPJ60j9a9cP-WJwZZfhYF0DxY",
    authDomain: "cfmt-b0408.firebaseapp.com",
    projectId: "cfmt-b0408",
    storageBucket: "cfmt-b0408.appspot.com",
    messagingSenderId: "63309771860",
    appId: "1:63309771860:web:fb265b1ed09cd46c3c69c1",
    measurementId: "G-XW956H31NZ"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const CompanyFunding = db.collection("CompanyFundings")
module.exports = CompanyFunding;