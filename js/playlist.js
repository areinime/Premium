/************************************************
PLAYLIST.JS
PART 1
CONFIG + ELEMENT + SIDEBAR + BASIC UI
************************************************/


/************************************************
CONFIG
************************************************/

const WORKER_URL = "";

const PLAYLIST_ID = "";

const PLAYLIST_NAME = "PRIME ZONE";


/************************************************
MODE
************************************************/

const IS_ADMIN =
localStorage.getItem(
"is_admin"
)==="true";


/************************************************
LOCAL STORAGE
************************************************/

let spotifyAccounts =

JSON.parse(

localStorage.getItem(
"spotify_accounts"

)

)||[];


let joinedPlaylist =

JSON.parse(

localStorage.getItem(
"joined_playlist"

)

)||[];


/************************************************
ELEMENT
************************************************/

/* Overlay */

const overlay =
document.getElementById(
"overlay");


/* Sidebar */

const sidebar =
document.getElementById(
"sidebar");

const menuBtn =
document.getElementById(
"menuBtn");

const joinedPlaylistBox =
document.getElementById(
"joinedPlaylist");


/* Alert */

const cyberAlert =
document.getElementById(
"cyberAlert");


/* Loading */

const loadingScreen =
document.getElementById(
"loadingScreen");


/* Spotify */

const spotifyButton =
document.getElementById(
"spotifyButton");


/* Join */

const joinPopup =
document.getElementById(
"joinPopup");

const connectSpotify =
document.getElementById(
"connectSpotify");

const joinListener =
document.getElementById(
"joinListener");


/* Header */

const playlistCover =
document.getElementById(
"playlistCover");

const playlistTitle =
document.getElementById(
"playlistTitle");

const playlistDescription =
document.getElementById(
"playlistDescription");

const playlistLink =
document.getElementById(
"playlistLink");


/* Progress */

const progressFill =
document.getElementById(
"progressFill");

const progressValue =
document.getElementById(
"progressValue");

const playedSong =
document.getElementById(
"playedSong");

const totalSong =
document.getElementById(
"totalSong");

const checkinBtn =
document.getElementById(
"checkinBtn");


/* Tab */

const tabs =
document.querySelectorAll(
".tab"
);

const tabContents =
document.querySelectorAll(
".tabContent");


/************************************************
CYBER ALERT
************************************************/

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


/************************************************
LOADING
************************************************/

function showLoading(){

loadingScreen.style.display=
"flex";

}

function hideLoading(){

loadingScreen.style.display=
"none";

}


/************************************************
SIDEBAR
************************************************/

menuBtn.onclick=()=>{

sidebar.classList.add(
"show"
);

overlay.classList.add(
"show"
);

};


overlay.onclick=()=>{

sidebar.classList.remove(
"show"
);

overlay.classList.remove(
"show"
);

};


document.addEventListener(

"keydown",

e=>{

if(e.key==="Escape"){

sidebar.classList.remove(
"show"
);

overlay.classList.remove(
"show"
);

}

}

);


/************************************************
PLAYLIST SIDEBAR
************************************************/

function renderJoinedPlaylist(){

if(!joinedPlaylistBox) return;

joinedPlaylistBox.innerHTML="";

if(joinedPlaylist.length===0){

joinedPlaylistBox.innerHTML=

`
<div class="joinedItem">

NO PLAYLIST

</div>
`;

return;

}

joinedPlaylist.forEach(name=>{

const div=
document.createElement("div");

div.className=
"joinedItem";

div.innerText=
name;

joinedPlaylistBox.appendChild(div);

});

}


/************************************************
COMING SOON
************************************************/

function myArtist(){

showAlert(
"COMING SOON"
);

}

function myPopularity(){

showAlert(
"COMING SOON"
);

}

function mySong(){

showAlert(
"COMING SOON"
);

}


/************************************************
LOGOUT
************************************************/

function logout(){

localStorage.clear();

location.href=
"../index.html";

}


/************************************************
SPOTIFY BUTTON
************************************************/

spotifyButton.onclick=()=>{

/*

PART 2

Switch Account

*/

showAlert(

"SPOTIFY"

);

};


/************************************************
TAB SYSTEM
************************************************/

tabs.forEach(tab=>{

tab.onclick=()=>{

tabs.forEach(x=>

x.classList.remove(
"active"
)

);

tabContents.forEach(x=>

x.classList.remove(
"active"
)

);

tab.classList.add(
"active"
);

const page=

document.getElementById(

tab.dataset.tab+

"Tab"

);

if(page){

page.classList.add(
"active"
);

}

};

});


/************************************************
INIT
************************************************/

window.onload=()=>{

renderJoinedPlaylist();

hideLoading();

showAlert(

PLAYLIST_NAME

);

};

/************************************************
PLAYLIST.JS
PART 2
SPOTIFY ACCOUNT
JOIN SYSTEM
WORKER CONNECT
************************************************/


/************************************************
WORKER API
************************************************/

async function worker(path,data={}){

try{

const result=

await fetch(

WORKER_URL+path,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify(data)

}

);

return await result.json();

}

catch(e){

console.log(e);

showAlert(
"WORKER OFFLINE"
);

return null;

}

}


/************************************************
CONNECT SPOTIFY
************************************************/

connectSpotify.onclick=()=>{

location.href=

WORKER_URL+

"/spotify/login";

};


/************************************************
LOAD ACCOUNT
************************************************/

async function loadSpotifyAccount(){

const token=

localStorage.getItem(

"spotify_token"

);

if(!token){

spotifyButton.style.opacity=".4";

return;

}

const account=

await worker(

"/spotify/account",

{

token:token

}

);

if(!account) return;

spotifyAccounts=

account.accounts;

localStorage.setItem(

"spotify_accounts",

JSON.stringify(

spotifyAccounts

)

);

renderSpotifyButton();

}


/************************************************
PRIMARY ACCOUNT
************************************************/

function getPrimarySpotify(){

if(

spotifyAccounts.length===0

)return null;

return spotifyAccounts.find(

x=>x.primary

);

}


/************************************************
RENDER BUTTON
************************************************/

function renderSpotifyButton(){

if(

spotifyAccounts.length===0

){

spotifyButton.style.opacity=".4";

return;

}

spotifyButton.style.opacity="1";

}


/************************************************
SWITCH ACCOUNT
************************************************/

spotifyButton.onclick=()=>{

if(

spotifyAccounts.length===0

){

showAlert(

"CONNECT SPOTIFY"

);

return;

}

if(

spotifyAccounts.length===1

){

showAlert(

spotifyAccounts[0].name

);

return;

}

const names=

spotifyAccounts.map(

x=>x.name

).join("\n");

const choose=

prompt(

"ACCOUNT\n\n"+names+

"\n\nTYPE NAME"

);

if(!choose) return;

const found=

spotifyAccounts.find(

x=>

x.name.toLowerCase()==

choose.toLowerCase()

);

if(!found){

showAlert(

"ACCOUNT NOT FOUND"

);

return;

}

spotifyAccounts.forEach(

x=>x.primary=false

);

found.primary=true;

localStorage.setItem(

"spotify_accounts",

JSON.stringify(

spotifyAccounts

)

);

showAlert(

found.name

);

};


/************************************************
JOIN STATUS
************************************************/

function checkJoinStatus(){

if(IS_ADMIN){

joinPopup.style.display=
"none";

return;

}

const account=

getPrimarySpotify();

if(!account){

joinPopup.style.display=
"flex";

connectSpotify.style.display=
"block";

joinListener.style.display=
"none";

return;

}

const joined=

localStorage.getItem(

"joined_prime"

)==="true";

if(!joined){

joinPopup.style.display=
"flex";

connectSpotify.style.display=
"none";

joinListener.style.display=
"block";

return;

}

joinPopup.style.display=
"none";

}


/************************************************
JOIN LISTENER
************************************************/

joinListener.onclick=()=>{

const account=

getPrimarySpotify();

if(!account){

showAlert(

"CONNECT FIRST"

);

return;

}

let memberList=

JSON.parse(

localStorage.getItem(

"prime_member_list"

)

)||[];

const exist=

memberList.find(

x=>x.name===account.name

);

if(!exist){

memberList.push({

uid:account.id,

name:account.name,

photo:account.photo,

target:5,

crystal:0,

energy:0

});

localStorage.setItem(

"prime_member_list",

JSON.stringify(

memberList

)

);

}

localStorage.setItem(

"joined_prime",

"true"

);

joinPopup.style.display=
"none";

showAlert(

"JOIN SUCCESS"

);

};


/************************************************
AUTO
************************************************/

loadSpotifyAccount();

renderSpotifyButton();

checkJoinStatus();

/************************************************
PLAYLIST.JS
PART 3
PLAYLIST HEADER
LOAD PLAYLIST
ADMIN EDIT PLAYLIST
************************************************/


/************************************************
PLAYLIST STORAGE
************************************************/

let playlistData =

JSON.parse(

localStorage.getItem(

"prime_playlist"

)

)||{

id:PLAYLIST_ID,

title:"PRIME ZONE",

description:"PRIME PLAYLIST",

cover:"../img/default_cover.png",

link:""

};


/************************************************
RENDER HEADER
************************************************/

function renderPlaylistHeader(){

playlistTitle.innerText=

playlistData.title;

playlistDescription.innerText=

playlistData.description;

playlistCover.src=

playlistData.cover;

playlistLink.href=

playlistData.link;

playlistLink.innerText=

playlistData.link===""
?

"OPEN SPOTIFY PLAYLIST"

:

playlistData.link;

}


/************************************************
LOAD PLAYLIST
WORKER
************************************************/

async function loadPlaylist(){

if(

playlistData.link===""

&&

PLAYLIST_ID===""

){

renderPlaylistHeader();

return;

}

showLoading();

const data=

await worker(

"/spotify/playlist",

{

playlist:

playlistData.link===""
?

PLAYLIST_ID

:

playlistData.link

}

);

hideLoading();

if(!data){

renderPlaylistHeader();

return;

}

playlistData={

id:data.id,

title:data.title,

description:

data.description ||

"NO DESCRIPTION",

cover:

data.cover ||

"../img/default_cover.png",

link:data.link

};

localStorage.setItem(

"prime_playlist",

JSON.stringify(

playlistData

)

);

renderPlaylistHeader();

}


/************************************************
ADMIN ONLY
************************************************/

if(

!IS_ADMIN

){

editPlaylistPopup.style.display=
"none";

}


/************************************************
OPEN EDIT
************************************************/

playlistHeader.onclick=()=>{

if(

!IS_ADMIN

)return;

playlistSpotifyLink.value=

playlistData.link;

editPlaylistPopup.style.display=
"flex";

};


/************************************************
CANCEL
************************************************/

cancelPlaylistEdit.onclick=()=>{

editPlaylistPopup.style.display=
"none";

};


/************************************************
SAVE PLAYLIST
************************************************/

savePlaylistEdit.onclick=

async()=>{

const link=

playlistSpotifyLink.value.trim();

if(

link===""

){

showAlert(

"EMPTY LINK"

);

return;

}

showLoading();

const data=

await worker(

"/spotify/playlist",

{

playlist:link

}

);

hideLoading();

if(!data){

showAlert(

"INVALID PLAYLIST"

);

return;

}

playlistData={

id:data.id,

title:data.title,

description:

data.description ||

"NO DESCRIPTION",

cover:

data.cover ||

"../img/default_cover.png",

link:data.link

};

localStorage.setItem(

"prime_playlist",

JSON.stringify(

playlistData

)

);

renderPlaylistHeader();

editPlaylistPopup.style.display=
"none";

showAlert(

"PLAYLIST UPDATED"

);

};


/************************************************
AUTO
************************************************/

renderPlaylistHeader();

loadPlaylist();

/************************************************
PLAYLIST.JS
PART 4
SONG TAB
LOAD SONG
NOW PLAYING
RECENT TRACK
PROGRESS
************************************************/


/************************************************
ELEMENT
************************************************/

const songList =
document.getElementById(
"songList"
);

const addSongBtn =
document.getElementById(
"addSongBtn"
);

const addSongPopup =
document.getElementById(
"addSongPopup"
);

const spotifyTrackLink =
document.getElementById(
"spotifyTrackLink"
);

const cancelAddSong =
document.getElementById(
"cancelAddSong"
);

const submitAddSong =
document.getElementById(
"submitAddSong"
);


/************************************************
STORAGE
************************************************/

let playlistSongs =

JSON.parse(

localStorage.getItem(
"prime_playlist_song"
)

)||[];

let playHistory =

JSON.parse(

localStorage.getItem(
"prime_play_history"
)

)||[];


/************************************************
SAVE
************************************************/

function saveSongStorage(){

localStorage.setItem(

"prime_playlist_song",

JSON.stringify(
playlistSongs
)

);

}

function saveHistory(){

localStorage.setItem(

"prime_play_history",

JSON.stringify(
playHistory
)

);

}


/************************************************
TRUE CHECK
************************************************/

function isSongTrue(id){

return playHistory.some(

x=>

x.id===id

&&

x.true===true

);

}


/************************************************
RENDER SONG
************************************************/

function renderSong(){

songList.innerHTML="";

playlistSongs.forEach(song=>{

const green =

isSongTrue(
song.id
);

songList.innerHTML+=

`

<div class="songCard">

<div class="songCover">

<img src="${song.cover}">

</div>

<div class="songInfo">

<div class="songTitle

${green?"played":""}">

${song.title}

</div>

<div class="songArtist

${green?"played":""}">

${song.artist}

</div>

<div class="songTime">

${song.duration}

</div>

</div>

${
IS_ADMIN

?

`

<button

class="editSong"

onclick="editSong('${song.id}')">

EDIT

</button>

`

:

""

}

</div>

`;

});

calculateProgress();

}


/************************************************
PROGRESS
************************************************/

function calculateProgress(){

const total =

playlistSongs.length;

const done =

playHistory.filter(

x=>x.true

).length;

let percent = 0;

if(total>0){

percent=

Math.floor(

(done/total)*100

);

}

progressFill.style.width=

percent+"%";

progressValue.innerText=

percent+"%";

playedSong.innerText=

done;

totalSong.innerText=

total;

checkinBtn.disabled=

percent!==100;

}


/************************************************
NOW PLAYING
************************************************/

async function loadNowPlaying(){

const token=

localStorage.getItem(
"spotify_token"
);

if(!token) return;

const data=

await worker(

"/spotify/nowplaying",

{

token:token

}

);

if(!data) return;

const index=

playlistSongs.findIndex(

x=>x.id===data.id

);

if(index===-1){

renderSong();

return;

}

/*

Kalau play

↓

Hijau

Belum TRUE

*/

document.querySelectorAll(

".songTitle"

)[index]

.classList.add(

"played"

);

document.querySelectorAll(

".songArtist"

)[index]

.classList.add(

"played"

);

}


/************************************************
RECENT TRACK
************************************************/

async function loadRecentTrack(){

const token=

localStorage.getItem(
"spotify_token"
);

if(!token) return;

const data=

await worker(

"/spotify/recent",

{

token:token

}

);

if(!data) return;

const index=

playlistSongs.findIndex(

x=>x.id===data.id

);

if(index===-1) return;

const exist=

playHistory.find(

x=>x.id===data.id

);

if(exist){

exist.true=true;

exist.time=data.time;

}

else{

playHistory.push({

id:data.id,

time:data.time,

true:true

});

}

saveHistory();

renderSong();

}


/************************************************
SYNC
************************************************/

async function spotifySync(){

await loadNowPlaying();

await loadRecentTrack();

}


/************************************************
ADMIN
ADD SONG
************************************************/

if(IS_ADMIN){

addSongBtn.style.display=
"block";

}else{

addSongBtn.style.display=
"none";

}

addSongBtn.onclick=()=>{

addSongPopup.style.display=
"flex";

};

cancelAddSong.onclick=()=>{

addSongPopup.style.display=
"none";

};

submitAddSong.onclick=

async()=>{

const link=

spotifyTrackLink.value.trim();

if(link===""){

showAlert(
"EMPTY LINK"
);

return;

}

showLoading();

const data=

await worker(

"/spotify/track",

{

track:link

}

);

hideLoading();

if(!data){

showAlert(

"INVALID TRACK"

);

return;

}

playlistSongs.push({

id:data.id,

cover:data.cover,

title:data.title,

artist:data.artist,

duration:data.duration,

link:data.link

});

saveSongStorage();

spotifyTrackLink.value="";

addSongPopup.style.display=
"none";

renderSong();

showAlert(

"SONG ADDED"

);

};


/************************************************
AUTO
************************************************/

renderSong();

spotifySync();

setInterval(

spotifySync,

5000

);

/************************************************
PLAYLIST.JS
PART 5
YOUR SONG
REQUEST SYSTEM
MEMBER
************************************************/


/************************************************
ELEMENT
************************************************/

const mySongList =
document.getElementById(
"mySongList"
);

const addMySongBtn =
document.getElementById(
"addMySongBtn"
);

const replaceSongPopup =
document.getElementById(
"replaceSongPopup"
);

const replaceTrackLink =
document.getElementById(
"replaceTrackLink"
);

const cancelReplaceSong =
document.getElementById(
"cancelReplaceSong"
);

const submitReplaceSong =
document.getElementById(
"submitReplaceSong"
);


/************************************************
STORAGE
************************************************/

let mySongs =

JSON.parse(

localStorage.getItem(
"prime_my_song"
)

)||[];

let requestSongs =

JSON.parse(

localStorage.getItem(
"prime_request_song"
)

)||[];

let replaceIndex = -1;


/************************************************
SAVE
************************************************/

function saveMySong(){

localStorage.setItem(

"prime_my_song",

JSON.stringify(
mySongs
)

);

}

function saveRequest(){

localStorage.setItem(

"prime_request_song",

JSON.stringify(
requestSongs
)

);

}


/************************************************
RENDER
************************************************/

function renderMySong(){

if(!mySongList) return;

mySongList.innerHTML="";

mySongs.forEach((song,index)=>{

mySongList.innerHTML+=

`

<div class="mySongCard">

<div class="mySongOld">

<img src="${song.cover}">

<div>

<div class="songTitle">

${song.title}

</div>

<div class="songArtist">

${song.artist}

</div>

</div>

<div class="waiting">

WAITING

</div>

</div>

<div class="changeIcon">

⇅

</div>

${
song.newSong

?

`

<div class="mySongNew">

<img src="${song.newSong.cover}">

<div>

<div class="songTitle">

${song.newSong.title}

</div>

<div class="songArtist">

${song.newSong.artist}

</div>

</div>

<div class="waiting">

WAITING

</div>

</div>

`

:

""

}

<button

class="replaceSong"

onclick="openReplace(${index})">

CHANGE

</button>

</div>

`;

});

}


/************************************************
ADD SONG
************************************************/

async function addMySong(){

if(

mySongs.length>=8

){

showAlert(

"MAXIMUM 8 SONG"

);

return;

}

const link =

prompt(

"SPOTIFY TRACK URL"

);

if(!link) return;

showLoading();

const data=

await worker(

"/spotify/track",

{

track:link

}

);

hideLoading();

if(!data){

showAlert(

"INVALID TRACK"

);

return;

}

mySongs.push({

cover:data.cover,

title:data.title,

artist:data.artist,

track:data.id,

link:data.link,

newSong:null

});

saveMySong();

requestSongs.push({

member:

getPrimarySpotify().name,

type:"add",

oldSong:null,

newSong:data,

status:"waiting"

});

saveRequest();

renderMySong();

showAlert(

"REQUEST SENT"

);

}


/************************************************
BUTTON
************************************************/

if(

!IS_ADMIN

){

addMySongBtn.onclick=()=>{

addMySong();

};

}else{

addMySongBtn.style.display=
"none";

}


/************************************************
OPEN REPLACE
************************************************/

function openReplace(index){

replaceIndex=index;

replaceSongPopup.style.display=
"flex";

replaceTrackLink.value="";

}


/************************************************
CANCEL
************************************************/

cancelReplaceSong.onclick=()=>{

replaceSongPopup.style.display=
"none";

};


/************************************************
SUBMIT
************************************************/

submitReplaceSong.onclick=

async()=>{

const link=

replaceTrackLink.value.trim();

if(link===""){

showAlert(

"EMPTY LINK"

);

return;

}

showLoading();

const data=

await worker(

"/spotify/track",

{

track:link

}

);

hideLoading();

if(!data){

showAlert(

"INVALID TRACK"

);

return;

}

mySongs[replaceIndex]

.newSong={

cover:data.cover,

title:data.title,

artist:data.artist,

track:data.id,

link:data.link

};

saveMySong();

requestSongs.push({

member:

getPrimarySpotify().name,

type:"replace",

oldSong:

mySongs[replaceIndex],

newSong:data,

status:"waiting"

});

saveRequest();

replaceSongPopup.style.display=
"none";

renderMySong();

showAlert(

"WAIT ADMIN"

);

};


/************************************************
AUTO
************************************************/

renderMySong();

/************************************************
PLAYLIST.JS
PART 6
REQUEST TAB
ADMIN
ACTIVITY
CRYSTAL
ENERGY
************************************************/


/************************************************
ELEMENT
************************************************/

const requestSongs =
document.getElementById(
"requestSongs"
);

const memberActivity =
document.getElementById(
"memberActivity"
);


/************************************************
STORAGE
************************************************/

let memberList =

JSON.parse(

localStorage.getItem(
"prime_member_list"

)

)||[];


/************************************************
SYNC MEMBER
************************************************/

function syncMember(){

const account =
getPrimarySpotify();

if(!account) return;

const exist =

memberList.find(

x=>x.name===account.name

);

if(exist) return;

memberList.push({

name:account.name,

photo:account.photo,

target:5,

crystal:0,

energy:0

});

localStorage.setItem(

"prime_member_list",

JSON.stringify(
memberList
)

);

}


/************************************************
REQUEST
************************************************/

function renderRequest(){

if(

!requestSongs

)return;

requestSongs.innerHTML="";

requestSongs.forEach(

(item,index)=>{

requestSongs.innerHTML+=

`

<div class="requestCard">

<div class="requestMember">

${item.member}

</div>

${
item.oldSong

?

`

<div class="requestOld">

<img src="${item.oldSong.cover}">

<div>

${item.oldSong.title}

<br>

${item.oldSong.artist}

</div>

</div>

`

:

""

}

<div class="requestArrow">

↓

</div>

<div class="requestNew">

<img src="${item.newSong.cover}">

<div>

${item.newSong.title}

<br>

${item.newSong.artist}

</div>

</div>

<div class="requestLink">

${item.newSong.link}

</div>

<div class="requestAction">

<button

onclick="acceptRequest(${index})">

ACCEPT

</button>

<button

onclick="rejectRequest(${index})">

REJECT

</button>

</div>

</div>

`;

});

}


/************************************************
ACCEPT
************************************************/

function acceptRequest(index){

requestSongs[index].status=
"accepted";

saveRequest();

showAlert(

"REQUEST ACCEPTED"

);

/*

PART 7

langsung update
playlist

*/

requestSongs.splice(

index,

1

);

saveRequest();

renderRequest();

}


/************************************************
REJECT
************************************************/

function rejectRequest(index){

requestSongs.splice(

index,

1

);

saveRequest();

renderRequest();

showAlert(

"REQUEST REJECTED"

);

}


/************************************************
ACTIVITY
************************************************/

function renderActivity(){

if(!memberActivity) return;

memberActivity.innerHTML="";

memberList.forEach(

(member,index)=>{

let crystal="";

for(

let i=0;

i<member.target;

i++

){

crystal+=

`

<div class="crystal

${

i<member.crystal

?

"active"

:

""

}">

◇

</div>

`;

}

let energy="";

for(

let i=0;

i<4;

i++

){

energy+=

`

<div class="energy

${

i<member.energy

?

"active"

:

""

}">

▣

</div>

`;

}

memberActivity.innerHTML+=

`

<div class="memberCard">

<div class="memberHead">

<img src="${member.photo}">

<span>

${member.name}

</span>

</div>

<div class="memberCrystal">

${crystal}

</div>

<div class="memberEnergy">

${energy}

</div>

${
IS_ADMIN

?

`

<div class="adminControl">

<div>

Crystal

<button

onclick="crystalPlus(${index})">

+

</button>

<button

onclick="crystalMinus(${index})">

-

</button>

</div>

<div>

Energy

<button

onclick="energyPlus(${index})">

+

</button>

<button

onclick="energyMinus(${index})">

-

</button>

</div>

<div>

Target

<button

onclick="targetPlus(${index})">

+

</button>

<button

onclick="targetMinus(${index})">

-

</button>

</div>

</div>

`

:

""

}

</div>

`;

});

}


/************************************************
SAVE MEMBER
************************************************/

function saveMember(){

localStorage.setItem(

"prime_member_list",

JSON.stringify(
memberList
)

);

renderActivity();

}


/************************************************
TARGET
************************************************/

function targetPlus(index){

memberList[index].target++;

saveMember();

}

function targetMinus(index){

if(

memberList[index].target<=1

)return;

memberList[index].target--;

if(

memberList[index].crystal>

memberList[index].target

){

memberList[index].crystal=

memberList[index].target;

}

saveMember();

}


/************************************************
CRYSTAL
************************************************/

function crystalPlus(index){

if(

memberList[index].crystal<

memberList[index].target

){

memberList[index].crystal++;

}

saveMember();

}

function crystalMinus(index){

if(

memberList[index].crystal>0

){

memberList[index].crystal--;

}

saveMember();

}


/************************************************
ENERGY
************************************************/

function energyPlus(index){

if(

memberList[index].energy<4

){

memberList[index].energy++;

}

saveMember();

}

function energyMinus(index){

if(

memberList[index].energy>0

){

memberList[index].energy--;

}

saveMember();

}


/************************************************
AUTO
************************************************/

syncMember();

renderActivity();

if(IS_ADMIN){

renderRequest();

}

/************************************************
PLAYLIST.JS
PART 7
SPOTIFY API
NOW PLAYING
RECENT TRACK
CHECKIN
PLAYLIST EDIT
WORKER READY
************************************************/


/************************************************
WORKER
************************************************/

/*
Semua Spotify API
menggunakan Worker.

Tidak ada

CLIENT ID

CLIENT SECRET

di file ini.

Endpoint contoh

/api/spotify

*/

const WORKER = "";


/************************************************
CALL WORKER
************************************************/

async function spotifyAPI(action,data={}){

const result =

await fetch(

WORKER,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

action,

data

})

}

);

return await result.json();

}


/************************************************
LOAD PLAYLIST
************************************************/

async function loadPlaylist(){

if(!PLAYLIST_ID) return;

const playlist =

await spotifyAPI(

"playlist",

{

playlist:PLAYLIST_ID

}

);

if(!playlist.success) return;

playlistCover.src =
playlist.cover;

playlistTitle.innerText =
playlist.title;

playlistDescription.innerText =
playlist.description;

playlistLink.href =
playlist.link;

playlistSongs =
playlist.tracks;

saveSong();

renderSong();

calculateProgress();

}


/************************************************
NOW PLAYING
************************************************/

async function loadNowPlaying(){

const account =
getPrimarySpotify();

if(!account) return;

const data =

await spotifyAPI(

"nowPlaying",

{

spotifyId:
account.id

}

);

if(!data.success) return;

if(!data.playing){

if(currentSongId){

songFalse(
currentSongId
);

}

return;

}

currentSongId=
data.track.id;

songPlaying(

data.track.id

);

}


/************************************************
RECENT TRACK
************************************************/

async function loadRecentTrack(){

const account =
getPrimarySpotify();

if(!account) return;

const data =

await spotifyAPI(

"recentTrack",

{

spotifyId:
account.id

}

);

if(!data.success) return;

if(!data.track) return;

/*

Recent
langsung TRUE

*/

songTrue(

data.track

);

}


/************************************************
CHECKIN
************************************************/

function checkinMission(){

const total =
playlistSongs.length;

const valid =

playHistory.filter(

x=>x.playing

).length;

if(valid<total){

showAlert(

"MISSION NOT COMPLETE"

);

return;

}

/*

reset song

*/

playHistory.forEach(

song=>{

song.playing=false;

}

);

saveHistory();

renderSong();

calculateProgress();

/*

crystal

*/

const account=
getPrimarySpotify();

if(account){

const member=

memberList.find(

x=>x.name===account.name

);

if(member){

member.crystal++;

if(

member.crystal>=

member.target

){

member.crystal=0;

if(

member.energy<4

){

member.energy++;

}

}

saveMember();

}

}

showAlert(

"CHECK IN SUCCESS"

);

}


/************************************************
BUTTON
************************************************/

checkinBtn.onclick=()=>{

checkinMission();

};


/************************************************
PLAYLIST EDIT
ADMIN
************************************************/

async function savePlaylistURL(){

if(!IS_ADMIN) return;

const url =

playlistSpotifyLink.value;

const result =

await spotifyAPI(

"changePlaylist",

{

url

}

);

if(!result.success){

showAlert(

"INVALID PLAYLIST"

);

return;

}

PLAYLIST_ID=
result.playlistId;

loadPlaylist();

showAlert(

"PLAYLIST UPDATED"

);

}


/************************************************
AUTO SYNC
************************************************/

setInterval(()=>{

loadNowPlaying();

loadRecentTrack();

},5000);


/************************************************
START
************************************************/

window.onload=()=>{

renderSpotifyButton();

renderJoinedPlaylist();

syncMember();

renderActivity();

renderSong();

renderMySong();

calculateProgress();

checkJoinStatus();

loadPlaylist();

loadNowPlaying();

loadRecentTrack();

};

/************************************************
PLAYLIST.JS
PART 8
REQUEST SYSTEM + ADMIN ACCEPT / REJECT
************************************************/

/************************************************
REQUEST STORAGE
************************************************/

let requestQueue =

JSON.parse(

localStorage.getItem(
"prime_request_queue"

)

)||[];

/************************************************
RENDER REQUEST
************************************************/

function renderRequest(){

if(!IS_ADMIN) return;

if(!requestSongs) return;

requestSongs.innerHTML="";

if(requestQueue.length===0){

requestSongs.innerHTML=

`
<div class="emptyRequest">

NO REQUEST

</div>
`;

return;

}

requestQueue.forEach((item,index)=>{

requestSongs.innerHTML+=

`

<div class="requestCard">

<div class="requestMember">

${item.member}

</div>

<div class="requestOld">

${

item.oldSong ?

item.oldSong.title :

"NEW SONG"

}

</div>

<div class="requestArrow">

↓

</div>

<div class="requestNew">

${item.newSong.title}

</div>

<div class="requestArtist">

${item.newSong.artist}

</div>

<div class="requestLink">

<a
href="${item.newSong.track}"
target="_blank">

OPEN TRACK

</a>

</div>

<div class="requestButtonArea">

<button
onclick="acceptRequest(${index})">

ACCEPT

</button>

<button
onclick="rejectRequest(${index})">

REJECT

</button>

</div>

</div>

`;

});

}

/************************************************
SAVE REQUEST
************************************************/

function saveRequest(){

localStorage.setItem(

"prime_request_queue",

JSON.stringify(
requestQueue
)

);

renderRequest();

}

/************************************************
ADD REQUEST
************************************************/

function addRequest(data){

requestQueue.push(data);

saveRequest();

}

/************************************************
ACCEPT
************************************************/

function acceptRequest(index){

const req=

requestQueue[index];

if(!req) return;

/*

REPLACE SONG

*/

if(req.type==="replace"){

let mySong=

JSON.parse(

localStorage.getItem(
"prime_my_song"
)

)||[];

mySong[req.songIndex]=

req.newSong;

localStorage.setItem(

"prime_my_song",

JSON.stringify(
mySong
)

);

}

/*

ADD SONG

*/

if(req.type==="add"){

let mySong=

JSON.parse(

localStorage.getItem(
"prime_my_song"
)

)||[];

mySong.push(

req.newSong

);

localStorage.setItem(

"prime_my_song",

JSON.stringify(
mySong
)

);

}

requestQueue.splice(

index,

1

);

saveRequest();

showAlert(

"REQUEST ACCEPTED"

);

}

/************************************************
REJECT
************************************************/

function rejectRequest(index){

requestQueue.splice(

index,

1

);

saveRequest();

showAlert(

"REQUEST REJECTED"

);

}

/************************************************
AUTO
************************************************/

if(IS_ADMIN){

renderRequest();

}

/************************************************
PLAYLIST.JS
PART 9
ACTIVITY
CRYSTAL
ENERGY
CHECKIN
************************************************/


/************************************************
ELEMENT
************************************************/

const memberActivity =
document.getElementById(
"memberActivity"
);


/************************************************
MEMBER STORAGE
************************************************/

let memberList =

JSON.parse(

localStorage.getItem(
"prime_member_list"

)

)||[];


/************************************************
SAVE MEMBER
************************************************/

function saveMember(){

localStorage.setItem(

"prime_member_list",

JSON.stringify(
memberList
)

);

renderActivity();

}


/************************************************
SYNC MEMBER
************************************************/

function syncMember(){

const account =
getPrimarySpotify();

if(!account) return;

const exist =

memberList.find(

x=>x.uid===account.id

);

if(exist) return;

memberList.push({

uid:account.id,

name:account.name,

photo:account.photo,

targetCrystal:5,

crystal:0,

energy:0

});

saveMember();

}


/************************************************
CHECKIN REWARD
************************************************/

function rewardCheckin(){

const account =
getPrimarySpotify();

if(!account) return;

const member =

memberList.find(

x=>x.uid===account.id

);

if(!member) return;

member.crystal++;

if(

member.crystal>=

member.targetCrystal

){

member.crystal=0;

if(

member.energy<4

){

member.energy++;

}

}

saveMember();

}


/************************************************
RENDER
************************************************/

function renderActivity(){

if(!memberActivity) return;

memberActivity.innerHTML="";

memberList.forEach(

(member,index)=>{

let crystalHTML="";

for(

let i=0;

i<member.targetCrystal;

i++

){

crystalHTML+=

`

<div class="crystal

${

i<member.crystal

?

"active"

:

""

}">

◇

</div>

`;

}

let energyHTML="";

for(

let i=0;

i<4;

i++

){

energyHTML+=

`

<div class="energy

${

i<member.energy

?

"active"

:

""

}">

▣

</div>

`;

}

memberActivity.innerHTML+=

`

<div class="memberCard">

<div class="memberHeader">

<img

src="${member.photo}"

class="memberPhoto">

<div class="memberName">

${member.name}

</div>

</div>

<div class="memberCrystal">

${crystalHTML}

</div>

<div class="memberEnergy">

${energyHTML}

</div>

${
IS_ADMIN

?

`

<div class="adminPanel">

<div>

CRYSTAL

<button

onclick="crystalPlus(${index})">

+

</button>

<button

onclick="crystalMinus(${index})">

-

</button>

</div>

<div>

TARGET

<button

onclick="targetPlus(${index})">

+

</button>

<button

onclick="targetMinus(${index})">

-

</button>

</div>

<div>

ENERGY

<button

onclick="energyPlus(${index})">

+

</button>

<button

onclick="energyMinus(${index})">

-

</button>

</div>

</div>

`

:

""

}

</div>

`;

});

}


/************************************************
CRYSTAL
************************************************/

function crystalPlus(index){

const member=

memberList[index];

if(

member.crystal<

member.targetCrystal

){

member.crystal++;

}

saveMember();

}

function crystalMinus(index){

const member=

memberList[index];

if(

member.crystal>0

){

member.crystal--;

}

saveMember();

}


/************************************************
TARGET
************************************************/

function targetPlus(index){

memberList[index]

.targetCrystal++;

saveMember();

}

function targetMinus(index){

const member=

memberList[index];

if(

member.targetCrystal<=1

)return;

member.targetCrystal--;

if(

member.crystal>

member.targetCrystal

){

member.crystal=

member.targetCrystal;

}

saveMember();

}


/************************************************
ENERGY
************************************************/

function energyPlus(index){

if(

memberList[index]

.energy<4

){

memberList[index]

.energy++;

}

saveMember();

}

function energyMinus(index){

if(

memberList[index]

.energy>0

){

memberList[index]

.energy--;

}

saveMember();

}


/************************************************
AUTO
************************************************/

syncMember();

renderActivity();

/************************************************
PLAYLIST.JS
PART 10
FINAL
HELPER
EDIT SONG
WINDOW LOAD
************************************************/


/************************************************
LOADING
************************************************/

function showLoading(){

loadingScreen.style.display="flex";

}

function hideLoading(){

loadingScreen.style.display="none";

}


/************************************************
EDIT SONG
ADMIN
************************************************/

let editSongId = "";

function editSong(id){

if(!IS_ADMIN) return;

editSongId=id;

addSongPopup.style.display="flex";

spotifyTrackLink.value="";

submitAddSong.innerText="SAVE";

}

submitAddSong.onclick=

async()=>{

const link=

spotifyTrackLink.value.trim();

if(link===""){

showAlert(

"EMPTY LINK"

);

return;

}

showLoading();

const data=

await spotifyAPI(

"track",

{

url:link

}

);

hideLoading();

if(!data.success){

showAlert(

"INVALID TRACK"

);

return;

}

/*

EDIT

*/

if(editSongId!==""){

const index=

playlistSongs.findIndex(

x=>x.id===editSongId

);

if(index!==-1){

playlistSongs[index]={

id:data.id,

cover:data.cover,

title:data.title,

artist:data.artist,

duration:data.duration,

track:data.track

};

saveSongStorage();

renderSong();

showAlert(

"SONG UPDATED"

);

}

editSongId="";

submitAddSong.innerText="ADD";

spotifyTrackLink.value="";

addSongPopup.style.display="none";

return;

}

/*

ADD

*/

playlistSongs.push({

id:data.id,

cover:data.cover,

title:data.title,

artist:data.artist,

duration:data.duration,

track:data.track

});

saveSongStorage();

renderSong();

showAlert(

"SONG ADDED"

);

spotifyTrackLink.value="";

addSongPopup.style.display="none";

};


/************************************************
ACCEPT REQUEST
UPDATE MEMBER SONG
************************************************/

function replaceMemberSong(req){

let memberSong=

JSON.parse(

localStorage.getItem(
"prime_my_song"

)

)||[];

if(req.type==="replace"){

memberSong[req.songIndex]=

req.newSong;

}

if(req.type==="add"){

memberSong.push(

req.newSong

);

}

localStorage.setItem(

"prime_my_song",

JSON.stringify(
memberSong
)

);

}


/************************************************
CHECKIN
************************************************/

checkinBtn.onclick=()=>{

checkinMission();

rewardCheckin();

renderActivity();

};


/************************************************
AUTO SYNC
************************************************/

setInterval(()=>{

loadNowPlaying();

loadRecentTrack();

},5000);


/************************************************
WINDOW LOAD
************************************************/

window.onload=()=>{

showLoading();

/*

HEADER

*/

renderPlaylistHeader();

loadPlaylist();

/*

SIDEBAR

*/

renderJoinedPlaylist();

/*

SPOTIFY

*/

renderSpotifyButton();

checkJoinStatus();

/*

SONG

*/

renderSong();

/*

YOUR SONG

*/

renderMySong();

/*

REQUEST

*/

if(IS_ADMIN){

renderRequest();

}

/*

ACTIVITY

*/

syncMember();

renderActivity();

/*

PROGRESS

*/

calculateProgress();

/*

SPOTIFY

*/

loadNowPlaying();

loadRecentTrack();

hideLoading();

};


/************************************************
END OF PLAYLIST.JS
************************************************/