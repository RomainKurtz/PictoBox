define("UI/PreGameWaiting_m", ['hbs!UI/templates/pre_game_waiting_m', 'PictoBox/Utilities'],
    function(template, Utilities) {
        // start method
        function PreGameWaiting_m(dom_element, callbackLaunchGame) {
            this.parent_dom_element = dom_element;
            this.callbackLaunchGame = callbackLaunchGame;
            
            this.isMasterPlayer = false;
            this.MasterPanelDiv = null;
            this.ID = null;

            this.initialize();
        }
        // public method
        PreGameWaiting_m.prototype = {
            initialize: function() {
                this.ID = Utilities.createDomID();
                this.createUI();
            },
            createUI: function() {
                var context = {ID : this.ID};
                this.parent_dom_element.append(template(context));
                this.MasterPanelDiv = $('#masterPlayerControlPanel-div');
                
                this.hide();
                this._buildUIBehaviour();
            },
            _buildUIBehaviour: function() {
                var _this = this;
                $("#startGame-button").click(function(){
                    _this.callbackLaunchGame({data : 'data'});
                });
            },
            SetMasterPlayer: function(isMasterPlayer){
                this.isMasterPlayer = isMasterPlayer;
                if(isMasterPlayer){
                    this.MasterPanelDiv.show();
                }else{
                    this.MasterPanelDiv.hide();
                }
            },
            hide: function(){
                this.parent_dom_element.hide();
            },
            show: function(){
                this.parent_dom_element.show();
            }
        }
        return PreGameWaiting_m;
    })
