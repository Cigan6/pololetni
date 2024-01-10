var version = new Date().getTime();

$(document).ready(function() {
    $("#postForm").submit(function() {
        $.getJSON('./stiznosti.json?v=' + version, function(data) {
            var postKeys = Object.keys(data.stiznosti);
            if (postKeys.length != 0)
            {
              var lastKey = postKeys[postKeys.length - 1];
              var lastPost = lastKey.substring(8);
              console.log (lastPost);
              var lastPostNum = parseInt(lastPost, 10);
              nextPost = lastPostNum + 1; 
            }
            else {
              nextPost = 0;
            }
            theRest();
          });
    });
    
    function theRest() {
      var data = {
          "stiznost": {
            "name": "",
            "text": ""
          }
      };
    
      var formName = document.getElementById('formName').value;
      var formText = document.getElementById('formText').value;
    
      data.stiznost.name = formName;
      data.stiznost.text = formText;
    
      var oldKeyName = "stiznost";
      var newKeyName = `stiznost${nextPost}`;
    
      data[newKeyName] = data[oldKeyName];
    
      delete data[oldKeyName];
    
    
      $.ajax({
          type: "POST",
          url: "stiznost.php",
          data: { jsonData: JSON.stringify(data) },
          success: function(response) {
              console.log(response);
          },
          error: function(error) {
              console.error(error);
          }
      });
    };
});
