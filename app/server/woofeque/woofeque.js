module.exports = function(app, io, config) {
    
    
    var xmppConfig = config.xmpp;
    var xmpp = require('simple-xmpp');

    io.sockets.on('connection', function (socket) {
        socket.emit('init', {from: "Woofeque", time: "0", message: "Hello!", conference: xmppConfig.conference});
    });
    var chatMessage = "";

    var sendMessage  = function () {
        io.sockets.emit('chat', chatMessage);
    };

    xmpp.on('online', function() {
        xmpp.join(xmppConfig.conference+'/'+xmppConfig.botNick);
        console.log('Yes, I\'m connected!');
    });

    xmpp.on('groupchat', function(conference, from, message, stamp) {
        console.log('%s says %s on %s', from, message, conference);
        chatMessage = {from: from, time: stamp, message: message}
        if(from != xmppConfig.botNick)
            sendMessage();
    });

    xmpp.on('error', function(err) {
        console.error(err);
    });

    xmpp.connect({
        jid                 : xmppConfig.jid,
        password            : xmppConfig.password,
        host                : xmppConfig.host,
        port                : xmppConfig.port
    });
}