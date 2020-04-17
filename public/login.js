firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
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


auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log(user);
    
        var user = firebase.auth().currentUser;
        // mov them to thir homepage....
    
    
    
    } 
    else {
        // No user is signed in.
        console.log("no user is signed in");
    
      }

})
 
  


//signup
const registerform = document.querySelector("#register");

registerform.addEventListener("submit",(e)=>{
    e.preventDefault();

    // this grabs the user info
    const email = registerform["register-email"].value;
    const password = registerform["pw2"].value;

    //console.log(email, password);

    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred.user);
    })
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

function initApp() {
    // Listening for auth state changes
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          //create table for new user
          if(user){
            var db = firebase.firestore();
            db.collection("users").doc(user.uid).collection('showlist')
            .doc('testshow').set({
              title: "title",
              released: "released",
              genre: "genre",
              plot: "plot"
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
          }

          var redirect = function(url, method) {
          var form = document.createElement('form');
          document.body.appendChild(form);
          form.method = method;
          form.action = url;
          form.submit();
          };
          // location = '/temp.html';
          redirect('/homepage.html', 'post');
      } 
      
    });}
    window.onload = function() {
        initApp();
      };





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