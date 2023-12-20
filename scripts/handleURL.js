let onWhichClient = "dev" // or server


function getRedirect(searchQuery){
    if (onWhichClient === "server") {
        let query = customEncode(searchQuery);
        return '/searchedartist/' + encodeURIComponent(query) 
    }
    return "searchedartist.html?search=" + encodeURIComponent(searchQuery);
};

function GetSearchQuery() {
    if (onWhichClient === "server") {
        var fullUrl = window.location.pathname;
        result = customDecode(fullUrl.split('/')[2])
        return result;
    }

    var urlParams = new URLSearchParams(window.location.search);
    
    return urlParams.get("search");
}

function customEncode(query) {
    return query.replace(/ /g, '+'); // Replace spaces with '+'
}

function customDecode(encodedQuery) {
    return encodedQuery.replace(/\+/g, ' '); // Replace '+' with spaces
}