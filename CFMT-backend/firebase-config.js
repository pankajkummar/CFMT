const firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyBtkBg49bQ_e8O9PpwlnAYP9Fx3K3sMyHM",
  authDomain: "cfmt-79a06.firebaseapp.com",
  projectId: "cfmt-79a06",
  storageBucket: "cfmt-79a06.appspot.com",
  messagingSenderId: "210915915931",
  appId: "1:210915915931:web:719ecd6c33ad24a0dc2e3e",
  measurementId: "G-MVHWYXNTQK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const CompanyFunding = db.collection("CompanyFundings")
module.exports = CompanyFunding;