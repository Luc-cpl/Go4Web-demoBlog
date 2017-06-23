    ws.onopen = function() {
        var request = JSON.stringify({
            request: [
                {
                    method:"find",
                    collection:"posts",
                    values:{
                        titulo: "",
                        texto: "",
                        _id: ""
                    }              
                },
            ],
            loopRequest: true
        });
        ws.send(request)
    };

    ws.onmessage = function (e) {
        var json = JSON.parse(e.data);
        var container = $("#posts");
        var htmlStr = "";
        json.forEach(function(element) {
            element.forEach(function(e){
                var req = `[{"method":"readID","collection":"posts","values":{"titulo":"","texto":"","tags":"","_id":""},"id":"` + e._id + `"}]`;
                var href = `href='/update/request:` + req + `'`;
                htmlStr = e.titulo+`<a `+ href + `>Update</a><br>` + htmlStr;
            }, this);
        }, this);
        container.html(htmlStr);
    }

    ws.onclose = function () {
        var container = $("#posts");
        container.append("<p>Socket closed</p>");
    }


