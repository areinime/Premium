import {

    auth,
    provider,
    signInWithPopup,

    db,
    ref,
    update,
    get

}

from "./firebase.js";

/********************************
GOOGLE BUTTON
********************************/

const btn =

document.getElementById(
    "googleBtn"
);

/********************************
LOGIN GOOGLE
********************************/

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

        /************************
        USER REF
        ************************/

        const userRef =

        ref(

            db,

            "users/" +
            user.uid

        );

        /************************
        UPDATE USER
        ************************/

        await update(

            userRef,

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

        /************************
        GET USER DATA
        ************************/

        const snapshot =

        await get(
            userRef
        );

        const data =

        snapshot.val();

        /************************
        ADMIN CHECK
        ************************/

        if(

            data &&
            data.admin === true

        ){

            localStorage.setItem(

                "premium_admin",

                "true"

            );

        }

        else{

            localStorage.setItem(

                "premium_admin",

                "false"

            );

        }

        /************************
        SAVE USER
        ************************/

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

        /************************
        SAVE PHOTO
        ************************/

        localStorage.setItem(

            "premium_photo",

            user.photoURL

        );

        /************************
        SAVE NAME
        ************************/

        localStorage.setItem(

            "premium_name",

            user.displayName

        );

        /************************
        REDIRECT
        ************************/

        location.href =
        "dashboard.html";

    }

    catch(error){

        alert(

            error.message

        );

    }

};
