var currentUser;
firebase.auth().onAuthStateChanged(function(user)
{
    if(user){
        console.log(user.uid);
        currentUser = user.uid;

    }
    else{
      console.log("imhere");
      window.location.href = "/index.html";
    }
});

function logout(){
  if (firebase.auth().currentUser){
    firebase.auth().signOut();

  }

}
