define("PictoBox/GameManager_m", ["UI/UIManager_m", "PictoBox/Utilities"],
    function(UIManager_m, Utilities) {
        var instance = null;

        function GameManager_m() {
            this._initialize();
        }
        GameManager_m.prototype = {
            _initialize: function() {
               
            },
            connected : function(isConnected){
                if(isConnected){
                    UIManager_m.connected(true);
                }
            }
        };
        GameManager_m.getInstance = function() {
            // summary:
            // Gets an instance of the singleton. It is better to use 
            if (instance === null) {
                instance = new GameManager_m();
            }
            return instance;
        };

        return GameManager_m.getInstance();
    }
);
