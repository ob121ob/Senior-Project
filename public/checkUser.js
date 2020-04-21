var currentUserID;
firebase.auth().onAuthStateChanged(function(user)
{
    if(user){
        console.log(user.uid);
        document.getElementById('email').textContent = "Welcome " + user.email + "!";
          currentUserID = user.uid;
          getShows();
          getFavorites();
          getDislikes();
    }
    else{
      console.log("imhere");
      redirect("/index.html");
    }
});

function logout(){
  if (firebase.auth().currentUser){
    firebase.auth().signOut();

  }
}
  document.getElementById('search-button').addEventListener('click', apiCall, false);

function apiCall(){

  var rand = Math.random()
  var apiKey = 'ac046712'
  if(rand > .5){
      apiKey = 'ac046712'
      console.log('Using Kayla\'s key')
  } else {
      console.log('Using My Key')
  }
  var title = '' //the variable that we use to get the textfield contents
  title += document.getElementById('searchbar').value //concatenate the string
  document.getElementById('searchbar').value = ""
  console.log('title: ' + title) //test output
  title = title.replace(' ', '-') //making it api friendly
  console.log('title w/o spaces: ' + title) 
  //var apiCall = 'https://www.omdbapi.com/?t=Jaws&apikey=ac046712' //should be modified a bit
  var apicall = 'https://www.omdbapi.com/?t=' //prefix
  apicall += title 
  apicall += '&apikey='
  apicall += apiKey
  //Kayla's key: ac046712

  console.log(apicall)
  //any spaces should be formatted with dashes
  var request = new XMLHttpRequest()
  request.open('GET', apicall, true)
  request.onload = function () {
      var data = JSON.parse(this.response)
      if(request.status >= 200 && request.status < 400 && data.hasOwnProperty('Title')) {
        var title = data.Title;
        var released = data.Released;
        var genre = data.Genre;
        var plot = data.Plot;
        addShow(title, released, genre, plot);
        addtoDatabase(title, released, genre, plot);
      } else {
          console.log('Error')
      }
  }
request.send()
}  


function getShows(){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection("showlist").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var title = doc.data().title
        var released = doc.data().released;
        var genre = doc.data().genre;
        var plot = doc.data().plot;
        var check = doc.data().check;
        if(doc.id != "testshow"){
          addShow(title, released, genre, plot, check);
        }
    });
});
}

function addShow(title, released, genre, plot, check){

  console.log("adding " + title);

  var li = document.createElement("li");

  //check for checked
  if(check==true){
    li.classList.toggle('checked');
  }
  
  var titleElement = document.createElement("b")
  titleElement.textContent = title;

  li.appendChild(titleElement);

  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Released: " + released));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Genre: " + genre));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Plot: " + plot));

  li.onclick = function(ev){
    ev.target.classList.toggle('checked');
    var check = ev.target.classList.contains("checked");
    updateDatabase(title, check);

  }

  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function(){
      deletefromDatabase(title);
      var div = this.parentElement;
      div.style.display = "none";
  }
  
}

function addtoDatabase(title, released, genre, plot){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).set({
  title: title,
  released: released,
  genre: genre,
  plot: plot,
  check: false
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

function deletefromDatabase(title){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).delete()
  .then(function() {
    console.log(title + " successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

function updateDatabase(title, check){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).update({
    check: check
    })
  .then(function() {
    console.log(title + " successfully updated!");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });

}

/////////////////////////////////////////////////////////////////////

//favorites
document.getElementById('fave-button').addEventListener('click', apiCall, false);

function apiCall(){

  var rand = Math.random()
  var apiKey = 'ac046712'
  if(rand > .5){
      apiKey = 'ac046712'
      console.log('Using Kayla\'s key')
  } else {
      console.log('Using My Key')
  }
  var title = '' //the variable that we use to get the textfield contents
  title += document.getElementById('searchbar').value //concatenate the string
  document.getElementById('searchbar').value = ""
  console.log('title: ' + title) //test output
  title = title.replace(' ', '-') //making it api friendly
  console.log('title w/o spaces: ' + title) 
  //var apiCall = 'https://www.omdbapi.com/?t=Jaws&apikey=ac046712' //should be modified a bit
  var apicall = 'https://www.omdbapi.com/?t=' //prefix
  apicall += title 
  apicall += '&apikey='
  apicall += apiKey
  //Kayla's key: ac046712

  console.log(apicall)
  //any spaces should be formatted with dashes
  var request = new XMLHttpRequest()
  request.open('GET', apicall, true)
  request.onload = function () {
      var data = JSON.parse(this.response)
      if(request.status >= 200 && request.status < 400 && data.hasOwnProperty('Title')) {
        var title = data.Title;
        var released = data.Released;
        var genre = data.Genre;
        var plot = data.Plot;
        addFaves(title, released, genre, plot);
        addtoFaveDatabase(title, released, genre, plot);
      } else {
          console.log('Error')
      }
  }
request.send()
}  


function getFavorites(){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection("favoritesList").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var title = doc.data().title
        var released = doc.data().released;
        var genre = doc.data().genre;
        var plot = doc.data().plot;
        var check = doc.data().check;
        if(doc.id != "testshow"){
          addFaves(title, released, genre, plot, check);
        }
    });
});
}

function addFaves(title, released, genre, plot, check){

  console.log("adding " + title);

  var li = document.createElement("li");

  //check for checked
  if(check==true){
    li.classList.toggle('checked');
  }
  
  var titleElement = document.createElement("b")
  titleElement.textContent = title;

  li.appendChild(titleElement);

  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Released: " + released));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Genre: " + genre));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Plot: " + plot));

  li.onclick = function(ev){
    ev.target.classList.toggle('checked');
    var check = ev.target.classList.contains("checked");
    updateDatabase(title, check);

  }

  document.getElementById("myFaves").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function(){
      deletefromFaveDatabase(title);
      var div = this.parentElement;
      div.style.display = "none";
  }
  
}

function addtoFaveDatabase(title, released, genre, plot){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('favoritesList')
  .doc(title).set({
  title: title,
  released: released,
  genre: genre,
  plot: plot,
  check: false
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

function deletefromFaveDatabase(title){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('favoritesList')
  .doc(title).delete()
  .then(function() {
    console.log(title + " successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

function updateFaveDatabase(title, check){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection('favoritesList')
  .doc(title).update({
    check: check
    })
  .then(function() {
    console.log(title + " successfully updated!");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });

}





/////////////////////////////////////////////////////////////////////

//dislikes
document.getElementById('dislike-button').addEventListener('click', apiCall, false);

function apiCall(){

  var rand = Math.random()
  var apiKey = 'ac046712'
  if(rand > .5){
      apiKey = 'ac046712'
      console.log('Using Kayla\'s key')
  } else {
      console.log('Using My Key')
  }
  var title = '' //the variable that we use to get the textfield contents
  title += document.getElementById('searchbar').value //concatenate the string
  document.getElementById('searchbar').value = ""
  console.log('title: ' + title) //test output
  title = title.replace(' ', '-') //making it api friendly
  console.log('title w/o spaces: ' + title) 
  //var apiCall = 'https://www.omdbapi.com/?t=Jaws&apikey=ac046712' //should be modified a bit
  var apicall = 'https://www.omdbapi.com/?t=' //prefix
  apicall += title 
  apicall += '&apikey='
  apicall += apiKey
  //Kayla's key: ac046712

  console.log(apicall)
  //any spaces should be formatted with dashes
  var request = new XMLHttpRequest()
  request.open('GET', apicall, true)
  request.onload = function () {
      var data = JSON.parse(this.response)
      if(request.status >= 200 && request.status < 400 && data.hasOwnProperty('Title')) {
        var title = data.Title;
        var released = data.Released;
        var genre = data.Genre;
        var plot = data.Plot;
        addDislikes(title, released, genre, plot);
        addtoDislikesDatabase(title, released, genre, plot);
      } else {
          console.log('Error')
      }
  }
request.send()
}  


function getDislikes(){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection("dislikesList").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var title = doc.data().title
        var released = doc.data().released;
        var genre = doc.data().genre;
        var plot = doc.data().plot;
        var check = doc.data().check;
        if(doc.id != "testshow"){
          addDislikes(title, released, genre, plot, check);
        }
    });
});
}

function addDislikes(title, released, genre, plot, check){

  console.log("adding " + title);

  var li = document.createElement("li");

  //check for checked
  if(check==true){
    li.classList.toggle('checked');
  }
  
  var titleElement = document.createElement("b")
  titleElement.textContent = title;

  li.appendChild(titleElement);

  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Released: " + released));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Genre: " + genre));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Plot: " + plot));

  li.onclick = function(ev){
    ev.target.classList.toggle('checked');
    var check = ev.target.classList.contains("checked");
    updateDislikesDatabase(title, check);

  }

  document.getElementById("myDislikes").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function(){
      deletefromDislikesDatabase(title);
      var div = this.parentElement;
      div.style.display = "none";
  }
  
}

function addtoDislikesDatabase(title, released, genre, plot){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('dislikesList')
  .doc(title).set({
  title: title,
  released: released,
  genre: genre,
  plot: plot,
  check: false
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

function deletefromDislikesDatabase(title){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('dislikesList')
  .doc(title).delete()
  .then(function() {
    console.log(title + " successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

function updateDislikesDatabase(title, check){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection('dislikesList')
  .doc(title).update({
    check: check
    })
  .then(function() {
    console.log(title + " successfully updated!");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });

}

