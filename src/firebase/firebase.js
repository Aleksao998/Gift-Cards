import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCwfah1AldcExze-5VR3a_TvKapBB3mnmA",
    authDomain: "tasnolinavauceri.firebaseapp.com",
    databaseURL: "https://tasnolinavauceri.firebaseio.com",
    projectId: "tasnolinavauceri",
    storageBucket: "tasnolinavauceri.appspot.com",
    messagingSenderId: "487641410751",
    appId: "1:487641410751:web:1cfc1d59d4092cbd6e6a0a"
  };

  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;
 