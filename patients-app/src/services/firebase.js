// import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCAuChRD3mY_i2CD6Nv4qeFvf7e_iKIo-Y",
//   authDomain: "clinicr-fcbed.firebaseapp.com",
//   projectId: "clinicr-fcbed",
//   storageBucket: "clinicr-fcbed.appspot.com",
//   messagingSenderId: "147447029572",
//   appId: "1:147447029572:web:0c01581633f98de7390111",
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const appVerifier = app;
// firebase.initializeApp(firebaseConfig);
// // var auth = firebase.auth();
// export { auth, appVerifier, signInWithPhoneNumber };

// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCAuChRD3mY_i2CD6Nv4qeFvf7e_iKIo-Y",
  authDomain: "clinicr-fcbed.firebaseapp.com",
  projectId: "clinicr-fcbed",
  storageBucket: "clinicr-fcbed.appspot.com",
  messagingSenderId: "147447029572",
  appId: "1:147447029572:web:0c01581633f98de7390111",
};

// firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();
// export { auth, firebase };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
