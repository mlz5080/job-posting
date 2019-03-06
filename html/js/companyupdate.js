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
  var cname = document.getElementById('cname').value;
  var location = document.getElementById('location').value;
  var categoryindex = document.getElementById('general-information-job-category');
  var companycategory = categoryindex.options[categoryindex.selectedIndex].text;
  var website = document.getElementById('website').value;
  var description = document.getElementById('description').value;

  writeUserData(user.uid,cname,location,companycategory,website,description)
  window.alert("Succesful!!");
  //window.location.href="index.html"
}

function writeUserData(userId,cname,location,category,website,description)
{
    var a = firebase.database().ref('companynumber');
    a.once('value').then(function(snapshot){
      var postid = snapshot.val();
      var postData = {
        postid: ++postid,
        cname:cname,
        location:location,
        category:category,
        website:website,
        description:description,
    };
    var updates={};
    updates['/company-info/' + userId ] = postData;
    updates['/companynumber'] = postid;
    return firebase.database().ref().update(updates);
    });
}
