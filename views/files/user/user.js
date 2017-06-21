var  ws = initWS();

function initWS() {
    var socket = new WebSocket("ws://localhost:8080/ws");
        
    socket.onopen = function() {
    };

    socket.onmessage = function (e) {
        var container = $("#new");
        container.html(e.data);
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
    ws.send(
        JSON.stringify({
            request: [
                {
                    method:"createDoc",
                    collection:"posts",
                    values:{
                        titulo: titulo,
                        tags: tags,
                        texto: text
                    }                    
                }
            ]
        })
    )
    return false;
}