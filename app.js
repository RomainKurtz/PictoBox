var path = require('path');
var app = require('express')();
 
 var __dirname = "./public/"
 
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
 });
 
 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     //console.log('static file request : ' + req.params);
     res.sendFile(req.params[0] , { root : __dirname});
    // res.sendFile( __dirname + req.params[0]); 
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
        socket.custom = {type : 'appHost' , state : "open"};
    	console.log("Server room "+NewRoomID);
    	socket.emit('roomID', NewRoomID);
    });
    socket.on('newPlayer', function(data){
        if(io.sockets.adapter.rooms[data.roomID]){ // Room exist
            var appHost = getSocketAppHostByRoomName(data.roomID)
            if(appHost){
                if(appHost.custom.state == "open"){
                	socket.join(data.roomID);
                    socket.custom = {type : 'appPlayer', playerName : data.playerName, masterPlayer : false, roomID : data.roomID};
                    var playerList = getPlayersNameArrayByRoomName(data.roomID);
                    
                    if(playerList.length == 1){ // If the player is the appPlayer into the room, he is the master player.
                        socket.custom.masterPlayer = true;
                    }

                    socket.emit('connectionRespond', {respond : true, info : "Connected", masterPlayer : socket.custom.masterPlayer});
                	socket.broadcast.to(data.roomID).emit('playerList', playerList);
                	//io.emit('playerList', data);
                	console.log("Player join "+ data.roomID);
                	//var ttt = getSocketArrayByRoomName(data.roomID);
                    console.log(playerList);
                }else{ // Room Close
                    console.log("Player try to join "+ data.roomID + " but room don't open.");
                    socket.emit('connectionRespond', {respond : false, info : "Room Close"});
                }
            }else{
                console.log("Player try to join "+ data.roomID + " but webApp don't find.");
                socket.emit('connectionRespond', {respond : false, info : "No webApp"});
            }
        }
        else{ // // Room don't exist
            console.log("Player try to join "+ data.roomID + " but room don't exist.");
            socket.emit('connectionRespond', {respond : false, info : "No room or game already start."});
        }
    });
    socket.on('startingGameRequest', function(data){
        io.in(socket.custom.roomID).emit('startGame', data);
    });
    socket.on('sendingImageData', function(data){
        getSocketAppHostByRoomName(socket.custom.roomID).emit('imageData', data);
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

function getSocketAppHostByRoomName(roomName){
    var socketList = getSocketArrayByRoomName(roomName);
    for (var i = 0; i < socketList.length; i++) {
        if(socketList[i].custom.type == "appHost"){
            return socketList[i];
        }
    }
    return null;
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