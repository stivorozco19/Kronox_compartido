import firebase from 'firebase/app';

  const firebaseConfig = {
    apiKey: "AIzaSyBgT7oMkn-FeFhkQRCKtfefwP-G3W9qpZ4",
    authDomain: "kronox-v1.firebaseapp.com",
    databaseURL: "https://kronox-v1.firebaseio.com",
    projectId: "kronox-v1",
    storageBucket: "kronox-v1.appspot.com",
    messagingSenderId: "857809918406",
    appId: "1:857809918406:web:bc365a23304af48367bac7",
    measurementId: "G-W6VEB8LVXS"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
