 window.onload = function() {
    loadConfig();
    closeButton = document.getElementById('close');
    closeButton.onclick = function() {location.href = "#close"}
}
function loadConfig() {
    var http = new XMLHttpRequest();
    http.open("GET", "/api/config", true); 
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            return createSocket(JSON.parse(http.responseText));
        }
    }
    http.send(null);
}

function createSocket(config) {
    var socket = io.connect(config.host);
        socket.on('init', function (data) {
        setConfName(data);
    });
    socket.on('chat', function (data) {
        pooq(data);
    });
}

function pooq(data) {
    var pooqArea = document.getElementById('pooqArea');
	var messagePar = document.createElement('p')
	messagePar.innerHTML = '<tag color="gray">'+data.from+': </tag>'+'<tag color="brown">'+data.message+'</tag>'; 
	pooqArea.appendChild(messagePar)
	pooqArea.scrollTop = pooqArea.scrollHeight;
}

function setConfName(data) {
	var header =document.getElementById('header')
	header.innerHTML = data.conference;
}



