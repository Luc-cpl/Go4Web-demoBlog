var  ws = initWS();

function initWS() {
    var socket = new WebSocket("ws://localhost:8080/ws");
        
    socket.onopen = function() {
    };

    socket.onmessage = function (e) {
        var json = JSON.parse(e.data);
        if(json[0].create == 1){
            window.location.replace("/");
        }else{
            alert(json[0].err);
        }
    }
    socket.onclose = function () {
        var container = $("#new");
        container.append("<p>Socket closed</p>");
    }
    return socket;
}



function sendPost() {
    var titulo = document.getElementById("titulo").value;
    var tags = document.getElementById("tags").value;
    var text = tinymce.get('text').getContent();
    var post = JSON.stringify({
        request: [
            {
                method:"createDoc",
                collection:"posts",
                values:{
                    titulo: titulo,
                    tags: tags,
                    texto: makeJsonStr(text)
                }                    
            }
        ]
    });
    ws.send(post);
    return false;
}

 function makeJsonStr(post){
    // replace brackets with entities
    post = post.replace(/<|>/g, function(chr){
        return chr == "<" ? "&lt;" : "&gt;";
    });
     // replace newline char with nothing
    post = post.replace(/\n/g, "");
     
    return post;
   
  };