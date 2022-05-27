const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDq4VmkntcgD7vEGY_jTlfDMd3numxtD44",
    authDomain: "cfmt-ebc66.firebaseapp.com",
    projectId: "cfmt-ebc66",
    storageBucket: "cfmt-ebc66.appspot.com",
    messagingSenderId: "1001784382536",
    appId: "1:1001784382536:web:5c2cf2f7007cd4884df47d",
    measurementId: "G-7M0ZDPMZ5W"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const CompanyFunding = db.collection("CompanyFundings")
module.exports = CompanyFunding;