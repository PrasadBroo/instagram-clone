import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";


var firebaseConfig = {
  apiKey: "AIzaSyCoIeB2Ae2PcbR16tsdBmML_YGW8qlb8Yw",
  authDomain: "instagram-clone-b51f6.firebaseapp.com",
  projectId: "instagram-clone-b51f6",
  storageBucket: "instagram-clone-b51f6.appspot.com",
  messagingSenderId: "988162572729",
  appId: "1:988162572729:web:083161ba18cf2b9321f668",
  measurementId: "G-YG8K2S7SZB"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth;
export const firestore = firebase.firestore;