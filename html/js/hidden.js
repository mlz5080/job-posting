firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('rd-navbar-register').style.display = "none";
    document.getElementById('rd-navbar-login').style.display = "none";
    document.getElementById('register-button').style.display = "none";
    document.getElementById('login-button').style.display = "none";
    document.getElementById('navbarforuser').style.display="";
    document.getElementById('logout-button').style.display = "";
    document.getElementById('login-alert').style.display="none"
    console.log("Still login!")
    //document.getElementById('login-alert').style.display = "none";
  }
  else{
    document.getElementById('rd-navbar-register').style.display = "";
    document.getElementById('rd-navbar-login').style.display = "";
    document.getElementById('register-button').style.display = "";
    document.getElementById('login-button').style.display = "";
    document.getElementById('navbarforuser').style.display="none";
    document.getElementById('logout-button').style.display = "none";
    document.getElementById('login-alert').style.display=""

    //document.getElementById('login-alert').style.display = "block";
  	console.log("Not login!")
  }
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
