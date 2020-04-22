
const cafeList = document.querySelector('#cafe-list');
var friend;
auth.onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in.
      console.log(user);
      currentUserID = user.uid;
      currentEmail = user.email;

      
     
  
      // mov them to thir homepage....
      //redirect("/homepage.html");
     
  } 
  else {
      // No user is signed in.
      console.log("no user is signed in");
      window.location = "/index.html"
  
    }

});
// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let butt = document.createElement("div");

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    butt.textContent = "add";

    li.appendChild(name);
    li.appendChild(butt);
    cafeList.appendChild(li);

    butt.addEventListener("click",(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute("data-id");
      console.log(id);
      console.log(name);
      name1 = name.textContent;
      console.log(name1);
      db.collection("users").doc(currentUserID).collection('friendsList')
      .doc(id).set({
      Username: name1
      })
      window.location=("/homepage.html");
      alert( "you are now following "+ name1);
      

    })
}

// getting data
db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
    
});

// function addFriend(){
//     var db = firebase.firestore();
//     db.collection("users").doc(currentUserID).collection('friendsList')
//     .doc(friendName).set({
//     Username: "friendName"
//     })
//     .then(function() {
//       console.log("Document successfully written!");
//     })
//     .catch(function(error) {
//       console.error("Error writing document: ", error);
//     });
//   }


// // get the data from a collection
// db.collection("users").get().then((snapshot)=>{
//   console.log(snapshot.docs);
// });

// var docRef = db.collection("users");

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

// function addFriend(){
//  db.collection("users").doc(user.uid).add({
//    name:"jim"

//  })
// console.log("im here")
// }
