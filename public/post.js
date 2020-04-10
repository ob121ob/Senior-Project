
const commentList = document.querySelector("#content-class");
const topicList = document.querySelector("#content1-class");
const form = document.querySelector("#add-comment-form");


var query = window.location.search.substring(1); // grab URL variable
// console.log(query);
var newquery = query.replace(/%20/g, "");

//console.log(newquery);


function renderForum(doc){
    let li = document.createElement("li");
    let comment = document.createElement("span");

    li.setAttribute("data-id",doc.id);
    comment.textContent = doc.data().comment;

    //comment2.textContent = doc.data().comment2;
    
    li.appendChild(comment);
    //li.appendChild(comment2);

    commentList.appendChild(li);

}

/////////////////////////////////////////////////////////
function renderTopic(doc){
    let li = document.createElement("ul");
    let name = document.createElement("h4");
    let description = document.createElement("p");

    li.setAttribute("data-id",doc.id);
    name.textContent = doc.data().name;
    description.textContent = doc.data().description;
    
    li.appendChild(name);
    li.appendChild(description);

    topicList.appendChild(li);
    //console.log(topicList);
}
////////////////////////////////////////////////////////////

var docRef = db.collection("ForumNames").doc(newquery);
docRef.get().then(function(doc) {
    if (doc.exists) {
        renderTopic(doc);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
/////////////////////////////////////////////////////////////
// get the data from a collection
db.collection("ForumNames").doc(newquery).collection("CommentsCollection").get()
.then(Snapshot => {
    Snapshot.docs.forEach(doc => {
        renderForum(doc);
    });
});


// save a comment
form.addEventListener('submit', (e) => {
    e.preventDefault();    
    db.collection("ForumNames").doc(newquery).collection("CommentsCollection").add({
        comment: form.comment.value
    });
    form.comment.value = '';
});