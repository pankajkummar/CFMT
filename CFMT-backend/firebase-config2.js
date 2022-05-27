const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyBWLR6qFjYVvx83SBmWli2mElqC76C3GIc",
    authDomain: "cfmt-f64b1.firebaseapp.com",
    projectId: "cfmt-f64b1",
    storageBucket: "cfmt-f64b1.appspot.com",
    messagingSenderId: "935653622694",
    appId: "1:935653622694:web:6fdfe090473db95a92c567",
    measurementId: "G-G7MXF7B72L"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const CompanyFunding = db.collection("CompanyFundings")
module.exports = CompanyFunding;