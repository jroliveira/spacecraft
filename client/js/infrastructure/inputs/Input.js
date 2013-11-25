define([], function () {

    function Input() { }

    Input.prototype.configure = function () { };

    Input.prototype.space = function (pressed) {
        $(this).trigger('space', [pressed]);
    };

    Input.prototype.f = function (pressed) {
        $(this).trigger('f', [pressed]);
    };

    Input.prototype.r = function (pressed) {
        $(this).trigger('r', [pressed]);
    };

    Input.prototype.up = function (pressed) {
        $(this).trigger('up', [pressed]);
    };

    Input.prototype.down = function (pressed) {
        $(this).trigger('down', [pressed]);
    };

    Input.prototype.left = function (pressed) {
        $(this).trigger('left', [pressed]);
    };

    Input.prototype.right = function (pressed) {
        $(this).trigger('right', [pressed]);
    };

    return Input;

});