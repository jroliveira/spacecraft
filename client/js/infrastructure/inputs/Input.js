define([], function () {

    function Input() { }

    Input.prototype.configure = function () { };

    Input.prototype.enter = function (pressed) {
        $(document).trigger('enter', [pressed]);
    };

    Input.prototype.space = function (pressed) {
        $(document).trigger('space', [pressed]);
    };
    
    Input.prototype.f = function (pressed) {
        $(document).trigger('f', [pressed]);
    };

    Input.prototype.r = function (pressed) {
        $(document).trigger('r', [pressed]);
    };

    Input.prototype.up = function (pressed) {
        $(document).trigger('up', [pressed]);
    };

    Input.prototype.down = function (pressed) {
        $(document).trigger('down', [pressed]);
    };

    Input.prototype.left = function (pressed) {
        $(document).trigger('left', [pressed]);
    };

    Input.prototype.right = function (pressed) {
        $(document).trigger('right', [pressed]);
    };

    return Input;

});