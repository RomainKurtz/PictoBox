define("UI/UIManager_m", ["PictoBox/ServerMessageManager", "UI/Connection_m"],
    function(ServerMessageManager, Connection_m) {
        var instance = null;

        function UIManager_m() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one UIManager_m, use UIManager_m.getInstance()");
            }
            this._initialize();
        }
        UIManager_m.prototype = {
            _initialize: function() {
                // summary:
                // Initializes the singleton. 
                this.createUI();
                this._buildUIBehaviour();
            },
            createUI: function() {
               this.connection_m = new Connection_m($('#mainContent'), this._callballConnection);
               //this.defindPlayerName("totototo");
               //Materialize.updateTextFields();
            },
            _buildUIBehaviour: function() {
                var _this = this;
            },
            _callballConnection(data){
                 ServerMessageManager.eventSender('newPlayer',{roomID : data.roomID, playerName : data.playerName });
            },
            createNotification: function(message, duration){
                var time = (duration)?duration:4000;
                Materialize.toast(message, time);
            },
            defindPlayerName: function(name){
                $("#namePlayer-input").val(name);
            },
            connected : function(isConnected){
                if(isConnected){
                    this.connection_m.hide();
                    console.log('COONECCTED §!!!');
                }
            }
        };
        UIManager_m.getInstance = function() {
            // summary:
            // Gets an instance of the singleton. It is better to use 
            if (instance === null) {
                instance = new UIManager_m();
            }
            return instance;
        };

        return UIManager_m.getInstance();
    }
);
