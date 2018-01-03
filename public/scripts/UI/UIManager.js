define("UI/UIManager", [],
    function() {
        var instance = null;

        function UIManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one UIManager, use UIManager.getInstance()");
            }
            this._initialize();
        }
        UIManager.prototype = {
            _initialize: function() {
                // summary:
                // Initializes the singleton. 
                this.createUI();

            },
            createUI: function() {
               
            },
            _buildUIBehaviour: function() {
                
            },
            createNotification: function(message, duration){
                var time = (duration)?duration:4000;
                Materialize.toast(message, time);
            },
            defindRoomID: function(id){
                $("#room-id-div").text(id);
            },
            diplayPlayerList : function(playerList){
                $("#playerList-div").text(playerList);
            }
        };
        UIManager.getInstance = function() {
            // summary:
            // Gets an instance of the singleton. It is better to use 
            if (instance === null) {
                instance = new UIManager();
            }
            return instance;
        };

        return UIManager.getInstance();
    }
);
