/************************************************
PLAYLIST.JS
PART 1
CONFIG + ELEMENT + SIDEBAR + SPOTIFY LOGIN
************************************************/


/************************************************
CONFIG
************************************************/

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

/************************************************
MODE
************************************************/

const IS_ADMIN =
localStorage.getItem("is_admin") === "true";

/************************************************
PLAYLIST
************************************************/

let PLAYLIST_ID = "";

/************************************************
ELEMENT
************************************************/

const overlay =
document.getElementById("overlay");

const sidebar =
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

const spotifyButton =
document.getElementById("spotifyButton");

const cyberAlert =
document.getElementById("cyberAlert");

const joinPopup =
document.getElementById("joinPopup");

const connectSpotify =
document.getElementById("connectSpotify");

const joinListener =
document.getElementById("joinListener");

const playlistTitle =
document.getElementById("playlistTitle");

const playlistDescription =
document.getElementById("playlistDescription");

const playlistCover =
document.getElementById("playlistCover");

const playlistLink =
document.getElementById("playlistLink");

const joinedPlaylist =
document.getElementById("joinedPlaylist");

/************************************************
LOCAL STORAGE
************************************************/

let spotifyAccounts =

JSON.parse(

localStorage.getItem(
"spotify_accounts"

)

) || [];

let joined =

localStorage.getItem(
"joined_prime"
) === "true";

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
SIDEBAR
************************************************/

menuBtn.onclick = ()=>{

sidebar.classList.add(
"show"
);

overlay.classList.add(
"show"
);

};

overlay.onclick = ()=>{

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

if(!joinedPlaylist) return;

joinedPlaylist.innerHTML="";

const list =

JSON.parse(

localStorage.getItem(
"joined_playlist"
)

)||[];

if(list.length===0){

joinedPlaylist.innerHTML=

`
<div class="joinedItem">

NO PLAYLIST

</div>
`;

return;

}

list.forEach(name=>{

const div=
document.createElement("div");

div.className=
"joinedItem";

div.innerText=
name;

joinedPlaylist.appendChild(div);

});

}

renderJoinedPlaylist();

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

location.href="../index.html";

}

/************************************************
SPOTIFY ACCOUNT
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

/*
PART 2

ACCOUNT SWITCH POPUP

*/

showAlert(

"ACCOUNT LIST"

);

};

renderSpotifyButton();

/************************************************
SPOTIFY LOGIN
************************************************/

function spotifyLogin(){

if(

CLIENT_ID===""

){

showAlert(

"CLIENT ID EMPTY"

);

return;

}

/*

OAuth Spotify

*/

}

/************************************************
CONNECT BUTTON
************************************************/

connectSpotify.onclick=()=>{

spotifyLogin();

};

/************************************************
JOIN LISTENER
************************************************/

joinListener.onclick=()=>{

localStorage.setItem(

"joined_prime",

"true"

);

showAlert(

"JOIN SUCCESS"

);

setTimeout(()=>{

location.reload();

},1000);

};

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

if(

spotifyAccounts.length===0

){

joinPopup.classList.add(
"show"
);

connectSpotify.style.display=
"block";

joinListener.style.display=
"none";

return;

}

if(

joined===false

){

joinPopup.classList.add(
"show"
);

connectSpotify.style.display=
"none";

joinListener.style.display=
"block";

return;

}

joinPopup.classList.remove(
"show"
);

}

checkJoinStatus();

/************************************************
LOAD PLAYLIST
************************************************/

async function loadPlaylist(){

if(

PLAYLIST_ID===""

)return;

/*

Spotify API

GET PLAYLIST

↓

playlistTitle

playlistDescription

playlistCover

playlistLink

*/

}

/************************************************
START
************************************************/

window.onload=()=>{

renderSpotifyButton();

renderJoinedPlaylist();

checkJoinStatus();

loadPlaylist();

};

/************************************************
PLAYLIST.JS
PART 2
HEADER + TAB + SONG STORAGE
************************************************/

/************************************************
ELEMENT
************************************************/

const progressBar =
document.getElementById("progressBar");

const progressText =
document.getElementById("progressText");

const checkinButton =
document.getElementById("checkinButton");

const tabSong =
document.getElementById("tabSong");

const tabYourSong =
document.getElementById("tabYourSong");

const tabActivity =
document.getElementById("tabActivity");

const tabRequest =
document.getElementById("tabRequest");

const songPage =
document.getElementById("songPage");

const yourSongPage =
document.getElementById("yourSongPage");

const activityPage =
document.getElementById("activityPage");

const requestPage =
document.getElementById("requestPage");

const songContainer =
document.getElementById("songContainer");

/************************************************
LOCAL STORAGE
************************************************/

let playlistSongs =

JSON.parse(

localStorage.getItem(
"playlist_song_list"

)

)||[];

let playHistory =

JSON.parse(

localStorage.getItem(
"playlist_play_history"

)

)||[];

/************************************************
TAB SYSTEM
************************************************/

function closeAllTab(){

songPage.style.display="none";

yourSongPage.style.display="none";

activityPage.style.display="none";

if(requestPage){

requestPage.style.display="none";

}

}

function openSong(){

closeAllTab();

songPage.style.display="block";

}

function openYourSong(){

closeAllTab();

yourSongPage.style.display="block";

}

function openActivity(){

closeAllTab();

activityPage.style.display="block";

}

function openRequest(){

if(!IS_ADMIN) return;

closeAllTab();

requestPage.style.display="block";

}

tabSong.onclick =
openSong;

tabYourSong.onclick =
openYourSong;

tabActivity.onclick =
openActivity;

if(tabRequest){

tabRequest.onclick=
openRequest;

}

/************************************************
SONG STATUS
************************************************/

function getSongStatus(id){

const found =

playHistory.find(

song=>song.id===id

);

if(!found){

return false;

}

return found.playing;

}

/************************************************
CREATE SONG
************************************************/

function renderSongs(){

if(!songContainer) return;

songContainer.innerHTML="";

playlistSongs.forEach(song=>{

const green =

getSongStatus(
song.id
);

songContainer.innerHTML+=

`

<div class="songCard">

<div class="songCover">

<img src="${song.cover}">

</div>

<div class="songInfo">

<div class="songTitle ${green?"played":""}">

${song.title}

</div>

<div class="songArtist ${green?"played":""}">

${song.artist}

</div>

<div class="songDuration">

${song.duration}

</div>

</div>

${
IS_ADMIN ?

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

}

/************************************************
ADD SONG
************************************************/

function addSong(data){

playlistSongs.push({

id:data.id,

title:data.title,

artist:data.artist,

cover:data.cover,

duration:data.duration,

track:data.track

});

localStorage.setItem(

"playlist_song_list",

JSON.stringify(
playlistSongs
)

);

renderSongs();

}

/************************************************
EDIT SONG
************************************************/

function editSong(id){

if(!IS_ADMIN) return;

showAlert(

"EDIT SONG"

);

/*

PART 4

*/

}

/************************************************
DELETE SONG
************************************************/

function deleteSong(id){

playlistSongs =

playlistSongs.filter(

song=>song.id!==id

);

localStorage.setItem(

"playlist_song_list",

JSON.stringify(
playlistSongs
)

);

renderSongs();

}

/************************************************
PROGRESS
************************************************/

function updateProgress(){

const total =

playlistSongs.length;

const valid =

playHistory.filter(

song=>song.playing

).length;

let percent = 0;

if(total>0){

percent=

Math.floor(

(valid/total)*100

);

}

progressBar.style.width=

percent+"%";

progressText.innerText=

valid+

" / "+

total+

" SONG";

}

/************************************************
AUTO LOAD
************************************************/

renderSongs();

updateProgress();

openSong();

/************************************************
PLAYLIST.JS
PART 3
NOW PLAYING + RECENT TRACK + HISTORY
************************************************/

/************************************************
SPOTIFY TOKEN
************************************************/

let accessToken =

localStorage.getItem(
"spotify_access_token"
) || "";

/************************************************
NOW PLAYING
************************************************/

let currentSongId = "";

let currentPlaying = false;

/************************************************
PLAY HISTORY

FORMAT

{
id,
title,
artist,
cover,
track,
time,
playing
}

************************************************/

function saveHistory(song){

const index =

playHistory.findIndex(

x=>x.id===song.id

);

if(index===-1){

playHistory.push(song);

}

else{

playHistory[index]=song;

}

localStorage.setItem(

"playlist_play_history",

JSON.stringify(
playHistory
)

);

}

/************************************************
SET SONG TRUE
************************************************/

function songTrue(song){

saveHistory({

id:song.id,

title:song.title,

artist:song.artist,

cover:song.cover,

track:song.track,

time:new Date().toLocaleTimeString(),

playing:true

});

renderSongs();

updateProgress();

}

/************************************************
SET SONG FALSE
************************************************/

function songFalse(id){

const index=

playHistory.findIndex(

x=>x.id===id

);

if(index===-1) return;

playHistory[index].playing=false;

localStorage.setItem(

"playlist_play_history",

JSON.stringify(
playHistory
)

);

renderSongs();

}

/************************************************
LOAD NOW PLAYING
************************************************/

async function loadNowPlaying(){

if(accessToken==="") return;

try{

const result=

await fetch(

"https://api.spotify.com/v1/me/player/currently-playing",

{

headers:{

Authorization:

"Bearer "+accessToken

}

}

);

if(result.status===204){

currentPlaying=false;

if(currentSongId!==""){

songFalse(currentSongId);

}

return;

}

const data=

await result.json();

if(!data.item) return;

const track={

id:data.item.id,

title:data.item.name,

artist:data.item.artists[0].name,

cover:data.item.album.images[0].url,

track:data.item.external_urls.spotify

};

currentSongId=

track.id;

currentPlaying=

data.is_playing;

if(currentPlaying){

songTrue(track);

}

else{

songFalse(track.id);

}

}

catch(e){

console.log(e);

}

}

/************************************************
LOAD RECENT TRACK
HANYA TRACK PALING ATAS
************************************************/

async function loadRecentTrack(){

if(accessToken==="") return;

try{

const result=

await fetch(

"https://api.spotify.com/v1/me/player/recently-played?limit=1",

{

headers:{

Authorization:

"Bearer "+accessToken

}

}

);

const data=

await result.json();

if(!data.items) return;

if(data.items.length===0) return;

const item=

data.items[0];

const track={

id:item.track.id,

title:item.track.name,

artist:item.track.artists[0].name,

cover:item.track.album.images[0].url,

track:item.track.external_urls.spotify,

time:item.played_at,

playing:true

};

/*

Kalau sudah masuk
recent track,

langsung dicatat.

Tetap TRUE.

*/

saveHistory(track);

renderSongs();

updateProgress();

}

catch(e){

console.log(e);

}

}

/************************************************
SYNC
************************************************/

async function spotifyWorker(){

await loadNowPlaying();

await loadRecentTrack();

}

/************************************************
AUTO REFRESH
************************************************/

setInterval(()=>{

spotifyWorker();

},5000);

/************************************************
START
************************************************/

spotifyWorker();

/************************************************
PLAYLIST.JS
PART 4
CHECKIN + PROGRESS + CRYSTAL + ENERGY
************************************************/

/************************************************
ELEMENT
************************************************/

const crystalBox =
document.getElementById(
"crystalBox"
);

const energyBox =
document.getElementById(
"energyBox"
);

const progressFill =
document.getElementById(
"progressFill"
);

const progressValue =
document.getElementById(
"progressValue"
);

const playedSong =
document.getElementById(
"playedSong"
);

const totalSong =
document.getElementById(
"totalSong"
);

/************************************************
MEMBER DATA
************************************************/

let memberStatus =

JSON.parse(

localStorage.getItem(
"prime_member_status"
)

)||{

target:5,

crystal:0,

energy:0,

checkinToday:0

};

/************************************************
PROGRESS
************************************************/

function calculateProgress(){

const total =
playlistSongs.length;

let valid = 0;

playHistory.forEach(song=>{

if(song.playing){

valid++;

}

});

playedSong.innerText =
valid;

totalSong.innerText =
total;

let percent = 0;

if(total>0){

percent =

Math.floor(

(valid/total)*100

);

}

progressFill.style.width =
percent+"%";

progressValue.innerText =
percent+"%";

if(percent===100){

checkinButton.disabled =
false;

}

else{

checkinButton.disabled =
true;

}

}

/************************************************
RENDER CRYSTAL
************************************************/

function renderCrystal(){

crystalBox.innerHTML="";

for(

let i=0;

i<memberStatus.target;

i++

){

const div=

document.createElement(
"div"
);

div.className="crystal";

if(

i<memberStatus.crystal

){

div.classList.add(
"active"
);

}

crystalBox.appendChild(
div
);

}

}

/************************************************
RENDER ENERGY
************************************************/

function renderEnergy(){

energyBox.innerHTML="";

if(

memberStatus.energy>=4

){

energyBox.innerHTML=

`

<div class="reachMax">

REACH MAX

</div>

`;

return;

}

for(

let i=0;

i<4;

i++

){

const div=

document.createElement(
"div"
);

div.className=
"energy";

if(

i<memberStatus.energy

){

div.classList.add(
"active"
);

}

energyBox.appendChild(
div
);

}

}

/************************************************
RESET PLAY HISTORY
************************************************/

function resetSongStatus(){

playHistory.forEach(song=>{

song.playing=false;

});

localStorage.setItem(

"playlist_play_history",

JSON.stringify(
playHistory
)

);

renderSongs();

calculateProgress();

}

/************************************************
CHECKIN
************************************************/

function checkin(){

if(

memberStatus.checkinToday>=2

){

showAlert(

"CHECKIN LIMIT"

);

return;

}

const total =
playlistSongs.length;

const valid =

playHistory.filter(

song=>song.playing

).length;

if(

valid<total

){

showAlert(

"MISSION NOT COMPLETE"

);

return;

}

/*

RESET

*/

resetSongStatus();

memberStatus.crystal++;

memberStatus.checkinToday++;

if(

memberStatus.crystal>=

memberStatus.target

){

memberStatus.crystal=0;

if(

memberStatus.energy<4

){

memberStatus.energy++;

}

}

localStorage.setItem(

"prime_member_status",

JSON.stringify(
memberStatus
)

);

renderCrystal();

renderEnergy();

showAlert(

"CHECKIN SUCCESS"

);

}

/************************************************
BUTTON
************************************************/

checkinButton.onclick=()=>{

checkin();

};

/************************************************
RESET HARIAN
************************************************/

function resetDaily(){

memberStatus.checkinToday=0;

localStorage.setItem(

"prime_member_status",

JSON.stringify(
memberStatus
)

);

}

/************************************************
START
************************************************/

renderCrystal();

renderEnergy();

calculateProgress();

/************************************************
PLAYLIST.JS
PART 5
YOUR SONG + REQUEST SYSTEM
************************************************/

/************************************************
ELEMENT
************************************************/

const yourSongContainer =
document.getElementById(
"yourSongContainer"
);

const requestContainer =
document.getElementById(
"requestContainer"
);

const addYourSong =
document.getElementById(
"addYourSong");

/************************************************
STORAGE
************************************************/

let mySong =

JSON.parse(

localStorage.getItem(
"prime_my_song"

)

)||[];

let requestSong =

JSON.parse(

localStorage.getItem(
"prime_request"

)

)||[];

/************************************************
RENDER MY SONG
************************************************/

function renderMySong(){

if(!yourSongContainer) return;

yourSongContainer.innerHTML="";

mySong.forEach((song,index)=>{

yourSongContainer.innerHTML+=

`

<div class="yourSongCard">

<div class="songCover">

<img src="${song.cover}">

</div>

<div class="songInfo">

<div class="songTitle">

${song.title}

</div>

<div class="songArtist">

${song.artist}

</div>

</div>

<div class="songWaiting">

WAITING

</div>

<button

class="replaceSong"

onclick="replaceSong(${index})">

CHANGE

</button>

</div>

`;

});

}

/************************************************
ADD SONG
************************************************/

function addMemberSong(){

if(

mySong.length>=8

){

showAlert(

"MAX 8 SONG"

);

return;

}

const link =

prompt(

"SPOTIFY TRACK LINK"

);

if(!link) return;

/*

PART 7

Spotify API

↓

cover

title

artist

*/

mySong.push({

cover:"",

title:"Loading",

artist:"Loading",

link:link

});

localStorage.setItem(

"prime_my_song",

JSON.stringify(
mySong
)

);

requestSong.push({

member:

spotifyAccounts[0]?.name ||

"UNKNOWN",

oldSong:null,

newSong:link,

status:"waiting"

});

localStorage.setItem(

"prime_request",

JSON.stringify(
requestSong
)

);

renderMySong();

showAlert(

"REQUEST SENT"

);

}

/************************************************
CHANGE SONG
************************************************/

function replaceSong(index){

const link=

prompt(

"NEW TRACK"

);

if(!link) return;

requestSong.push({

member:

spotifyAccounts[0]?.name ||

"UNKNOWN",

oldSong:

mySong[index],

newSong:

link,

status:"waiting"

});

localStorage.setItem(

"prime_request",

JSON.stringify(
requestSong
)

);

showAlert(

"WAIT ADMIN"

);

}

/************************************************
BUTTON
************************************************/

if(addYourSong){

addYourSong.onclick=()=>{

addMemberSong();

};

}

/************************************************
REQUEST
ADMIN
************************************************/

function renderRequest(){

if(

!requestContainer

)return;

requestContainer.innerHTML="";

requestSong.forEach((item,index)=>{

requestContainer.innerHTML+=

`

<div class="requestCard">

<div class="memberName">

${item.member}

</div>

<div class="requestLink">

${item.newSong}

</div>

<div class="requestButton">

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

showAlert(

"REQUEST ACCEPTED"

);

/*

PART 7

langsung ganti

playlist

spotify

*/

requestSong.splice(

index,

1

);

localStorage.setItem(

"prime_request",

JSON.stringify(
requestSong
)

);

renderRequest();

}

/************************************************
REJECT
************************************************/

function rejectRequest(index){

requestSong.splice(

index,

1

);

localStorage.setItem(

"prime_request",

JSON.stringify(
requestSong
)

);

renderRequest();

showAlert(

"REQUEST REJECTED"

);

}

/************************************************
AUTO
************************************************/

renderMySong();

if(IS_ADMIN){

renderRequest();

}

/************************************************
PLAYLIST.JS
PART 6
ACTIVITY MEMBER + ADMIN EDIT
************************************************/

/************************************************
ELEMENT
************************************************/

const activityContainer =
document.getElementById(
"activityContainer"
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

if(

spotifyAccounts.length===0

)return;

const primary=

spotifyAccounts.find(

x=>x.primary

);

if(!primary) return;

const exist=

memberList.find(

x=>x.name===primary.name

);

if(exist) return;

memberList.push({

name:primary.name,

photo:primary.photo,

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
RENDER
************************************************/

function renderActivity(){

if(!activityContainer) return;

activityContainer.innerHTML="";

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

</div>

`;

}

let energy="";

if(

member.energy>=4

){

energy=

`

<div class="reachMax">

REACH MAX

</div>

`;

}

else{

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

</div>

`;

}

}

activityContainer.innerHTML+=

`

<div class="memberCard">

<div class="memberTop">

<div class="memberAvatar">

<img src="${member.photo}">

</div>

<div class="memberName">

${member.name}

</div>

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

<div class="adminEdit">

<div>

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

}

);

}

/************************************************
SAVE
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

memberList[index].crystal<=0

)return;

memberList[index].crystal--;

saveMember();

}

/************************************************
ENERGY
************************************************/

function energyPlus(index){

if(

memberList[index].energy>=4

)return;

memberList[index].energy++;

saveMember();

}

function energyMinus(index){

if(

memberList[index].energy<=0

)return;

memberList[index].energy--;

saveMember();

}

/************************************************
CHECKIN MEMBER
************************************************/

function memberCheckin(){

if(

spotifyAccounts.length===0

)return;

const primary=

spotifyAccounts.find(

x=>x.primary

);

if(!primary) return;

const index=

memberList.findIndex(

x=>x.name===primary.name

);

if(index===-1) return;

/*

Crystal +

*/

memberList[index].crystal++;

if(

memberList[index].crystal>=

memberList[index].target

){

memberList[index].crystal=0;

if(

memberList[index].energy<4

){

memberList[index].energy++;

}

}

saveMember();

}

/************************************************
START
************************************************/

syncMember();

renderActivity();

