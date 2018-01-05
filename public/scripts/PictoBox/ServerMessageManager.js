define("PictoBox/ServerMessageManager", ["socketio", "PictoBox/Utilities"],
    function(io, Utilities) {
        var instance = null;

        function ServerMessageManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one ServerMessageManager, use ServerMessageManager.getInstance()");
            }
            this.SERVERADR = '/';
            this.socket = null; 

            //Define all event here
            var EVENTLIST = ['roomID','playerList', 'connectionRespond', 'startGame', 'imageData'];

            this.tabEvent = this._initTabEvent(EVENTLIST);

            this._initialize();
        }
        ServerMessageManager.prototype = {
            _initialize: function() {
                this.initSocket();
                this.initSocketEvent();
            },
            initSocket: function() {
                this.socket = io.connect(this.SERVERADR);
            },
            initSocketEvent: function() {
                var _this = this;
                for (var i = 0; i < this.tabEvent.length; i++) {
                  (function(){
                    var _i = i;
                    _this.socket.on(_this.tabEvent[_i].event, function(data) {
                        for (var u = 0; u < _this.tabEvent[_i].callback.length; u++) {
                            _this.tabEvent[_i].callback[u].callback(data);
                        }
                    }.bind(this));
                  }());
                }
            },
            eventSubscriber: function(eventName, callback) {
                for (var i = 0; i < this.tabEvent.length; i++) {
                    if (this.tabEvent[i].event === eventName) {
                        var id = Utilities.createID();
                        this.tabEvent[i].callback.push({
                            'callback': callback,
                            'id': id
                        });
                        return id;
                    }
                }
            },
            eventUnsubscriber: function(id) {
                for (var i = 0; i < this.tabEvent.length; i++) {
                    if (this.tabEvent[i].callback.id === id) {
                        this.tabEvent.split(i, 1);
                    }
                }
            },
            eventSender: function(eventName, data) {
                this.socket.emit(eventName, data)
            },
            _initTabEvent: function(eventList){
              var returnArray = [];
              for (var i = 0; i < eventList.length; i++) {
                returnArray.push({event : eventList[i], callback : []});
              }
              return returnArray;
            }
        };
        ServerMessageManager.getInstance = function() {
            // summary:
            // Gets an instance of the singleton. It is better to use 
            if (instance === null) {
                instance = new ServerMessageManager();
            }
            return instance;
        };

        return ServerMessageManager.getInstance();
    }
);
