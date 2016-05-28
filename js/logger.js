Redwood.factory("Logger", function() {
    var api = {};

    api.init = function(divId, bgColor, textColor) {
        this.element = $('#'+divId);

        console.log(divId);

        // use default colors if params not provided
        if(typeof bgColor == undefined){
            bgColor = "white";
        }
        if(typeof textColor == undefined){
            textColor = "black";
        }
        
        // create the logger terminal in the page's html
        this.element.append("<div class='logger-terminal-wrap'><div class='logger-terminal-head'>Logger</div><div id='logger-id' class='terminal'></div></div>");
    };

    api.log = function(data){
        $("#logger-id").append('<div class="logger-log-line"><span class="logger-log-data-type">' + String(typeof(data)) + ":</span>" + String(data) + '</div>');
        this.scrollDown();
    };

    api.scrollDown = function(){
        $("#logger-id").scrollTop($("#logger-id")[0].scrollHeight);
    };

    return api;
});