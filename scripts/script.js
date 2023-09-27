var artistName = null;


window.onload = async function () {




  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get('search');
  artistName = searchValue;
  console.log(searchValue)

  document.getElementById("loadingText").innerHTML = searchValue;
  let result;

  const token = localStorage.getItem('token');


  await fetch('http://app.artistsbest.io/api/load/bestSongs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      artistName: `${searchValue}`,
      token: token
    })
  })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error(error))
  result = JSON.parse(result)

  if (catchExpiredTokenError(result) === true) {
    window.location.reload()
    return
  }

  console.log(result)

  var songsVotedOn = 0
  for (var i = 0; i < result.length; i++) {
    i = parseInt(i);
    songsVotedOn++
    document.getElementById(`song${(i + 1)}`).innerHTML = result[i][1];

    var button = document.getElementById(`searchButton${i + 1}`);

    var output = result[i][3]
    button.onclick = function () {
      window.location.href = output;
      console.log(output)
    };

  }


  for (var i = songsVotedOn; i < 6; i++) {
    i = parseInt(i);
    document.getElementById(`song${(i + 1)}`).innerHTML = "No Song voted on";
  }


};

async function generateToken() {
  var token = null
  fetch('http://app.artistsbest.io/api/get/token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => token = data)
    .catch(error => console.error(error))

  localStorage.setItem('token', token);

}


function votePop() {
  document.getElementById("closePopUpButton").style.visibility = "visible";
  document.getElementById("votePopup").style.visibility = "visible";
};


function closePopup() {
  document.getElementById("closePopUpButton").style.visibility = "hidden";
  document.getElementById("votePopup").style.visibility = "hidden";
};


async function confirmVote() {
  let result = null
  const searchTerm = document.getElementById("searchBox").value;

  if (searchTerm === '')
    return;

  const token = localStorage.getItem('token');



  await fetch('http://localhost:8000/api/post/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      songName: `${searchTerm}`,
      artistName: artistName,
      token: token
    })
  })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error(error))

  result = JSON.parse(result)

  if (catchExpiredTokenError(result) === true)
    return;

};



function catchExpiredTokenError(result) {
  if (401 === result) {
    generateToken();
    return true
  }
  return false
};