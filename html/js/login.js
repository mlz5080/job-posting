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

function Update(){
	var user = firebase.auth().currentUser
	var jobtitle = document.getElementById('general-information-job-title').value;
	var email = document.getElementById('general-information-email').value;
	var jobtypeindex = document.getElementById('general-information-job-type');
	var jobtype = jobtypeindex.options[jobtypeindex.selectedIndex].text;
	var location=document.getElementById('general-information-location').value;
	var salary = document.getElementById('general-information-salary').value;
	var jobcategoryindex = document.getElementById('general-information-job-category');
	var jobcategory = jobcategoryindex.options[jobcategoryindex.selectedIndex].text;
	var requirement = document.getElementById('general-information-description').value;
	var companyname = document.getElementById('company-details-name').value;
	var companytag = document.getElementById('company-details-tagline').value;
	var companyweb = document.getElementById('company-details-website').value;
	writeUserData(user.uid,jobtitle,email,jobtype,location,salary,jobcategory,requirement,companyname,companytag,companyweb);
}




function writeUserData(userId, jobtitle, contactemail, jobtype,location,salary,jobcategory,requirement,companyname,companytag,companyweb) {
    var postData = {
        jobtitle: jobtitle,
        contactemail: contactemail,
        jobtype: jobtype,
        location: location,
        salary: salary,
        jobcategory: jobcategory,
        requirement: requirement,
        companyname: companyname,
        companytag: companytag,
        companyweb: companyweb,
    };
    var newPostKey = firebase.database().ref().child('users-posts').push().key;
    var updates={};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + userId + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
  }
