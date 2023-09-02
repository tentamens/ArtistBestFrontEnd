
window.onload = async function () {
  console.log("hello world")
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get('search');
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
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))

  console.log(token)
  localStorage.setItem('token', token);
  window.location.reload();
  
}
