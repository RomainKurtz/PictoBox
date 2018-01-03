define("PictoBox/Utilities", [],
    function() {
        var instance = null;

        function Utilities() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one Utilities, use Utilities.getInstance()");
            }
            this._initialize();
        }
        Utilities.prototype = {
            _initialize: function() {
                // summary:
                // Initializes the singleton. 
            },
            createDomID: function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4();
            },
            createID: function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

        };
        Utilities.getInstance = function() {
            // summary:
            // Gets an instance of the singleton. It is better to use 
            if (instance === null) {
                instance = new Utilities();
            }
            return instance;
        };

        return Utilities.getInstance();
    }
);
