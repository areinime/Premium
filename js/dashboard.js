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
/********************************
SIDEBAR OPEN
********************************/

menuBtn.onclick = ()=>{

    sidebar.classList.add(
        "show"
    );

    overlay.classList.add(
        "show"
    );

};

/********************************
PROFILE OPEN
********************************/

profileBox.onclick = ()=>{

    profilePanel.classList.add(
        "show"
    );

    overlay.classList.add(
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
TOP ALERT
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

    showAlert(

        "PROFILE SAVED"

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

if(savedName){

    displayName.value =
    savedName;

}

if(savedWA){

    whatsapp.value =
    savedWA;

}

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

    const reader =

    new FileReader();

    reader.onload = function(){

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

const savedPhoto =

localStorage.getItem(
    "premium_photo"
);

if(savedPhoto){

    avatar.src =
    savedPhoto;

    profilePhoto.src =
    savedPhoto;

}

/********************************
PRIMARY ACCOUNT
********************************/

const spotifyAccount =

document.querySelectorAll(
    ".spotifyAccount"
);

spotifyAccount.forEach(

    account=>{

        account.onclick = ()=>{

            spotifyAccount.forEach(

                a=>{

                    a.classList.remove(
                        "primary"
                    );

                }

            );

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

    }

);

const primaryAccount =

localStorage.getItem(
    "primary_account"
);

if(primaryAccount){

    spotifyAccount.forEach(

        account=>{

            if(

                account.innerText
                === primaryAccount

            ){

                account.classList.add(
                    "primary"
                );

            }

        }

    );

}

/********************************
ADD SPOTIFY
********************************/

addSpotify.onclick = ()=>{

    showAlert(

        "COMING SOON"

    );

};

/********************************
MY ARTIST
********************************/

function myArtist(){

    showAlert(

        "COMING SOON"

    );

}

/********************************
MY POPULARITY
********************************/

function myPopularity(){

    showAlert(

        "COMING SOON"

    );

}

/********************************
MY SONG
********************************/

function mySong(){

    showAlert(

        "COMING SOON"

    );

}

/*************************
JOINED PLAYLIST
*************************/

const joinedBox =

document.getElementById(
    "joinedPlaylist"
);

const joinedPlaylist =

JSON.parse(

    localStorage.getItem(
        "joined_playlist"
    )

) || [];

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

        joinedBox.appendChild(
            item
        );

    }

);


/********************************
LOGOUT
********************************/

function logout(){

    localStorage.clear();

    showAlert(

        "LOGOUT"

    );

    setTimeout(()=>{

        location.reload();

    },1000);

}
