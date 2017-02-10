var express = require('express');
var app = express();

//create a server
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use('/',express.static(__dirname));

//start serving
serv.listen(3000);
console.log("Server started.");