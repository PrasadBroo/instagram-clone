import firebase  from 'firebase/app';

const appCheck = firebase.appCheck();
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
appCheck.activate(
  '6Lc-UdwbAAAAADyJso4qbK09v_6zGunxid2AEbJt',

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  true);
