define("UI/DrawingCanvas_m", ['hbs!UI/templates/drawing_canvas_m', 'PictoBox/Utilities'],
    function(template, Utilities) {
        // start method
        function DrawingCanvas_m(dom_element, callbackFinalDrawing) {
            this.parent_dom_element = dom_element;
            this.callbackFinalDrawing = callbackFinalDrawing;
            this.ID = null;
            this.initialize();
        }
        // public method
        DrawingCanvas_m.prototype = {
            initialize: function() {
                this.ID = Utilities.createDomID();
                this.createUI();
            },
            createUI: function() {
                var context = {ID : this.ID};
                this.parent_dom_element.append(template(context));
                this._buildUIBehaviour();
                this.hide();
                this._legacyCode();
            },
            _buildUIBehaviour: function() {
                var _this = this;
                $("#validateCanvas-button").click(function() {
                    var jpegUrl = $("#canvas").get(0).toDataURL();
                    _this.callbackFinalDrawing(jpegUrl);
                });
            },
            _legacyCode: function(){
                var ctx, color = "#000";   

                $(document).ready(function () {
                    
                    // setup a new canvas for drawing wait for device init
                    setTimeout(function(){
                       newCanvas();
                    }, 1000);
                        
                    // reset palette selection (css) and select the clicked color for canvas strokeStyle
                    $(".palette").click(function(){
                        $(".palette").css("border-color", "#777");
                        $(".palette").css("border-style", "solid");
                        $(this).css("border-color", "#fff");
                        $(this).css("border-style", "dashed");
                        color = $(this).css("background-color");
                        ctx.beginPath();
                        ctx.strokeStyle = color;
                    });
                    
                    // link the new button with newCanvas() function
                    $("#clearCanvas-button").click(function() {
                        newCanvas();
                    });
                });

                // function to setup a new canvas for drawing
                function newCanvas(){
                    //define and resize canvas
                    $("#content").height($(window).height()-90);
                    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
                    $("#content").html(canvas);
                    
                    // setup canvas
                    ctx=document.getElementById("canvas").getContext("2d");
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 5;  
                    
                    // setup to trigger drawing on mouse or touch
                    $("#canvas").drawTouch();
                    $("#canvas").drawPointer();
                    $("#canvas").drawMouse();
                }

                // prototype to start drawing on touch using canvas moveTo and lineTo
                $.fn.drawTouch = function() {
                    var start = function(e) {
                        e = e.originalEvent;
                        ctx.beginPath();
                        x = e.changedTouches[0].pageX;
                        y = e.changedTouches[0].pageY-44;
                        ctx.moveTo(x,y);
                    };
                    var move = function(e) {
                        e.preventDefault();
                        e = e.originalEvent;
                        x = e.changedTouches[0].pageX;
                        y = e.changedTouches[0].pageY-44;
                        ctx.lineTo(x,y);
                        ctx.stroke();
                    };
                    $(this).on("touchstart", start);
                    $(this).on("touchmove", move);  
                }; 
                    
                // prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
                $.fn.drawPointer = function() {
                    var start = function(e) {
                        e = e.originalEvent;
                        ctx.beginPath();
                        x = e.pageX;
                        y = e.pageY-44;
                        ctx.moveTo(x,y);
                    };
                    var move = function(e) {
                        e.preventDefault();
                        e = e.originalEvent;
                        x = e.pageX;
                        y = e.pageY-44;
                        ctx.lineTo(x,y);
                        ctx.stroke();
                    };
                    $(this).on("MSPointerDown", start);
                    $(this).on("MSPointerMove", move);
                };        

                // prototype to start drawing on mouse using canvas moveTo and lineTo
                $.fn.drawMouse = function() {
                    var clicked = 0;
                    var start = function(e) {
                        clicked = 1;
                        ctx.beginPath();
                        x = e.pageX;
                        y = e.pageY-44;
                        ctx.moveTo(x,y);
                    };
                    var move = function(e) {
                        if(clicked){
                            x = e.pageX;
                            y = e.pageY-44;
                            ctx.lineTo(x,y);
                            ctx.stroke();
                        }
                    };
                    var stop = function(e) {
                        clicked = 0;
                    };
                    $(this).on("mousedown", start);
                    $(this).on("mousemove", move);
                    $(window).on("mouseup", stop);
                };
            },
            hide: function(){
                this.parent_dom_element.hide();
            },
            show: function(){
                this.parent_dom_element.show();
            }
        }
        return DrawingCanvas_m;
    })
