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
                $("#playerList-div").text('');
                for (var i = 0; i < playerList.length; i++) {
                    $("#playerList-div").append(playerList[i] +'<br>');
                }
                
            },
            showImage: function(data){
                var imgDiv = $("#imageViewer-div");

                imgDiv.append('<div><center><h4>'+data.playerName.toUpperCase()+'</h4></center></div>');    
                var image = new Image();
                image.src = data.data;
                $(image).addClass('imageFromPlayer');
                imgDiv.prepend(image);
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
