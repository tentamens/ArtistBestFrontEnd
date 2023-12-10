function noUUIDPopup() {
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>Looks like Login in failed😟"
    document.querySelector('.popUpBoxMain').innerHTML = `Sign in if you have not already.<br>
        If this continues please contact support in the discord`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 3000);
    
}

function noTokenPopup(content) {
    console.error(`This is the exit Code!!!:${content["exitCode"]}`)
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>Looks Something went wrong😟"
    document.querySelector('.popUpBoxMain').innerHTML = `Looks like there was an error with your token<br>
        try reloading the page if this continues contact discord support <br>
        ExitCode:${content["exitCode"]}`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 10000);
    
}

function successfullVote(songName){
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Yay! <br>Your Vote was successfull 🙌"
    document.querySelector('.popUpBoxMain').innerHTML = `This was the Song voted on: ${songName}<br>
    If that is wrong please report it in the discord`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 3500);
}

function fourOOneError(exitCode){
    console.error(`This is the exit Code!!!:${exitCode}`)
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>Looks Something went wrong😟"
    document.querySelector('.popUpBoxMain').innerHTML = `Looks like there was an error with your login<br>
        if this continues please contact support in discord<br>
        ExitCode:${exitCode}`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 5000);
}

function noMoreVotes(){
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>You ran out of votes😟"
    document.querySelector('.popUpBoxMain').innerHTML = `No worries tho!<br>
        come back tomorrow and get another vote for this artist`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 4000);
}

function searchNotFound(exitCode){
    console.error(`This is the exit Code!!!:${exitCode}`)
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>We couldn't find that😟"
    document.querySelector('.popUpBoxMain').innerHTML = `Make sure that song is on spotify<br>
        if it is and you think something went from please report it in discord!<br>
        exitCode:${exitCode}`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 7000);
}

function somethingWentWrongOnOurEnd(exitCode){
    console.error(`This is the exit Code!!!:${exitCode}`)
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.remove('show-error', 'hide-error');
    void errorBox.offsetWidth;
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>Something not right😥"
    document.querySelector('.popUpBoxMain').innerHTML = `It's most likely on our end🫠<br>
        we will try to get everything working as soon as possible!<br>
        exitCode:${exitCode}`
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 4000);
}