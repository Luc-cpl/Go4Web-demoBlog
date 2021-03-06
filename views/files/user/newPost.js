var titulos = [];
var auth = false;

ws.onopen = function() {
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

ws.onmessage = function (e) {
    var json = JSON.parse(e.data);
    if(json[0].create == 1){
        window.location.replace("/");
    }else if(json[0].err){
        alert(json[0].err);
    }else{
        var newT = [];
        auth = true;
        json.forEach(function(element) {
            element.forEach(function(e){
                newT.push(e.titulo);
            }, this);
        }, this);
        titulos = newT;
    }
}
ws.onclose = function () {
    var container = $("#new");
    container.append("<p>Socket closed</p>");
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
    
    if (auth == true){
        var send = true;
        titulos.forEach(function(e){
            if(titulo == e){
                alert("titulo já existe");
                send = false;
            }
        }, this);
        if (send == true){
            ws.send(post);
        }
    }

    return false;
}

 function makeJsonStr(post){
    post = post.replace(/"/g, `\\"`);
    post = post.replace(/\n/g, "");
     
    return post;
  };