
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

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    

    li.appendChild(name);
    cafeList.appendChild(li);

   
}

// getting data
db.collection('users').doc(currentUserID).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
    
});