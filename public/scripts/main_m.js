/* global requirejs */
requirejs(["socketio", "PictoBox/GameManager_m", "PictoBox/ServerMessageManager"],
    function(io, GameManager_m, ServerMessageManager) {

         ServerMessageManager.eventSubscriber('connectionRespond', function(data) {
         	if(data.respond == true)
            	GameManager_m.connected(true);
         });

        //ServerMessageManager.eventSender('getRoomID');


    }
);
