firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  

  var redirect = function(url, method) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = method;
    form.action = url;
    form.submit();
    };

auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log(user);
        currentUserID = user.uid;
        currentEmail = user.email;

        addFriend(currentUserID,currentEmail);
        window.location = "/homepage.html"
    
        // mov them to thir homepage....
        //redirect("/homepage.html");
       
    } 
    else {
        // No user is signed in.
        console.log("no user is signed in");
    
      }

});
 
  


//signup
const registerform = document.querySelector("#register");

registerform.addEventListener("submit",(e)=>{
    e.preventDefault();

    // this grabs the user info
    const email = registerform["register-email"].value;
    const firstPass = registerform["pw1"].value; 
    const password = registerform["pw2"].value;

    console.log(firstPass);
    console.log(password);


    if(firstPass != password){
      console.log("passwords dont match");
      window.alert("Your Passwords did not match");

    }
    else{
      
      auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection("users").doc(cred.user.uid).collection("showlist").doc('testshow').set({
          title: "title",
          released: "released",
          genre: "genre",
          plot: "plot"
        })

    })
    
    }//else
})


//login

const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    //get user info
    const email = loginForm["sign-in-email"].value;
    const password = loginForm["pw-login"].value;

    auth.signInWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = "This Email and Password combination is incorrect";
    
        window.alert("Error : " + errorMessage);
    
        // ...
      });
})

function addFriend(user,userEmail){
  var db = firebase.firestore();
  db.collection("users").doc(user).set({
    name:userEmail
 
  })

}
