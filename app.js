
/**
 * Module dependencies.
 */


var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , lessMiddleware = require('less-middleware');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + "/app/public/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(lessMiddleware({
		src: __dirname + "/app/less",
		dest: __dirname + "/app/public/css",
		prefix: "/css",
		// force: true,
		compress: true
	}));

app.use(express.static(__dirname + "/app/public"));

//conf socket fo heroku
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var config = require('./config.json');

require(__dirname+'/app/server/woofeque/woofeque')(app, io, config)
require(__dirname+'/app/server/router')(app, config);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
