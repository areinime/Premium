/********************************
CONFIG
********************************/

/*

==================================
SPOTIFY CLIENT ID

const CLIENT_ID = "";

==================================
SPOTIFY REDIRECT

const REDIRECT_URI = "";

==================================
FIREBASE UPDATE PROFILE

NANTI DISINI

==================================

*/

const CLIENT_ID = "";
const REDIRECT_URI = "";

/********************************
ELEMENT
********************************/

const menuBtn =
document.getElementById(
"menuBtn"
);

const sidebar =
document.getElementById(
"sidebar"
);

const profilePanel =
document.getElementById(
"profilePanel"
);

const overlay =
document.getElementById(
"overlay"
);

const profileBox =
document.querySelector(
".profileBox"
);

const cyberAlert =
document.getElementById(
"cyberAlert"
);

const premiumAlert =
document.getElementById(
"premiumAlert"
);

const saveProfile =
document.getElementById(
"saveProfile"
);

const displayName =
document.getElementById(
"displayName"
);

const whatsapp =
document.getElementById(
"whatsapp"
);

const avatar =
document.getElementById(
"avatar"
);

const profilePhoto =
document.getElementById(
"profilePhoto"
);

const uploadPhoto =
document.getElementById(
"uploadPhoto"
);

const addSpotify =
document.getElementById(
"addSpotify"
);

const joinedBox =
document.getElementById(
"joinedPlaylist"
);

const spotifyAccount =
document.querySelectorAll(
".spotifyAccount"
);

/********************************
ALERT
********************************/

function showAlert(text){

    cyberAlert.innerText =
    text;

    cyberAlert.classList.add(
    "show"
    );

    setTimeout(()=>{

        cyberAlert.classList.remove(
        "show"
        );

    },2500);

}

/********************************
PREMIUM ALERT
********************************/

function showPremium(){

    premiumAlert.classList.add(
    "show"
    );

    setTimeout(()=>{

        premiumAlert.classList.remove(
        "show"
        );

    },3000);

}

/********************************
OPEN SIDEBAR
********************************/

menuBtn.onclick = ()=>{

    sidebar.classList.add(
    "show"
    );

    overlay.classList.add(
    "show"
    );

    profilePanel.classList.remove(
    "show"
    );

};

/********************************
OPEN PROFILE
********************************/

profileBox.onclick = ()=>{

    profilePanel.classList.add(
    "show"
    );

    overlay.classList.add(
    "show"
    );

    sidebar.classList.remove(
    "show"
    );

};

/********************************
CLOSE PANEL
********************************/

if(overlay){

    overlay.onclick = ()=>{

        sidebar.classList.remove(
        "show"
        );

        profilePanel.classList.remove(
        "show"
        );

        overlay.classList.remove(
        "show"
        );

    };

}

/********************************
LOAD PROFILE
********************************/

const savedName =
localStorage.getItem(
"premium_name"
);

const savedWA =
localStorage.getItem(
"premium_wa"
);

const savedPhoto =
localStorage.getItem(
"premium_photo"
);

if(savedName){

    displayName.value =
    savedName;

}

if(savedWA){

    whatsapp.value =
    savedWA;

}

if(savedPhoto){

    avatar.src =
    savedPhoto;

    profilePhoto.src =
    savedPhoto;

}

/********************************
SAVE PROFILE
********************************/

saveProfile.onclick = ()=>{

    localStorage.setItem(
    "premium_name",
    displayName.value
    );

    localStorage.setItem(
    "premium_wa",
    whatsapp.value
    );

    /****************************
    FIREBASE UPDATE DISINI
    ****************************/

    /*
    update(
    ref(
    db,
    "users/"+uid
    ),
    {
        name:
        displayName.value,

        whatsapp:
        whatsapp.value
    });
    */

    showAlert(
    "PROFILE SAVED"
    );

};

/********************************
UPLOAD PHOTO
********************************/

const photoInput =
document.createElement(
"input"
);

photoInput.type =
"file";

photoInput.accept =
"image/*";

uploadPhoto.onclick = ()=>{

    photoInput.click();

};

photoInput.onchange = ()=>{

    const file =
    photoInput.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload = ()=>{

        avatar.src =
        reader.result;

        profilePhoto.src =
        reader.result;

        localStorage.setItem(
        "premium_photo",
        reader.result
        );

        showAlert(
        "PHOTO UPDATED"
        );

    };

    reader.readAsDataURL(
    file
    );

};

/********************************
PRIMARY SPOTIFY
********************************/

spotifyAccount.forEach(
account=>{

    account.onclick = ()=>{

        spotifyAccount.forEach(
        a=>{

            a.classList.remove(
            "primary"
            );

        });

        account.classList.add(
        "primary"
        );

        localStorage.setItem(
        "primary_account",
        account.innerText
        );

        showAlert(
        "PRIMARY CHANGED"
        );

    };

});

const primaryAccount =
localStorage.getItem(
"primary_account"
);

if(primaryAccount){

    spotifyAccount.forEach(
    account=>{

        if(

            account.innerText ===
            primaryAccount

        ){

            account.classList.add(
            "primary"
            );

        }

    });

}

/********************************
SPOTIFY LOGIN
********************************/

function spotifyLogin(){

    if(
    CLIENT_ID === ""
    ){

        showAlert(
        "SPOTIFY API EMPTY"
        );

        return;

    }

    /*
    window.location.href =
    "https://accounts.spotify.com/authorize";
    */

    showAlert(
    "SPOTIFY LOGIN"
    );

}

/********************************
ADD SPOTIFY
********************************/

if(addSpotify){

    addSpotify.onclick = ()=>{

        spotifyLogin();

    };

}

/********************************
COMING SOON
********************************/

function comingSoon(name){

    showAlert(
    name + " COMING SOON"
    );

}

/********************************
MY ARTIST
********************************/

function myArtist(){

    showAlert(
    "MY ARTIST COMING SOON"
    );

}

/********************************
MY POPULARITY
********************************/

function myPopularity(){

    showAlert(
    "MY POPULARITY COMING SOON"
    );

}

/********************************
MY SONG
********************************/

function mySong(){

    showAlert(
    "MY SONG COMING SOON"
    );

}

/********************************
JOINED PLAYLIST
********************************/

/*

localStorage:

joined_playlist

contoh:

[
"PRIME ZONE",
"UPMOOD"
]

*/

const joinedPlaylist =
JSON.parse(

    localStorage.getItem(
    "joined_playlist"
    )

) || [];

if(joinedBox){

    if(
    joinedPlaylist.length === 0
    ){

        joinedBox.innerHTML =

        `
        <div class="joinedEmpty">

        BELUM JOIN PLAYLIST

        </div>
        `;

    }

    else{

        joinedPlaylist.forEach(
        playlist=>{

            const item =
            document.createElement(
            "div"
            );

            item.className =
            "joinedItem";

            item.innerText =
            playlist;

            item.onclick = ()=>{

                showAlert(
                playlist
                );

            };

            joinedBox.appendChild(
            item
            );

        });

    }

}

/********************************
ADMIN CHECK
********************************/

const isAdmin =

localStorage.getItem(
"premium_admin"
);

if(
isAdmin === "true"
){

    console.log(
    "ADMIN LOGIN"
    );

}

/********************************
LOGOUT
********************************/

function logout(){

    sidebar.classList.remove(
    "show"
    );

    profilePanel.classList.remove(
    "show"
    );

    overlay.classList.remove(
    "show"
    );

    localStorage.clear();

    location.href =
    "index.html";

}

/********************************
ESC CLOSE
********************************/

document.addEventListener(
"keydown",
e=>{

    if(
    e.key === "Escape"
    ){

        sidebar.classList.remove(
        "show"
        );

        profilePanel.classList.remove(
        "show"
        );

        overlay.classList.remove(
        "show"
        );

    }

});
