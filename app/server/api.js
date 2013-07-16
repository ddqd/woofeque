module.exports = function(app, config) {

    var config = config.websocket;

    app.get('/api/config', function(req, res){
        res.send(config);
    });
}