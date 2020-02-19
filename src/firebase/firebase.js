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

  export const fire=firebase.initializeApp(firebaseConfig);


  export function deleteDocument(collection, document){
    const db = fire.firestore();
    db.collection(collection).doc(document).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  };
 