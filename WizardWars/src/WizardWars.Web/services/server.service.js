module.exports = {

	start : function() {
		var express = require('express');
		var app = express();

		//create a server
		var server = require('http').Server(app);

		app.get('/',function(req, res) {
			res.sendFile(__dirname + '/client/index.html');
		});
		app.use('/client', express.static(__dirname + '/client'));

		server.listen(3000);
		console.log('server started on 3000.');

		return server;
	}
};

