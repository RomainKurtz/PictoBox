define("UI/UIManager_m", ["PictoBox/ServerMessageManager", "UI/Connection_m", "UI/PreGameWaiting_m"],
    function(ServerMessageManager, Connection_m, PreGameWaiting_m) {
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
                this.CONNECTION_DIV = $('#ConnectionDiv');
                this.WAITING_DIV = $('#WaitingDiv');

                this._masterPlayer = false;

                this.createUI();
                this._buildUIBehaviour();
            },
            createUI: function() {
               this.connection_m = new Connection_m(this.CONNECTION_DIV, this._callbackConnection);
               this.preGameWaiting_m = new PreGameWaiting_m(this.WAITING_DIV, this._callbackStartingGameRequest);
               
               //this.defindPlayerName("totototo");
               //Materialize.updateTextFields();
            },
            _buildUIBehaviour: function() {
                var _this = this;
            },
            _callbackStartingGameRequest(data){
                 ServerMessageManager.eventSender('startingGameRequest',{data : data});
            },
            _callbackConnection(data){
                 ServerMessageManager.eventSender('newPlayer',{roomID : data.roomID, playerName : data.playerName });
            },
            createNotification: function(message, duration){
                var time = (duration)?duration:4000;
                Materialize.toast(message, time);
            },
            defindPlayerName: function(name){
                $("#namePlayer-input").val(name);
            },
            connected : function(isConnected, isMasterPlayer){
                if(isConnected){
                    this.connection_m.hide();
                    this.preGameWaiting_m.SetMasterPlayer(isMasterPlayer);
                    this.preGameWaiting_m.show()
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
