firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('rd-navbar-register').style.display = "none";
    document.getElementById('rd-navbar-login').style.display = "none";
    document.getElementById('register-button').style.display = "none";
    document.getElementById('login-button').style.display = "none";
    document.getElementById('navbarforuser').style.display="";
    document.getElementById('logout-button').style.display = "";
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

function Update(){

	var user = firebase.auth().currentUser
  if(!user){
    window.alert("Please login first!");
  }
  else{
  var jobtitle = document.getElementById('general-information-job-title').value;
  var email = document.getElementById('general-information-email').value;
  var jobtypeindex = document.getElementById('general-information-job-type');
  var jobtype = jobtypeindex.options[jobtypeindex.selectedIndex].text;
  var jobvalue = document.getElementById('general-information-job-type').value;
  var location=document.getElementById('general-information-location').value;
  var salary = document.getElementById('general-information-salary').value;
  var jobcategoryindex = document.getElementById('general-information-job-category');
  var jobcategory = jobcategoryindex.options[jobcategoryindex.selectedIndex].text;
  var jobcategoryvalue = document.getElementById('general-information-job-category').value;
  var requirement = document.getElementById('general-information-description').value;
  var companyname = document.getElementById('company-details-name').value;
  var companytag = document.getElementById('company-details-tagline').value;
  var companyweb = document.getElementById('company-details-website').value;
  writeUserData(user.uid,jobtitle,email,jobtype,jobvalue,location,salary,jobcategory,jobcategoryvalue,
    requirement,companyname,companytag,companyweb)
  window.alert("Succesful!!");
  }
}

function writeUserData(userId, jobtitle, contactemail, jobtype,jobvalue,location,salary,
  jobcategory,jobcategoryvalue,requirement,companyname,companytag,companyweb) {
    var a = firebase.database().ref('postnumber');
    a.once('value').then(function(snapshot){
      var postid = snapshot.val();
      var postData = {
        timestamp: Math.floor(Date.now() / 1000),
        postid: ++postid,
        jobtitle: jobtitle,
        contactemail: contactemail,
        jobtype: jobtype,
        jobvalue:jobvalue,
        jobcategoryvalue:jobcategoryvalue,
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
    updates['/postnumber'] = postid;
    return firebase.database().ref().update(updates);
    });
  }

function clearPosts(){
  var updates={};
  updates['/posts'] = null;
  updates['/user-posts'] = null;
  updates['/postnumber'] = 0;
  return firebase.database().ref().update(updates);
}

 function updateQuery(){
  	var a = firebase.database().ref('/posts');
  	a.on('value',function(snapshot){
  		snapshot.forEach((child) => {
    	console.log(child.val().jobtitle);
  		});
  	});
  }



  function writeJoblist(start,end){
    var a = firebase.database().ref('/posts');
      var local=[];
      //console.log(a.val())
      a.once('value').then(function(snapshot){
        snapshot.forEach((child) => {
          local.push(child.val())
          });
      console.log(local);
      local = local.reverse();
      for(i = start;i<end;i++){
        var currentime = Math.floor(Date.now() / 1000);
        var jobtitle = local[i].jobtitle;
        var companyname = local[i].companyname;
        var location = local[i].location;
        var jobtype = local[i].jobtype;
        var jobvalue = local[i].jobcategoryvalue;
        var jobtypevalue = local[i].jobvalue;
        var salary = local[i].salary;
        var timestamp = local[i].timestamp;
        var postid = local[i].postid;
        diff = currentime - timestamp;
        if(diff < 60){
          var actualtime = Math.floor(diff) + " seconds ago";
        }
        else if(diff>60 && diff<3600){
          var temp = Math.floor(diff/60);
          if(temp > 1){
            var actualtime = temp + " minutes ago";
          }
          else{
            var actualtime = temp + " minute ago";
          }
        }
        else if(diff > 3600 && diff<86400){
          var temp = Math.floor(diff/3600);
          if(temp>1){
            var actualtime = temp + " hours ago";
          }
          else{
            var actualtime = temp + " hour ago";
          }
        }
        else if(diff > 86400){
          var temp = Math.floor(diff/86400);
          if(temp>1){
            var actualtime = temp + " days ago";
          }
          else{
            var actualtime = "Yesterday";
          }
        }
        else{
          var actualtime = "Months ago";
        }

        var mystr1 = '<tr>';
        var mystr2 = `<td class="table-job-offers-date"><span>${actualtime}</span></td>`;
        var mystr3 = '<td class="table-job-offers-main">';
        var mystr4 = '<article class="company-light">';
        if (jobvalue == 1){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/canyin.png" width="80" alt=""/>';
      }else if (jobvalue == 2){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/yule.png" width="80" alt=""/>';
      }else if (jobvalue == 3){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/gongchang.png" width="80" alt=""/>';
      }else if (jobvalue == 4){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/it.png" width="80" alt=""/>';
      }else if (jobvalue == 5){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/market.png" width="80" alt=""/>';
      }else if (jobvalue == 6){
        var mystr5 = '<figure class="company-light-figure"><img class="company-light-image" src="images/accounting.png" width="80" alt=""/>';
      }
        var mystr6 = '</figure>';
        var mystr7 = '<div class="company-light-main">';
        var mystr8 = `<h5 class="company-light-title"><a href="job-details.html">${jobtitle}</a></h5>`;
        var mystr9 = `<p class="text-color-default">${companyname}</p>`;
        var mystr10 = '</div>';
        var mystr11 = '</article>';
        var mystr12 = '</td>';
        var mystr13 = '<td class="table-job-offers-meta">';
        var mystr14 =`<div class="object-inline"><span class="icon icon-sm text-primary mdi mdi-cash"></span><span>${salary}</span></div>`;
        var mystr15 ='</td>';
        var mystr16 ='<td class="table-job-offers-meta">';
        var mystr17 =`<div class="object-inline"><span class="icon icon-1 text-primary mdi mdi-map-marker"></span><span>${location}</span></div>`;
        var mystr18 ='</td>';
        if (jobtypevalue == 1){
        var mystr19 =`<td class="table-job-offers-badge"><span class="badge">${jobtype}</span></td>`;
      }else if (jobtypevalue == 2){
        var mystr19 =`<td class="table-job-offers-badge"><span class="badge badge-secondary">${jobtype}</span></td>`;
      }else{
        var mystr19 =`<td class="table-job-offers-badge"><span class="badge badge-blue-11">${jobtype}</span></td>`;
      }
        var mystr20 ='</tr>';
        var temp=mystr1+mystr2+mystr3+mystr4+mystr5+mystr6+mystr7+mystr8+
        mystr9+mystr10+mystr11+mystr12+mystr13+mystr14+mystr15+mystr16+mystr17+mystr18
        +mystr19+mystr20;
        document.getElementById("mytable").innerHTML += temp;
      }
      });
  }
