
const cafeList = document.querySelector('#cafe-list');
var friend;
var name1 = "";
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
    butt.textContent = "+";

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
      console.log(currentUserID);
      db.collection("users").doc(currentUserID).collection('friendsList')
      .doc(id).set({
      Username: name1
      }).then(function() {
        console.log("Document successfully written!");
        window.location=("/homepage.html");
      })
      
      alert( "you are now following "+ name1);
    })
}

// getting data
db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
    
});


