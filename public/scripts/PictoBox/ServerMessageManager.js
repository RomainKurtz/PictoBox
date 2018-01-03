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
            this.tabEvent = [{
                event: 'roomID',
                callback: []
            }, {
                event: 'playerList',
                callback: []
            }, ];
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
                //tweetArrived
                this.socket.on(this.tabEvent[0].event, function(data) {
                    for (var u = 0; u < this.tabEvent[0].callback.length; u++) {
                        this.tabEvent[0].callback[u].callback(data);
                    }
                }.bind(this));

                this.socket.on(this.tabEvent[1].event, function(data) {
                    for (var u = 0; u < this.tabEvent[1].callback.length; u++) {
                        this.tabEvent[1].callback[u].callback(data);
                    }
                }.bind(this));
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
