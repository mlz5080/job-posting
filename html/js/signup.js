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

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	window.alert("Error: " + errorMessage);


  firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
window.alert("Succesful!!");
window.location.href='index.html';
  });
});
}
  else{
  window.alert("两次密码输入不一致，请再次确认");
  }


}


function Update(){

	var user = firebase.auth().currentUser;



  var about = document.getElementById('about').value;
  var schoolname = document.getElementById('school-name').value;
  var profession = document.getElementById('profession').value;
  var period = document.getElementById('notes').value;
  var employer = document.getElementById('employer').value;
  var exjobtitle = document.getElementById('ex-job-title').value;
  var experiod = document.getElementById('ex-period').value;
  var exnotes = document.getElementById('ex-notes').value;

  writeUserData(user.uid,about,schoolname,profession,period,employer,
    exjobtitle,experiod,exnotes)
  window.alert("Succesful!!");
  window.location.href="index.html";

}

function writeUserData(userId,about,schoolname,profession,period,employer,
  exjobtitle,experiod,exnotes) {
    var a = firebase.database().ref('users-info');
    a.once('value').then(function(snapshot){
      var postid = snapshot.val();
      var postData = {
        postid: ++postid,
        about:about,
        schoolname:schoolname,
        profession:profession,
        period:period,
        employer:employer,
        exjobtitle:exjobtitle,
        experiod:experiod,
        exnote:exnote,
    };
    var newPostKey = firebase.database().ref().child('users-info').push().key;
    var updates={};
    updates['/user-info/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
    });
  }
