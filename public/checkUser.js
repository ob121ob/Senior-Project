
firebase.auth().onAuthStateChanged(function(user)
{
    if(user){
        console.log(user);
    }
    else{
      console.log("imhere");
      window.location.href = "/index.html";
    }
});

function logout(){
  firebase.auth().signOut();
}
