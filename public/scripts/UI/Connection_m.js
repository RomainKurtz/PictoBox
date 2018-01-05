define("UI/Connection_m", ['hbs!UI/templates/connection_m', 'PictoBox/Utilities'],
    function(template, Utilities) {
        // start method
        function Connection_m(dom_element, callbackConnection) {
            this.parent_dom_element = dom_element;
            this.callbackConnection = callbackConnection;
            this.ID = null;
            this.initialize();
        }
        // public method
        Connection_m.prototype = {
            initialize: function() {
                this.ID = Utilities.createDomID();
                this.createUI();
            },
            createUI: function() {
                var context = {ID : this.ID};
                this.parent_dom_element.append(template(context));
                this._buildUIBehaviour();
            },
            _buildUIBehaviour: function() {
                var _this = this;
                 $("#connection-button").click(function(){
                    var playerName = $("#namePlayer-input").val();
                    var roomID = $("#roomID-input").val().toLowerCase();
                    _this.callbackConnection({'playerName' : playerName , 'roomID' : roomID});
                });
            },
            hide: function(){
                this.parent_dom_element.hide();
            },
            show: function(){
                this.parent_dom_element.show();
            }
        }
        return Connection_m;
    })
