define([
    'jquery',

    'infrastructure/inputs/Input'
], function ($, Input) {

    function Keyboard() { }

    Keyboard.prototype = new Input();

    Keyboard.prototype.configure = function () {
        var self = this;

        $(document).bind('keydown', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32:
                    self.space(true);
                    break;
                case 70:
                    self.f(true);
                    break;
                case 82:
                    self.r(true);
                    break;
                case 37:
                    self.left(true);
                    break;
                case 38:
                    self.up(true);
                    break;
                case 39:
                    self.right(true);
                    break;
                case 40:
                    self.down(true);
                    break;
            }
        });
        
        $(document).bind('keyup', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32:
                    self.space(false);
                    break;
                case 70:
                    self.f(false);
                    break;
                case 82:
                    self.r(false);
                    break;
                case 37:
                    self.left(false);
                    break;
                case 38:
                    self.up(false);
                    break;
                case 39:
                    self.right(false);
                    break;
                case 40:
                    self.down(false);
                    break;
            }
        });
    };
    
    return Keyboard;

});