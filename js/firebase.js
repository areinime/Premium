import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    update,
    get
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {

    apiKey:
    "AIzaSyAsoXmY54RF-vuKAznFObxATSwqDfl_u68",

    authDomain:
    "premium-853aa.firebaseapp.com",

    databaseURL:
    "https://premium-853aa-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
    "premium-853aa",

    storageBucket:
    "premium-853aa.firebasestorage.app",

    messagingSenderId:
    "507436387791",

    appId:
    "1:507436387791:web:9786e7acc83ad98c0f16ba"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const provider =
new GoogleAuthProvider();

const db =
getDatabase(app);

export {

    auth,
    provider,
    signInWithPopup,

    db,
    ref,
    set

};
