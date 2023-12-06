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