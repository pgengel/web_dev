var StaticServer = require('static-server');

var server = new StaticServer({
	rootPath: './',
	port: 3001
});

server.start(function() {
	console.log('server has started on port ' + server.port);
});

