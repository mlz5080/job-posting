firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('rd-navbar-register').style.display = "none";
    document.getElementById('rd-navbar-login').style.display = "none";
    document.getElementById('register-button').style.display = "none";
    document.getElementById('login-button').style.display = "none";
    document.getElementById('logout-button').style.display = "block";
    //document.getElementById('navbarforcan').style.display = "display";
    //document.getElementById('navbarforemp').style.display = "display";
  }
  else{
  	console.log("Not login!")
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    document.getElementById('rd-navbar-register').style.display = "block";
    document.getElementById('rd-navbar-login').style.display = "block";
    document.getElementById('register-button').style.display = "block";
    document.getElementById('login-button').style.display = "block";
    document.getElementById('logout-button').style.display = "none";
        //document.getElementById('navbarforcan').style.display = "none";
      //  document.getElementById('navbarforemp').style.display = "none";
  }
  else{
  	console.log("Still login!")
  }
});

function Signup()
{

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
  	var passwordc = document.getElementById('passwordc').value;

  if (password == passwordc){
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	window.alert("Error: " + errorMessage);
	});
	}else{
  window.alert("两次密码输入不一致，请再次确认");
}
}

function Login(){

	var email = document.getElementById('rd-navbar-login-email').value;
	var password = document.getElementById('rd-navbar-login-password').value;

	firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
		window.alert("Sign-in successfully!");
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	window.alert("Error: " + errorMessage);

	});
}

function Logout(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  alert("Sign out successful");
	}).catch(function(error) {
	  // An error happened.
	  alert("Error signning out, please contact your web admin");
	});


}

function phoneLogin(){

  var phoneNumber = document.getElementById('phone').value;
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });


}
