function noUUIDPopup() {
    document.querySelector('.popUpBoxHeader').innerHTML = "Oh no! <br>Looks like Login in failed😟"
    document.querySelector('.popUpBoxMain').innerHTML = `Sign in if you have not already.<br>
        If this continues please contact support in the discord`
    const errorBox = document.querySelector('.popupBox');
    errorBox.classList.add('show-error');
    setTimeout(function() {
        errorBox.classList.add('hide-error');
      }, 3000);
    
}