var app = require('express')();
 
 var __dirname = "./public/"
 
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile( __dirname +'index.html');
 });
 
 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });
 
 var port = process.env.PORT || 5000;
 var server = app.listen(port, function() {
   console.log("Listening on " + port);
 });
 

 var io = require('socket.io').listen(server);
 io.on('connection', function(socket){
    console.log('New Socket Client !'); 
    socket.on('getRoomID',function(){
    	var NewRoomID = returnRandomRoomID();
    	socket.join(NewRoomID);
    	console.log("Server room "+NewRoomID);
    	socket.emit('roomID', NewRoomID);
    });
    socket.on('newPlayer', function(data){
    	socket.join(data.roomID);
    	socket.broadcast.to(data.roomID).emit('playerList', data);
    	//io.emit('playerList', data);
    	console.log("Player join "+ data.roomID);
    	console.log(socket.room);
    });
 });

 function returnRandomRoomID(){
 	return s4();
 }

 function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}



//