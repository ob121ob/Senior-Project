const forumList = document.querySelector("#Forum-list");
const form = document.querySelector("#add-Forum-List");
var setItem = "";
/// this will get the forum name
var query = window.location.search.substring(1); // grab URL variable
// console.log(query);
var newquery = query.replace(/%20/g, " ");

console.log(newquery);
localStorage.setItem("forumName",newquery);
// forum name




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

db.collection(newquery).get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {  
        renderForum(doc);
        
    
    })
    //this will add the variable to the url
    var matches = document.querySelectorAll("span");
        //console.log(matches);
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
    // this has to be done this way to prevent the randon generated num
    db.collection(newquery).doc(newvari).set({
        name: form.topic.value
    })
    // db.collection('MoviesForum').add({
    //     name: form.topic.value
    // });
    form.topic.value = '';
});









