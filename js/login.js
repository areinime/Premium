import {

    auth,
    provider,
    signInWithPopup,

    db,
    ref,
    set

}

from "./firebase.js";

const btn =

document.getElementById(
    "googleBtn"
);

btn.onclick =
async ()=>{

    try{

        const result =

        await signInWithPopup(
            auth,
            provider
        );

        const user =
        result.user;

        await set(

            ref(
                db,
                "users/" +
                user.uid
            ),

            {

                uid:
                user.uid,

                name:
                user.displayName,

                email:
                user.email,

                picture:
                user.photoURL,

                time:
                Date.now()

            }

        );

        localStorage.setItem(

            "premium_user",

            JSON.stringify({

                uid:
                user.uid,

                name:
                user.displayName,

                email:
                user.email,

                picture:
                user.photoURL

            })

        );

        location.href =
        "dashboard.html";

    }

    catch(error){

        alert(
            error.message
        );

    }

};
