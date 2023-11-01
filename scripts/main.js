const searchBar = document.getElementById("searchBar");
let searchButton = document.getElementById("searchButton");
var searchedUpArtist = null;

let url = "http://localhost:8000";

var token = null;

getToken();

async function getToken() {
  const Theurl = `${url}/api/get/token`;
  await fetch(Theurl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => (token = data))
    .catch((error) => console.error(error));
  localStorage.setItem("token", token);
  localStorage.setItem("expireTime", new Date().getTime() / 1000 + 3600);
}

async function search() {
  var searchBox = document.getElementById("searchBox");
  var searchTerm = searchBox.value;
  let result = null;

  if (searchTerm == "") {
    console.log("no terms")
    return;
  }
  const expireTime = localStorage.getItem('expireTime');
  if (expireTime < new Date().getTime() / 1000) {
    console.log("the token expired so it should be getting regenerated")
    await generateToken();
    await search()
    return
  };

  await fetch(`${url}/api/load/searchArtist`, {
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

  let searchQuery = result;

  window.location.href =
    "searchedArtist.html?search=" + encodeURIComponent(searchQuery);
}
