var artistName = null;


window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get('search');
  artistName = searchValue;
  let result;

  const token = localStorage.getItem('token');

  await fetch('http://localhost:8000/api/load/bestSongs', {
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

  if (401 === result) {
    var errorFont = document.getElementById("errorFont");
    errorFont.innerHTML = `It seems your Token as expired<br> Please make a new session by opening Artists Best in a new tab or press below button to generate a new token`;
    var errorBox = document.getElementById("errorBox");
    errorBox.style.visibility = "visible";
    return
  }

  for (var i = 0; i < result.length; i++) {
    i = parseInt(i);
    document.getElementById(`song${(i + 1)}`).innerHTML = "New text";
  }



};

// call the localhost and generate a new token aswell as save to the window

async function generateToken() {
  const token = await fetch('http://localhost:8000/api/get/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))

  console.log(token)
  localStorage.setItem('token', token);
  window.location.reload();

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

  if (searchTerm === ''){
    return
  };


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
  console.log(result)

  if (401 === result) {
    var errorFont = document.getElementById("errorFont");
    errorFont.innerHTML = `It seems your Token as expired<br> Please make a new session by opening Artists Best in a new tab or press below button to generate a new token`;
    var errorBox = document.getElementById("errorBox");
    errorBox.style.visibility = "visible";
    return
  }

};

