<script>
        var simpleText = "hello_world";
        var finalSplitText = simpleText.split("_");
        var splitText = finalSplitText[0];

        window.onload = function() {
       //when the document is finished loading, replace everything
       //between the <a ...> </a> tags with the value of splitText
   document.getElementById("myLink").innerHTML=splitText;
} 

    </script>