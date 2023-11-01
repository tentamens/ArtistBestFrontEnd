const url = "http://localhost:8000"

var artistName = null;
var voteState = "Song"
var expireTime = null;

window.onload = loadPage;

async function loadPage() {

  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get('search');
  artistName = searchValue;

  document.getElementById("loadingText").innerHTML = searchValue;
  let result;

  const token = localStorage.getItem('token');
  const expireTime = localStorage.getItem('expireTime');


  await fetch(`${url}/api/load/bestSongs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "artistName": artistName,
      "token": token
    })
  })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error(error))
  result = JSON.parse(result)

  if (catchExpiredTokenError(result) === true) {
    generateToken()
    return
  }


  var songsVotedOn = 0
  for (var i = 0; i < result["songs"].length; i++) {
    i = parseInt(i);
    songsVotedOn++
    document.getElementById(`song${(i + 1)}`).innerHTML = result["songs"][i][1];

    var button = document.getElementById(`searchButton${i + 1}`);

    (function () {
      var output = result["songs"][i][2];
      button.onclick = function () {
        window.location.href = output;
      };
    })();

  }


  for (var i = songsVotedOn; i < 6; i++) {
    i = parseInt(i);
    document.getElementById(`song${(i + 1)}`).innerHTML = "No Song voted on";
  }

  var button = document.getElementById("playlistButton");
  (function () {
    button.onclick = function () {
      window.location.href = `https://open.spotify.com/playlist/${result["playlist"]}`
    };
  })();

  updateSimiliarArtists(result["similartyVotes"])

};



function updateSimiliarArtists(similartyVotes) {
  let votedon = 0
  for (var i = 0; i < similartyVotes.length; i++) {
    votedon++
    i = parseInt(i);
    document.getElementById(`similar${(i + 1)}`).innerHTML = similartyVotes[i][0];

    var button = document.getElementById(`similarButton${i + 1}`);

    (function () {
      var output = similartyVotes[i][1];
      button.onclick = function () {
        window.location.href = output;
      };
    })();
  }
  for (var i = votedon; i < 3; i++) {
    i = parseInt(i);
    document.getElementById(`similar${(i + 1)}`).innerHTML = "No Artist voted on";
  }
}

async function generateToken() {
  let token = null;
  const Theurl = `${url}/api/get/token`;
  await fetch(Theurl, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => token = data)
    .catch(error => console.error(error));
  localStorage.setItem('token', token);
  expireTime = new Date().getTime() / 1000 + 3600;
  localStorage.setItem('expireTime', expireTime)
  return;
};



function votePop() {
  document.getElementById("closePopUpButton").style.visibility = "visible";
  document.getElementById("votePopup").style.visibility = "visible";
};


function closePopup() {
  document.getElementById("closePopUpButton").style.visibility = "hidden";
  document.getElementById("votePopup").style.visibility = "hidden";
};


async function confirmVote() {
  if (expireTime < new Date().getTime() / 1000) {
    generateToken();
  };
  let result = null
  const searchTerm = document.getElementById("searchboxVote").value;
  const token = localStorage.getItem('token');


  if (searchTerm === '')
    return;


  if (voteState === "Artist") {
    await voteOnArtsist(searchTerm, token)
    return
  }

  await voteOnSong(searchTerm, token)



};


async function voteOnArtsist(searchTerm, token) {
  const respone = await fetch(`${url}/api/post/vote/similarity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": token,
      "artistName": artistName,
      "votedArtist": searchTerm
    })
  })




}



async function voteOnSong(searchTerm, token) {
  let result = null;
  console.log("hello");
  
  try {
    const response = await fetch(`${url}/api/post/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "songName": `${searchTerm}`,
        "artistName": artistName,
        "token": token
      })
    });

    if (!response.ok) {
      document.getElementById("errorBox").style.visibility = "visible";
    }

    result = await response.json();

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
    return true
  }
  return false
};


function changeVoteState() {
  if (voteState === "Song") {
    voteState = "Artist"
    document.getElementById("voteButtonChangerText").innerHTML = "Artist Vote"
    document.getElementById("searchbox").placeholder = "Similar Artist"
    document.getElementById("h3font").innerHTML = "Vote on Similar sounding Artist"
    return
  }
  voteState = "Song"
  document.getElementById("voteButtonChangerText").innerHTML = "Similar Artist"
  document.getElementById("searchbox").placeholder = "Song Name"
  document.getElementById("h3font").innerHTML = "Vote on their Best Songs"
  return

}


async function search() {
  if (expireTime < new Date().getTime() / 1000) {
    generateToken();
  }

  var searchBox = document.getElementById("searchBoxTopTXT");
  var searchTerm = searchBox.value;
  const token = localStorage.getItem('token');
  if (searchTerm === '') {
    return;
  }

  let result = null


  await fetch(`${url}/api/load/searchArtist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      artistName: `${searchTerm}`,
      token: token
    })
  })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error(error))


  let searchQuery = result;

  history.pushState(null, '', '?search=' + encodeURIComponent(searchQuery));
  loadPage()
};
