define([], function () {

    function Background(config) {
        this.config = config;

        this.pos = config.pos;
    }

    Background.prototype.updates = function () { };

    return Background;

});