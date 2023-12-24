const url = "https://app.artistsbest.io/";
//http://localhost:6969
//https://app.artistsbest.io/

var artistName = null;
var voteState = "Song";
var expireTime = null;
var reloadCount = 0;
var IsSignedIn = false


addEventListener("DOMContentLoaded", (event) => {loadPage()});



async function loadPage() {
  const expireTime = localStorage.getItem("expireTime");
  const token = localStorage.getItem("token");

  if (reloadCount >2){
    somethingWentWrongOnOurEnd(600);
    return
  };

  if (expireTime < new Date().getTime() / 1000 || token === null || token === "null") {
    reloadCount += 1
    await generateToken();
    await loadPage();
    return;
  }

  //if (localStorage.getItem("uuid") !== null){
  //  document.getElementById("g-id-signin").style.display = "none"
  //  IsSignedIn = true;
  //}

  const urlParams = new URLSearchParams(window.location.search);
  let searchValue = GetSearchQuery()
  artistName = searchValue;
  console.log(searchValue);
  document.getElementById("loadingText").innerHTML = searchValue;
  let result;


  await fetch(`${url}/api/load/bestSongs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistName: artistName,
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => (result = data))
    .catch((error) => console.error(error));

  if (result == undefined){
    somethingWentWrongOnOurEnd(888);
    return;
  }

  result = JSON.parse(result);
  
  if (catchExpiredTokenError(result) === true) {
    generateToken();
    return;
  }

  if (result.status === 400){
    console.log("hello world")
    artistNameNotFound();
    return
  }

  var songsVotedOn = 0;
  for (var i = 0; i < result["songs"].length; i++) {
    i = parseInt(i);
    songsVotedOn++;
    document.getElementById(`song${i + 1}`).innerHTML = result["songs"][i][1];

    var button = document.getElementById(`searchButton${i + 1}`);

    (function () {
      var output = result["songs"][i][2];
      button.href = output
    })();
  }

  for (var i = songsVotedOn; i < 6; i++) {
    i = parseInt(i);
    document.getElementById(`song${i + 1}`).innerHTML = "No Song voted on";
  }

  var button = document.getElementById("playlistButton");
  (function () {
    button.href = `https://open.spotify.com/playlist/${result["playlist"]}`
  })();

  updateSimiliarArtists(result["similartyVotes"]);
}

function updateSimiliarArtists(similartyVotes) {
  let votedon = 0;
  for (var i = 0; i < similartyVotes.length; i++) {
    votedon++;
    i = parseInt(i);
    document.getElementById(`similar${i + 1}`).innerHTML = similartyVotes[i][0];

    var button = document.getElementById(`similarButton${i + 1}`);

    (function () {
      var output = similartyVotes[i][1];
      button.href = output
    })();
  }

  for (var i = votedon; i < 3; i++) {
    i = parseInt(i);
    document.getElementById(`similar${i + 1}`).innerHTML = "No Artist voted on";
  }
}

async function generateToken() {
  let token = null;
  const Theurl = `${url}/api/get/token`;
  await fetch(Theurl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => (token = data))
    .catch((error) => console.error(error));
  localStorage.setItem("token", token);
  expireTime = new Date().getTime() / 1000 + 3600;
  localStorage.setItem("expireTime", expireTime);
  return;
}

function votePop() {
  
  document.getElementsByClassName("blured")[0].style.filter = "blur(0px)";
  document.getElementsByClassName("NotSignedInFont")[0].style.display = "none";
  if (IsSignedIn === false){
    document.getElementsByClassName("blured")[0].style.filter = "blur(4px)";
    document.getElementsByClassName("NotSignedInFont")[0].style.display = "block";
  }

  document.getElementById("closePopUpButton").style.visibility = "visible";
  document.getElementById("voteSongPop").style.visibility = "visible"
}

function closePopup() {
  document.getElementById("closePopUpButton").style.visibility = "hidden";
  document.getElementById("voteArtistPop").style.visibility = "hidden";
  document.getElementById("voteSongPop").style.visibility = "hidden"
}

function voteArtistPop() {
  document.getElementsByClassName("blured")[1].style.filter = "blur(0px)";
  document.getElementsByClassName("NotSignedInFont")[1].style.display = "none";
  if (IsSignedIn === false){
    document.getElementsByClassName("blured")[1].style.filter = "blur(4px)";
    document.getElementsByClassName("NotSignedInFont")[1].style.display = "block";
  }
  document.getElementById("closePopUpButton").style.visibility = "visible";
  document.getElementById("voteArtistPop").style.visibility = "visible";
}

async function confirmVote() {
  
  
  if (expireTime < new Date().getTime() / 1000) {
    generateToken();
  }
  let result = null;
  const searchTerm = document.getElementById("searchboxVote").value;
  const token = localStorage.getItem("token");

  if (searchTerm === "") return;


  await voteOnSong(searchTerm, token);
}

async function confirmArtistVote() {

  const searchTerm = document.getElementById("searchboxVote").value;
  const token = localStorage.getItem("token");

  if (searchTerm === "") return;

  if (expireTime < new Date().getTime() / 1000) {
    await generateToken();
    confirmArtistVote()
    return
  }

  const response = await fetch(`${url}/api/post/vote/similarity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      artistName: artistName,
      votedArtist: searchTerm,
      uuid: localStorage.getItem("uuid"),
    }),
  });
  if (response.status === 400) {
    let result = await response.json()
    noTokenPopup(result)
  }
  result = await response.json();
  checkVoteReturnStatus(result["artistName"], response.status, result)
}

async function voteOnSong(searchTerm, token) {
  let result = null;

  try {
    let response = await fetch(`${url}/api/post/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songName: `${searchTerm}`,
        artistName: artistName,
        token: token,
        uuid: localStorage.getItem("uuid"),
      }),
    });

    if (response.status === 400) {
      let result = await response.json()
      noTokenPopup(result)
    }

    result = await response.json();

    checkVoteReturnStatus(result["songName"], response.status, result)

    if (catchExpiredTokenError(result) === true) {
      return;
    }
  } catch (error) {
    console.error(error);
  }
}

function catchExpiredTokenError(result) {
  if (401 === result) {
    generateToken();
    return true;
  }
  return false;
}

function changeVoteState() {
  if (voteState === "Song") {
    voteState = "Artist";
    document.getElementById("voteButtonChangerText").innerHTML = "Artist Vote";
    document.getElementById("searchboxVote").placeholder = "Similar Artist";
    document.getElementById("h3font").innerHTML =
      "Vote on Similar sounding Artist";
    return;
  }
  voteState = "Song";
  document.getElementById("voteButtonChangerText").innerHTML = "Similar Artist";
  document.getElementById("searchboxVote").placeholder = "Song Name";
  document.getElementById("h3font").innerHTML = "Vote on their Best Songs";
  return;
}


function checkVoteReturnStatus(response, returnStatus, exitCode) {
  if (returnStatus === 200){
      successfullVote(response)
  }
  if (returnStatus === 401){
    if (exitCode["exitCode"] === 130){
      searchNotFound(130)
      return
    }
    fourOOneError(exitCode["exitCode"])
  }
  if (returnStatus === 410){
    noMoreVotes()
  }
}


async function search() {
  if (expireTime < new Date().getTime() / 1000) {
    generateToken();
  }

  var searchBox = document.getElementById("searchBoxTopTXT");
  var searchTerm = searchBox.value;
  const token = localStorage.getItem("token");
  if (searchTerm === "") {
    return;
  }

  let result = null;

  var response = await fetch(`${url}/api/load/searchArtist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistName: `${searchTerm}`,
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => (result = data))
    .catch((error) => console.error(error));
  
  if (response.status === 401){
    generateToken()
    await search()
    return
  } 

  let searchQuery = result;

  var location = getRedirect(searchQuery)

  window.location.href = location
  loadPage();
}


