/************************************************
PRIME PLAYLIST SYSTEM
PART 1
CONFIG + ELEMENT + PANEL + PROFILE
************************************************/

/************************************************
CONFIG
************************************************/

/*
SPOTIFY CLIENT ID
*/

const CLIENT_ID = "";
const REDIRECT_URI = "";

/************************************************
MODE
************************************************/

/*
false = member
true  = admin
*/

const IS_ADMIN =
localStorage.getItem("is_admin") === "true";

/************************************************
ADMIN BYPASS
************************************************/

if(IS_ADMIN){

    window.onload = ()=>{

        const loading =
        document.getElementById(
        "loadingScreen"
        );

        if(loading){

            loading.style.display =
            "none";

        }

        const popup =
        document.getElementById(
        "joinListenerPopup"
        );

        if(popup){

            popup.style.display =
            "none";

        }

        if(addSongBtn){

            addSongBtn.style.display =
            "flex";

        }

        loadRequests();

    };

}

/************************************************
LIMIT
************************************************/

const MAX_MEMBER_SONG = 8;
const MAX_CHECKIN_PER_DAY = 2;

/************************************************
ELEMENT
************************************************/

const overlay =
document.getElementById("overlay");

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.getElementById("sidebar");

const profileBtn =
document.getElementById("profileBtn");

const cyberAlert =
document.getElementById("cyberAlert");

const joinPopup =
document.getElementById("joinPopup");

const connectBtn =
document.getElementById("connectSpotify");

const joinBtn =
document.getElementById("joinListener");

const checkinBtn =
document.getElementById("checkinBtn");

const songList =
document.getElementById("songList");

const memberList =
document.getElementById("memberActivity");

const yourSongBox =
document.getElementById("yourSongs");

const requestBox =
document.getElementById("requestSongs");

const addSongBtn =
document.getElementById("addSongBtn");

const playlistTitle =
document.getElementById("playlistTitle");

const playlistDesc =
document.getElementById("playlistDescription");

const playlistCover =
document.getElementById("playlistCover");

const playlistLink =
document.getElementById("playlistLink");

/************************************************
LOCAL STORAGE
************************************************/

const userSpotify =
JSON.parse(
localStorage.getItem(
"spotify_accounts"
)
) || [];

const joinedPlaylist =
JSON.parse(
localStorage.getItem(
"joined_prime"
)
) || false;

const mySongs =
JSON.parse(
localStorage.getItem(
"prime_my_song"
)
) || [];

const requests =
JSON.parse(
localStorage.getItem(
"prime_request"
)
) || [];

const memberData =
JSON.parse(
localStorage.getItem(
"prime_member"
)
) || [];

/************************************************
ALERT
************************************************/

function showAlert(text){

    cyberAlert.innerText = text;

    cyberAlert.classList.add(
    "show"
    );

    setTimeout(()=>{

        cyberAlert.classList.remove(
        "show"
        );

    },2500);

}

/************************************************
OPEN SIDEBAR
************************************************/

if(menuBtn){

    menuBtn.onclick = ()=>{

        sidebar.classList.add(
        "show"
        );

        overlay.classList.add(
        "show"
        );

    };

}

/************************************************
CLOSE
************************************************/

if(overlay){

    overlay.onclick = ()=>{

        sidebar.classList.remove(
        "show"
        );

        overlay.classList.remove(
        "show"
        );

    };

}

/************************************************
ESC CLOSE
************************************************/

document.addEventListener(
"keydown",
e=>{

    if(e.key === "Escape"){

        sidebar.classList.remove(
        "show"
        );

        overlay.classList.remove(
        "show"
        );

    }

});

/************************************************
SPOTIFY CONNECT
************************************************/

function spotifyLogin(){

    if(CLIENT_ID === ""){

        showAlert(
        "SPOTIFY API EMPTY"
        );

        return;
    }

    /*
    Spotify OAuth
    */

    showAlert(
    "SPOTIFY LOGIN"
    );

}

if(connectBtn){

    connectBtn.onclick = ()=>{

        spotifyLogin();

    };

}

/************************************************
JOIN CHECK
************************************************/

function checkJoinStatus(){

    if(IS_ADMIN){

        joinPopup.classList.remove(
        "show"
        );

        return;
    }

    if(userSpotify.length === 0){

        joinPopup.classList.add(
        "show"
        );

        connectBtn.style.display =
        "block";

        joinBtn.style.display =
        "none";

        return;
    }

    if(joinedPlaylist === false){

        joinPopup.classList.add(
        "show"
        );

        connectBtn.style.display =
        "none";

        joinBtn.style.display =
        "block";

        return;
    }

    joinPopup.classList.remove(
    "show"
    );

}

/************************************************
JOIN LISTENER
************************************************/

if(joinBtn){

    joinBtn.onclick = ()=>{

        localStorage.setItem(
        "joined_prime",
        true
        );

        showAlert(
        "JOINED AS LISTENER"
        );

        setTimeout(()=>{

            location.reload();

        },1000);

    };

}

/************************************************
PROFILE BUTTON
************************************************/

if(profileBtn){

    profileBtn.onclick = ()=>{

        location.href =
        "dashboard.html";

    };

}

/************************************************
ADMIN ONLY
************************************************/

if(IS_ADMIN){

    if(addSongBtn){

        addSongBtn.style.display =
        "flex";

    }

}else{

    if(addSongBtn){

        addSongBtn.style.display =
        "none";

    }

}

/************************************************
START
************************************************/

if(!IS_ADMIN){

    checkJoinStatus();

}

/******************************************
CHECKIN SYSTEM
******************************************/

function checkinToday(){

    if(userSpotify.length === 0){

        showAlert(
        "CONNECT SPOTIFY FIRST"
        );

        return;
    }

    if(!joinedPlaylist){

        showAlert(
        "JOIN AS LISTENER FIRST"
        );

        return;
    }

    let current =
    parseInt(
    localStorage.getItem(
    "prime_checkin"
    ) || "0"
    );

    if(current >= 2){

        showAlert(
        "CHECKIN LIMIT"
        );

        return;
    }

    current++;

    localStorage.setItem(
    "prime_checkin",
    current
    );

    updateMyStatus();

    showAlert(
    "CHECKIN SUCCESS"
    );

}

/******************************************
MEMBER STATUS
******************************************/

function updateMyStatus(){

    const container =
    document.getElementById(
    "myActivity"
    );

    if(!container) return;

    const checkin =
    parseInt(
    localStorage.getItem(
    "prime_checkin"
    ) || "0"
    );

    const target =
    parseInt(
    localStorage.getItem(
    "prime_target"
    ) || "5"
    );

    let dots = "";

    for(let i=0;i<target;i++){

        if(i < checkin){

            dots +=
            `<span class="dot active">◉</span>`;

        }

        else{

            dots +=
            `<span class="dot">◎</span>`;

        }

    }

    const reward =
    parseInt(
    localStorage.getItem(
    "prime_reward"
    ) || "0"
    );

    let rewardHtml = "";

    for(let i=0;i<reward;i++){

        rewardHtml +=
        `<span class="cube">█</span>`;

    }

    container.innerHTML =

    `
    <div class="memberCard">

        <div class="memberName">

            ${displayName.value || "USER"}

        </div>

        <div class="memberAccount">

    ${
        userSpotify.length > 0
        ? userSpotify[0].name
        : "NO SPOTIFY"
    }

</div>

        <div class="memberDots">

            ${dots}

        </div>

        <div class="memberReward">

            ${rewardHtml}

        </div>

    </div>
    `;
}

/******************************************
YOUR SONG
******************************************/

function loadMySongs(){

    const box =
    document.getElementById(
    "mySongList"
    );

    if(!box) return;

    let songs =
    JSON.parse(
    localStorage.getItem(
    "prime_my_song"
    )
    ) || [];

    box.innerHTML = "";

    songs.forEach((song,index)=>{

        box.innerHTML +=

        `
        <div class="mySongCard">

            <img src="${song.cover}">

            <div class="songInfo">

                <div class="songTitle">

                    ${song.title}

                </div>

                <div class="songArtist">

                    ${song.artist}

                </div>

            </div>

            <button
            class="replaceBtn"
            onclick="requestReplace(${index})">

                REPLACE

            </button>

        </div>
        `;

    });

}

/******************************************
REQUEST SONG REPLACE
******************************************/

function requestReplace(index){

    showAlert(
    "REQUEST SENT"
    );

}

/******************************************
ADD SONG
******************************************/

function addMySong(){

    let songs =
    JSON.parse(
    localStorage.getItem(
    "prime_my_song"
    )
    ) || [];

    if(songs.length >= 8){

        showAlert(
        "MAX 8 SONGS"
        );

        return;
    }

    songs.push({

        title:"New Song",

        artist:"Spotify",

        cover:"https://i.scdn.co/image/ab67616d0000b273"

    });

    localStorage.setItem(
    "prime_my_song",
    JSON.stringify(
    songs
    )
    );

    loadMySongs();

}

/******************************************
SONG PLAY COUNTER
******************************************/

function increaseSongCounter(songId){

    let count =
    parseInt(

        localStorage.getItem(
        "song_"+songId
        ) || "0"

    );

    count++;

    localStorage.setItem(
    "song_"+songId,
    count
    );

}

/******************************************
ADMIN MODE
******************************************/

if(IS_ADMIN){

    document.body.classList.add(
    "adminMode"
    );

}

/******************************************
ADMIN TARGET +
******************************************/

function increaseTarget(){

    let target =
    parseInt(

        localStorage.getItem(
        "prime_target"
        ) || "5"

    );

    target++;

    localStorage.setItem(
    "prime_target",
    target
    );

    updateMyStatus();

}

function decreaseTarget(){

    let target =
    parseInt(

        localStorage.getItem(
        "prime_target"
        ) || "5"

    );

    if(target <= 1) return;

    target--;

    localStorage.setItem(
    "prime_target",
    target
    );

    updateMyStatus();

}

/******************************************
ADMIN REWARD +
******************************************/

function increaseReward(){

    let reward =
    parseInt(

        localStorage.getItem(
        "prime_reward"
        ) || "0"

    );

    reward++;

    localStorage.setItem(
    "prime_reward",
    reward
    );

    updateMyStatus();

}

function decreaseReward(){

    let reward =
    parseInt(

        localStorage.getItem(
        "prime_reward"
        ) || "0"

    );

    if(reward <= 0) return;

    reward--;

    localStorage.setItem(
    "prime_reward",
    reward
    );

    updateMyStatus();

}

/******************************************
ADMIN ADD SONG
******************************************/

function adminAddSong(){

    showAlert(
    "ADD SONG"
    );

}

/******************************************
ADMIN EDIT PLAYLIST
******************************************/

function editPlaylistTitle(){

    const title =
    prompt(
    "PLAYLIST TITLE"
    );

    if(!title) return;

    playlistTitle.innerText =
    title;

}

function editPlaylistDescription(){

    const desc =
    prompt(
    "PLAYLIST DESCRIPTION"
    );

    if(!desc) return;

    playlistDesc.innerText =
    desc;

}

function editPlaylistCover(){

    const url =
    prompt(
    "COVER URL"
    );

    if(!url) return;

    playlistCover.src =
    url;

}

function editSpotifyPlaylist(){

    const url =
    prompt(
    "SPOTIFY PLAYLIST URL"
    );

    if(!url) return;

    playlistLink.href =
    url;

}

/******************************************
REQUEST TAB
******************************************/

function loadRequests(){

    if(!requestBox) return;

    requestBox.innerHTML = "";

    requests.forEach((song,index)=>{

        requestBox.innerHTML +=

        `
        <div class="requestCard">

            <img
            src="${song.cover}"
            class="songCover">

            <div class="songInfo">

                <div class="songTitle">

                    ${song.title}

                </div>

                <div class="songArtist">

                    ${song.artist}

                </div>

                <div class="songLink">

                    ${song.link}

                </div>

            </div>

            <button
            onclick="approveRequest(${index})">

                ACCEPT

            </button>

        </div>
        `;

    });

}

function approveRequest(index){

    showAlert(
    "REQUEST APPROVED"
    );

}

/******************************************
SPOTIFY PLAYING NOW
******************************************/

async function loadPlayingNow(){

    /*
    SPOTIFY API

    GET NOW PLAYING

    */

}

async function loadRecentTrack(){

    /*
    SPOTIFY API

    GET RECENT TRACK

    */

}

/******************************************
PLAY COUNT
******************************************/

function updatePlayCounter(songId){

    let count =
    parseInt(

        localStorage.getItem(
        "play_"+songId
        ) || "0"

    );

    count++;

    localStorage.setItem(
    "play_"+songId,
    count
    );

}

/******************************************
RESET CHECKIN
******************************************/

function resetCheckin(){

    localStorage.setItem(
    "prime_checkin",
    0
    );

    updateMyStatus();

}

/******************************************
LOGOUT
******************************************/

function logout(){

    localStorage.clear();

    location.href =
    "index.html";

}

/******************************************
AUTO REFRESH
******************************************/

setInterval(()=>{

    loadPlayingNow();

    loadRecentTrack();

},10000);

/******************************************
START SYSTEM
******************************************/

window.onload = ()=>{

    if(IS_ADMIN){

        joinPopup?.classList.remove(
        "show"
        );

    }else{

        checkJoinStatus();

    }

    updateMyStatus();

    loadMySongs();

    loadRequests();

    loadPlayingNow();

    loadRecentTrack();

    const loading =
    document.getElementById(
    "loadingScreen"
    );

    if(loading){

        loading.style.display =
        "none";

    }

};