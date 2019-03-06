
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

function Update(){

	var user = firebase.auth().currentUser;
  if(!user){
    window.alert("Please login first!");
  }
  else{
    var companyname = document.getElementById('general-information-companyname').value;

  var email = document.getElementById('general-information-email').value;
  var location=document.getElementById('general-information-location').value;

  var jobtitle = document.getElementById('general-information-job-title').value;

  var jobtypeindex = document.getElementById('general-information-job-type');
  var jobtype = jobtypeindex.options[jobtypeindex.selectedIndex].text;
  var jobvalue = document.getElementById('general-information-job-type').value;
  var jobcategoryindex = document.getElementById('general-information-job-category');
  var jobcategory = jobcategoryindex.options[jobcategoryindex.selectedIndex].text;
  var jobcategoryvalue = document.getElementById('general-information-job-category').value;
  var salary = document.getElementById('general-information-salary').value;
var companyweb = document.getElementById('website').value;
  var requirement = document.getElementById('general-information-requirement').value;
    var description = document.getElementById('general-information-description').value;

  writeUserData(user.uid,companyname,email,location,jobtitle,jobtype,jobvalue,jobcategory,jobcategoryvalue,
    salary,companyweb,requirement,description)
  window.alert("Succesful!!");
  }
}

function writeUserData(userId,companyname, email, location,jobtitle, jobtype,jobvalue,
  jobcategory,jobcategoryvalue,salary,companyweb,requirement,description) {
    var a = firebase.database().ref('company-posts-number');
    a.once('value').then(function(snapshot){
      var postid = snapshot.val();
      var postData = {
        postid: ++postid,
        companyname:companyname,
        email: email,
        location: location,
        jobtitle: jobtitle,
        jobtype: jobtype,
        jobvalue:jobvalue,
        jobcategoryvalue:jobcategoryvalue,
        jobcategory: jobcategory,
        salary: salary,
        companyweb:companyweb,
        requirement: requirement,
        description:description,
        timestamp:Math.floor(Date.now() / 1000);
    };
    var updates={};
    updates['/posts/' + userId ] = postData;
    updates['/company-posts-number'] = postid;
    return firebase.database().ref().update(updates);
    });
  }
