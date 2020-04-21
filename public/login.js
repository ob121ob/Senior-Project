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
        // console.log("imhere1");
        // var user = firebase.auth().currentUser;
        // console.log(user);

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




// this will add to the ud
// function initApp() {
//     // Listening for auth state changes
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//           //create table for new user
//           if(user){
//             var db = firebase.firestore();
//             db.collection("users").doc(user.uid).collection('showlist')
//             .doc('testshow').set({
//               title: "title",
//               released: "released",
//               genre: "genre",
//               plot: "plot"
//             })
//             .then(function() {
//                 console.log("Document successfully written!");
//             })
//             .catch(function(error) {
//                 console.error("Error writing document: ", error);
//             });
//           }

//           var redirect = function(url, method) {
//           var form = document.createElement('form');
//           document.body.appendChild(form);
//           form.method = method;
//           form.action = url;
//           form.submit();
//           };
//           // location = '/temp.html';
//           console.log("im all the way down");
//           redirect('/homepage.html', 'post');
//       } 
      
//     });}
//     window.onload = function() {
//         initApp();
//       };





// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
  
//       document.getElementById("user_div").style.display = "block";
//       document.getElementById("login_div").style.display = "none";
  
//       var user = firebase.auth().currentUser;
  
//       if(user != null){
  
//         var email_id = user.email;
//         document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
//       }
  
//     } else {
//       // No user is signed in.
  
//       document.getElementById("user_div").style.display = "none";
//       document.getElementById("login_div").style.display = "block";
  
//     }
//   });
  
//   function login(){
  
//     var userEmail = document.getElementById("email_field").value;
//     var userPass = document.getElementById("password_field").value;
  
//     firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
  
//       window.alert("Error : " + errorMessage);
  
//       // ...
//     });
  
//   }
  
//   function logout(){
//     firebase.auth().signOut();
//   }

  
//   function signUp() {
//     var email = document.getElementById("email_field").value;
//     var password = document.getElementById("password_field").value;
   
//     // Sign in with email and password
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;

//    window.alert("Error : " + errorMessage);

//    // ...
//  });

// }

//   function initApp() {
//     // Listening for auth state changes
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//           //create table for new user
//           if(newUser){
//             var db = firebase.firestore();
//             db.collection("users").doc(user.uid).collection('showlist')
//             .doc('testshow').set({
//               title: "title",
//               released: "released",
//               genre: "genre",
//               plot: "plot"
//             })
//             .then(function() {
//                 console.log("Document successfully written!");
//             })
//             .catch(function(error) {
//                 console.error("Error writing document: ", error);
//             });
//           }

//           var redirect = function(url, method) {
//           var form = document.createElement('form');
//           document.body.appendChild(form);
//           form.method = method;
//           form.action = url;
//           form.submit();
//           };
//           // location = '/temp.html';
//           redirect('/profile', 'post');
//       } 
      
//     });}
//     window.onload = function() {
//         initApp();
//       };