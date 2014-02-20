define([
    'jquery',

    'views/game/infrastructure/inputs/Input'
], function ($, Input) {

    function Touch() { }

    Touch.prototype = new Input();

    Touch.prototype.unbind = function () {
        $(document).unbind('touchstart');
    };

    Touch.prototype.bind = function () {
        var self = this;
        
        $(document).bind('touchstart', function (e) {
            e.preventDefault();
            
            self.enter(true);
        });
    };
    
    return Touch;

});