define("UI/UIManager_m", ["PictoBox/ServerMessageManager"],
    function(ServerMessageManager) {
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
               this.defindPlayerName("totototo");
               Materialize.updateTextFields();
            },
            _buildUIBehaviour: function() {
                var _this = this;
                $("#connection-button").click(function(){
                    var playerName = $("#namePlayer-input").val();
                    var roomID = $("#roomID-input").val();

                    ServerMessageManager.eventSender('newPlayer',
                        {
                            roomID : roomID,
                            playerName : playerName 
                        })
                    })
            },
            createNotification: function(message, duration){
                var time = (duration)?duration:4000;
                Materialize.toast(message, time);
            },
            defindPlayerName: function(name){
                $("#namePlayer-input").val(name);
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
