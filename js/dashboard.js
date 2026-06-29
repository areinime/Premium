/********************************
CONFIG
********************************/

/*
==================================
SPOTIFY CLIENT ID
==================================
*/

const CLIENT_ID = "";
const REDIRECT_URI = "";

/*
==================================
FIREBASE AREA
==================================

NANTI DISINI

uid
premium
spotify
profile

==================================
*/


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

const spotifyLogin =
document.getElementById(
"spotifyLogin"
);

const addSpotify =
document.getElementById(
"addSpotify"
);

const spotifyList =
document.getElementById(
"spotifyList"
);

const joinedBox =
document.getElementById(
"joinedPlaylist"
);


/********************************
CYBER ALERT
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
DEFAULT AVATAR
********************************/

if(!savedPhoto){

    avatar.src =
    "img/default.png";

    profilePhoto.src =
    "img/default.png";

}


/********************************
PHOTO INPUT
********************************/

const photoInput =
document.createElement(
"input"
);

photoInput.type =
"file";

photoInput.accept =
"image/*";

photoInput.style.display =
"none";

document.body.appendChild(
photoInput
);


/********************************
CHANGE PHOTO
********************************/

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

    /*
    ==================================
    FIREBASE UPDATE
    ==================================

    update(
    ref(db,"users/"+uid),
    {
        name:
        displayName.value,

        whatsapp:
        whatsapp.value
    });

    ==================================
    */

    showAlert(
    "PROFILE SAVED"
    );

};


/********************************
PROFILE AUTO UPDATE
********************************/

displayName.addEventListener(
"input",
()=>{

    localStorage.setItem(
    "premium_name",
    displayName.value
    );

});

whatsapp.addEventListener(
"input",
()=>{

    localStorage.setItem(
    "premium_wa",
    whatsapp.value
    );

});


/********************************
PROFILE PLACEHOLDER
********************************/

if(
displayName.value === ""
){

    displayName.placeholder =
    "YOUR NAME";

}

if(
whatsapp.value === ""
){

    whatsapp.placeholder =
    "08XXXXXXXXXX";

}


/********************************
SPOTIFY SYSTEM
********************************/

/********************************
SPOTIFY STORAGE
********************************/

let spotifyAccounts =
JSON.parse(

    localStorage.getItem(
    "spotify_accounts"
    )

) || [];


/********************************
RENDER SPOTIFY ACCOUNT
********************************/

function renderSpotifyAccounts(){

    spotifyList.innerHTML = "";

    /*
    HIDE CONNECT BUTTON
    */

    if(
    spotifyAccounts.length > 0
    ){

        spotifyLogin.style.display =
        "none";

        addSpotify.style.display =
        "block";

    }

    else{

        spotifyLogin.style.display =
        "block";

        addSpotify.style.display =
        "none";

    }

    /*
    MAX 5 ACCOUNT
    */

    if(
    spotifyAccounts.length >= 5
    ){

        addSpotify.style.display =
        "none";

    }

    spotifyAccounts.forEach(
    (account,index)=>{

        const card =
        document.createElement(
        "div"
        );

        card.className =
        "spotifyAccount";

        if(
        account.primary
        ){

            card.classList.add(
            "primary"
            );

        }

        card.innerHTML =

        `
        <img
        class="spotifyAvatar"
        src="${account.photo}">

        <div class="spotifyInfo">

            <div class="spotifyName">

                ${account.name}

            </div>

            <div class="spotifyPlan">

                ${account.plan}

            </div>

        </div>

        <img
        class="primaryLogo"
        src="img/spotify.png">
        `;

        /*
        CHANGE PRIMARY
        */

        card.onclick = ()=>{

            setPrimarySpotify(
            index
            );

        };

        spotifyList.appendChild(
        card
        );

    });

}


/********************************
SET PRIMARY ACCOUNT
********************************/

function setPrimarySpotify(index){

    spotifyAccounts.forEach(
    account=>{

        account.primary =
        false;

    });

    spotifyAccounts[index]
    .primary = true;

    localStorage.setItem(

        "spotify_accounts",

        JSON.stringify(
        spotifyAccounts
        )

    );

    renderSpotifyAccounts();

    showAlert(
    "PRIMARY ACCOUNT UPDATED"
    );

}


/********************************
ADD SPOTIFY ACCOUNT
********************************/

function addSpotifyAccount(data){

    /*
    MAX 5
    */

    if(
    spotifyAccounts.length >= 5
    ){

        showAlert(
        "MAXIMUM ACCOUNT REACHED"
        );

        return;

    }

    /*
    FIRST ACCOUNT
    */

    const primary =

    spotifyAccounts.length === 0;

    spotifyAccounts.push({

        name:
        data.name,

        photo:
        data.photo,

        plan:
        data.plan,

        primary:
        primary

    });

    localStorage.setItem(

        "spotify_accounts",

        JSON.stringify(
        spotifyAccounts
        )

    );

    renderSpotifyAccounts();

    showAlert(
    "SPOTIFY CONNECTED"
    );

}


/********************************
SPOTIFY LOGIN
********************************/

function spotifyLoginSystem(){

    if(
    CLIENT_ID === ""
    ){

        /*
        DEMO MODE
        */

        addSpotifyAccount({

            name:
            "ASHVATH",

            photo:
            "img/default.png",

            plan:
            "SPOTIFY PREMIUM"

        });

        return;

    }

    /*
    REAL SPOTIFY LOGIN

    window.location.href =
    "https://accounts.spotify.com/authorize";

    */
}


/********************************
CONNECT BUTTON
********************************/

spotifyLogin.onclick = ()=>{

    spotifyLoginSystem();

};


/********************************
ADD ACCOUNT BUTTON
********************************/

addSpotify.onclick = ()=>{

    spotifyLoginSystem();

};


/********************************
REMOVE ACCOUNT
********************************/

function removeSpotify(index){

    spotifyAccounts.splice(
    index,
    1
    );

    /*
    REPAIR PRIMARY
    */

    if(
    spotifyAccounts.length > 0
    ){

        const hasPrimary =

        spotifyAccounts.some(
        account=>
        account.primary
        );

        if(!hasPrimary){

            spotifyAccounts[0]
            .primary = true;

        }

    }

    localStorage.setItem(

        "spotify_accounts",

        JSON.stringify(
        spotifyAccounts
        )

    );

    renderSpotifyAccounts();

}


/********************************
SPOTIFY AUTO LOAD
********************************/

renderSpotifyAccounts();


/********************************
PLAYLIST / LOGOUT
********************************/


/********************************
COMING SOON FUNCTION
********************************/

function comingSoon(text){

    showAlert(
    text + " COMING SOON"
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
JOINED PLAYLIST STORAGE
********************************/

/*
localStorage:

joined_playlist

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


/********************************
RENDER PLAYLIST
********************************/

function renderJoinedPlaylist(){

    if(!joinedBox) return;

    joinedBox.innerHTML = "";

    if(
    joinedPlaylist.length === 0
    ){

        joinedBox.innerHTML =

        `
        <div class="joinedItem">

            NO PLAYLIST YET

        </div>
        `;

        return;

    }

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

renderJoinedPlaylist();


/********************************
PLAYLIST JOIN FUNCTION
********************************/

function joinPlaylist(name){

    if(
    joinedPlaylist.includes(
    name
    )
    ){

        return;

    }

    joinedPlaylist.push(
    name
    );

    localStorage.setItem(

        "joined_playlist",

        JSON.stringify(
        joinedPlaylist
        )

    );

    renderJoinedPlaylist();

    showAlert(
    "PLAYLIST ADDED"
    );

}


/********************************
ADMIN CHECK
********************************/

const IS_ADMIN =
localStorage.getItem(
"is_admin"
) === "true";

if(IS_ADMIN){

    console.log(
    "ADMIN MODE ENABLED"
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

    showAlert(
    "LOGGING OUT"
    );

    setTimeout(()=>{

        location.href =
        "index.html";

    },1000);

}


/********************************
ESC CLOSE PANEL
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

    }

);


/********************************
WINDOW CLICK CLOSE
********************************/

window.addEventListener(

    "resize",

    ()=>{

        /*
        FUTURE RESPONSIVE SYSTEM
        */

    }

);


/********************************
AUTO LOAD
********************************/

renderSpotifyAccounts();

renderJoinedPlaylist();


/********************************
FUTURE FIREBASE
********************************/

/*

==================================
USER PROFILE

uid
name
whatsapp
photo

==================================

SPOTIFY

account 1
account 2
account 3
account 4
account 5

primary

==================================

PLAYLIST

joined playlist

==================================

PREMIUM

role
subscription

==================================

*/


/********************************
END OF FILE
********************************/
