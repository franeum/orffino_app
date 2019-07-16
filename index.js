const PORT = 8000;
const HOST = '127.0.0.1';

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var dgram = require('dgram');
var client = dgram.createSocket('udp4');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/scripts', express.static(__dirname + '/js'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    var message = Buffer.from(msg + ';');
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + HOST +':'+ PORT);
      //client.close();
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(slider_socket) {
  slider_socket.on('slider_message', function(msg) {
    console.log(msg)
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
