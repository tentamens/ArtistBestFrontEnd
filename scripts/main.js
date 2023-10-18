const searchBar = document.getElementById('searchBar');
let searchButton = document.getElementById('searchButton');
var searchedUpArtist = null;


var token = null


getToken()

async function getToken() {

    const url = 'https://app.artistsbest.io/api/get/token';
    await fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => token = data)
        .catch(error => console.error(error));
    localStorage.setItem('token', token);
};


async function search() {
    var searchBox = document.getElementById("searchBox");
    var searchTerm = searchBox.value;
    let result = null
    console.log("hello world")



    await fetch('https://app.artistsbest.io/api/load/searchArtist', {
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

    window.location.href = "searchedArtist.html?search=" + encodeURIComponent(searchQuery);

};

