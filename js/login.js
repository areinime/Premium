import {
    auth,
    provider,
    signInWithPopup
}
from "./firebase.js";

const btn =
document.getElementById(
    "googleBtn"
);

btn.addEventListener(
    "click",
    async () => {

        try {

            const result =
            await signInWithPopup(
                auth,
                provider
            );

            const user =
            result.user;

            localStorage.setItem(
                "premium_user",
                JSON.stringify({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                })
            );

            alert(
                "Login berhasil!"
            );

            location.href =
            "dashboard.html";

        }

        catch(error){

            alert(
                error.message
            );

            console.log(error);

        }

    }
);
