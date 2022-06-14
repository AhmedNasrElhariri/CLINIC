import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBu5DPIIc_hEieLoO9kihOxyVAVJiQ2vH8',
  authDomain: 'clinicr-a71ac.firebaseapp.com',
  projectId: 'clinicr-a71ac',
  storageBucket: 'clinicr-a71ac.appspot.com',
  messagingSenderId: '295313587935',
  appId: '1:295313587935:web:928c7cc215ded60cf3f36a',
  measurementId: 'G-7PTZ4C3YVD',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyCAuChRD3mY_i2CD6Nv4qeFvf7e_iKIo-Y',
//   authDomain: 'clinicr-fcbed.firebaseapp.com',
//   projectId: 'clinicr-fcbed',
//   storageBucket: 'clinicr-fcbed.appspot.com',
//   messagingSenderId: '147447029572',
//   appId: '1:147447029572:web:0c01581633f98de7390111',
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
