var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var online = 0;

io.on('connection', function(socket){
	online = online + 1;
	console.log('Online Users: ' + online);
	socket.broadcast.emit('clientConnect', 'User Connected');

	socket.on('message', function(message){
		console.log('Recieved message: ' + message);
		socket.broadcast.emit('message', message);
	});

	socket.on('disconnect', function(){
		online = online - 1;
		console.log('Online Users: ' + online);
		socket.broadcast.emit('clientDC', 'User Disconnected');
	});
});


server.listen(8080);