
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    console.log("Still login!")
    window.location.href="education.html";
  }
  else{
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

  function Signup(){

  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
    	var passwordc = document.getElementById('passwordc').value;

      if(email == '' && password == ''){
        window.alert("信息不能为空")
        window.location.href="signup.html";
      }
    else if (password == passwordc){
    window.alert("Successful!")
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

function Signup(){

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
  	var passwordc = document.getElementById('passwordc').value;

    if(email == '' && password == ''){
      window.alert("信息不能为空")
      window.location.href="signup.html";
    }
  else if (password == passwordc){
  window.alert("Successful!")
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

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (){

    window.location.href='index.html';
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error: " + errorMessage);

  });
}
