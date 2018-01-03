/* global requirejs */
requirejs(["socketio", "UI/UIManager_m", "PictoBox/ServerMessageManager"],
    function(io, UIManager, ServerMessageManager) {

        // ServerMessageManager.eventSubscriber('roomID', function(data) {
        //     UIManager.defindRoomID(data);
        // });

        //ServerMessageManager.eventSender('getRoomID');
    }
);
