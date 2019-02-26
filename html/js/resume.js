
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('rd-navbar-register').style.display = "none";
    document.getElementById('rd-navbar-login').style.display = "none";
    document.getElementById('register-button').style.display = "none";
    document.getElementById('login-button').style.display = "none";
    document.getElementById('logout-button').style.display = "block";
    //document.getElementById('login-alert').style.display = "none";
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
    //document.getElementById('login-alert').style.display = "block";
        //document.getElementById('navbarforcan').style.display = "none";
      //  document.getElementById('navbarforemp').style.display = "none";
  }
  else{
  	console.log("Still login!")
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


function updateResume(){

var user = firebase.auth().currentUser
if (!user){
  window.alert("Please Login First! 请先登录!");
}
else{
var name = document.getElementById('name').value;

var sexindex = document.getElementById('sex')
var sex = sexindex.options[sexindex.selectedIndex].text;
var sexvalue = document.getElementById('sex').value;

var reemail = document.getElementById('reemail').value;
var location = document.getElementById('location').value;
var rate = document.getElementById('rate').value;
var skills = document.getElementById('skills').value;

var jobtypeindex = document.getElementById('jobtype')
var jobtype = jobtypeindex.options[jobtypeindex.selectedIndex].text;
var jobtypevalue = document.getElementById('jobtype').value;

writeUserData(user.uid,name,sex,sexvalue,reemail,location,rate,jobtype,skills
,jobtypevalue)


window.alert("Succesful!!");

}
}

function writeUserData(userId,name,sex,sexvalue,reemail,location,rate, skills,jobtype,jobtypevalue) {
    var a = firebase.database().ref('userpostnumber');
    a.once('value').then(function(snapshot){
    var postid = snapshot.val();
    var postData = {
        postid:++postid,
        name:name,
        sex:sex,
        sexvalue:sexvalue,
        reemail:reemail,
        location:location,
        rate:rate,
        skills:skills,
        jobtype:jobtype,
        jobtypevalue:jobtypevalue,
    };
    var updates={};
    updates['/user-posts/' + userId ] = postData;
    updates['/userpostnumber'] = postid;
    return firebase.database().ref().update(updates);
    });
  }
