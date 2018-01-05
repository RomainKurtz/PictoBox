/* global requirejs */
requirejs(["socketio", "PictoBox/GameManager_m", "PictoBox/ServerMessageManager"],
    function(io, GameManager_m, ServerMessageManager) {

         ServerMessageManager.eventSubscriber('connectionRespond', function(data) {
            GameManager_m.connected(data.respond, data);
         });

        //ServerMessageManager.eventSender('getRoomID');


    }
);
