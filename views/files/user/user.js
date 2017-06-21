var  ws = initWS();

function initWS() {
    var socket = new WebSocket("ws://localhost:8080/ws");
        
    socket.onopen = function() {
        var request = JSON.stringify({
            request: [
                {
                    method:"find",
                    collection:"posts",
                    values:{
                        titulo: ""
                    }              
                },
            ],
            loopRequest: true
        });
        ws.send(request)
    };

    socket.onmessage = function (e) {
        var json = JSON.parse(e.data);
        var container = $("#posts");
        json.forEach(function(element) {
            element.forEach(function(e){
                container.html("</br>"+e.titulo);
            }, this);
        }, this);
    }

    socket.onclose = function () {
        var container = $("#new");
        container.append("<p>Socket closed</p>");
    }
    return socket;
}