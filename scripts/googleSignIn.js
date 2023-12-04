

window.onload = initializeGoogleSignIn;

function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id:
      "11977394787-3upvfn4uf0lsc6i5119j1aa2gr3d6gis.apps.googleusercontent.com",
      callback: onSignIn,
      prompt_parent_id: "g-id-signin",
      scope: "profile",
  });

  const parentElement = document.getElementById("g-id-signin");

  // Check if the parent element is present
  if (parentElement) {
    // Render the Google Sign-In button
    google.accounts.id.renderButton(parentElement, { theme: "filled_blue" });
  } else {
    console.error(
      "Parent element not found. Make sure the container with id 'g-id-signin' exists."
    );
  }
}

async function onSignIn(response) {
  let result
  await fetch(`${url}/api/post/signin`, {
    method: "POST",
    body: JSON.stringify({
      "token": response.credential,
    })

  })    
  .then((response) => response.json())
  .then((data) => (result = data))
  
  localStorage.setItem("uuid", result)
  document.getElementById("g-id-signin").style.display = "none"
  
}



