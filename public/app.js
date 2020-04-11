const forumList = document.querySelector("#Forum-list");
const form = document.querySelector("#add-Forum-List");
var setItem = "";

function renderForum(doc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    //let comment2 = document.createElement("span");

    li.setAttribute("data-id",doc.id);
    name.textContent = doc.data().name;

    //comment2.textContent = doc.data().comment2;
    
    li.appendChild(name);
    //li.appendChild(comment2);

    forumList.appendChild(li);
    
    

}

function renderList(doc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    //let comment2 = document.createElement("span");

    li.setAttribute("data-id",doc.id);
    name.textContent = doc.data().name;
    //comment2.textContent = doc.data().comment2;
    
    
    //li.appendChild(comment2);
    var setItem = name;
    //console.log(setItem);
    return setItem;

    
    

}

db.collection("MoviesForum").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {  
        renderForum(doc);
        
    
    })
    var matches = document.querySelectorAll("span");
        console.log(matches);
        for (var i = matches.length; i--; ) {
            console.log(matches[i]);

            var linker = matches[i].textContent;
            var a = document.createElement('a');
            a.href = "post.html?" + linker; // this works for appending to url
            matches[i].appendChild(a).appendChild(a.previousSibling);
        }
});





// db.collection("ForumNames").get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {  
//         var listitem1 = renderList(doc);
//         console.log(listitem1);
//     })
    
// });

// var span = document.getElementById("Forum-list");
// span.onclick = function(event){
//     console.log(renderList(listitem1));
    
// }



//save data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var newvari = form.topic.value;
    db.collection("MoviesForum").doc(newvari).set({
        name: form.topic.value
    })
    // db.collection('MoviesForum').add({
    //     name: form.topic.value
    // });
    form.topic.value = '';
});









