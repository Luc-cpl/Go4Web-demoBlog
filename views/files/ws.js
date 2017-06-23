var ws = initWS();
function initWS() {
    var socket = new WebSocket("ws://localhost:8080/ws");
    return socket;
}