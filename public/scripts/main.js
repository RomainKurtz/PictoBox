/* global requirejs */
requirejs(["socketio", "UI/UIManager", "PictoBox/ServerMessageManager"],
    function(io, UIManager, ServerMessageManager) {

        ServerMessageManager.eventSubscriber('roomID', function(data) {
            UIManager.defindRoomID(data);
        });

        ServerMessageManager.eventSender('getRoomID');

        ServerMessageManager.eventSubscriber('playerList', function(data) {
            UIManager.diplayPlayerList(data.playerName);
        });
    }
);
