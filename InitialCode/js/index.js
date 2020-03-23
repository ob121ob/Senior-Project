// const firebaseConfig = {
//     apiKey: "AIzaSyAXwE4VY1yH278r_yzaPEftxzTSsL9JGl4",
//     authDomain: "sceneitall-571b3.firebaseapp.com",
//     databaseURL: "https://sceneitall-571b3.firebaseio.com",
//     projectId: "sceneitall-571b3",
//     storageBucket: "sceneitall-571b3.appspot.com",
//     messagingSenderId: "955672304924",
//     appId: "1:955672304924:web:7b2c384ffd32b784e9aed9",
//     measurementId: "G-VLP2JES1TF"
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();




//   $("#login_button").click(function(){
//       var email = $("#email").val();
//       var password = $("#password").val();

//       if(email !="" && password != "")
//       {
//           var result = firebase.auth().signInWithEmailAndPassword(email, password);

//           result.catch(function(error)
//           {
//               var errorCode = error.code;
//               var errorMessage = error.message;

//               console.log(errorCode);
//               window.alert("Message"+ errorMessage);

//           })

//       }
//       else{
//           window.alert(" You must fill out all fields in order to submit");
//       }



//   })