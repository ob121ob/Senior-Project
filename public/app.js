const forumList = document.querySelector("#Forum-list");

function renderForum(doc){
    let li = document.createElement("li");
    let comment = document.createElement("span");
    let comment2 = document.createElement("span");

    li.setAttribute("data-id",doc.id);
    comment.textContent = doc.data().comment;
    comment2.textContent = doc.data().comment2;
    
    li.appendChild(comment);
    li.appendChild(comment2);

    forumList.appendChild(li);
}

db.collection("Forums").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        renderForum(doc);
    })
})










// var docRef = db.collection("Forums").doc("Movie theories");

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