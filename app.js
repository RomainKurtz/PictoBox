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
        socket.custom = {type : 'appHost'};
    	console.log("Server room "+NewRoomID);
    	socket.emit('roomID', NewRoomID);
    });
    socket.on('newPlayer', function(data){
    	socket.join(data.roomID);
        socket.custom = {type : 'appPlayer', playerName : data.playerName};
        var playerList = getPlayersNameArrayByRoomName(data.roomID);
        
        socket.emit('connectionRespond', {respond : true});
    	socket.broadcast.to(data.roomID).emit('playerList', playerList);
    	//io.emit('playerList', data);
    	console.log("Player join "+ data.roomID);
    	//var ttt = getSocketArrayByRoomName(data.roomID);
        console.log(playerList);
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

function getSocketArrayByRoomName(roomName){
    var returnArray = [];
    var clients = io.sockets.adapter.rooms[roomName].sockets;
    for (var clientId in clients ) {
        //this is the socket of each client in the room.
        returnArray.push(io.sockets.connected[clientId]); 
    }
    return returnArray;
}

function getPlayersNameArrayByRoomName(roomName) {
    var returnArray = [];
    var socketArray = getSocketArrayByRoomName(roomName);
    for (var i = 0; i < socketArray.length; i++) {
        if(socketArray[i].custom.type == "appPlayer"){
            returnArray.push(socketArray[i].custom.playerName);
        }
    }
    return returnArray;
}

//