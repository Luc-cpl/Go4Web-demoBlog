"use strict";function sendPost(){var t=document.getElementById("titulo").value,e=document.getElementById("tags").value,o=tinymce.get("text").getContent(),n=JSON.stringify({request:[{method:"update",collection:"posts",values:{titulo:t,tags:e,texto:makeJsonStr(o)},id:docId}]});if(1==auth){var i=!0;titulos.forEach(function(e){t==e&&Originaltitulo!=e&&(alert("titulo já existe"),i=!1)},this),1==i&&ws.send(n)}return!1}function makeJsonStr(t){return t=t.replace(/"/g,'\\"'),t=t.replace(/\n/g,"")}var titulos=[],auth=!1,docId,Originaltitulo;$(document).ready(function(){var t=document.getElementById("data").innerHTML,e=JSON.parse(t);document.getElementById("data").outerHTML="",docId=e[0][0]._id,$("#titulo").val(e[0][0].titulo),Originaltitulo=e[0][0].titulo,$("#tags").val(e[0][0].tags),tinymce.activeEditor.setContent(e[0][0].texto)}),ws.onopen=function(){var t=JSON.stringify({request:[{method:"find",collection:"posts",values:{titulo:""}}],loopRequest:!0});ws.send(t)},ws.onmessage=function(t){var e=JSON.parse(t.data);if(1==e[0].update)window.location.replace("/");else if(e[0].err)alert(e[0].err);else{auth=!0;var o=[];e.forEach(function(t){t.forEach(function(t){o.push(t.titulo)},this)},this),titulos=o}},ws.onclose=function(){$("#new").append("<p>Socket closed</p>")};