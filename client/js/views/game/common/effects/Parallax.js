define([], function () {

    function Parallax(config) {
        this.config = config;
        
        this.pos = config.pos;
    }

    Parallax.prototype.updates = function () {
        this.pos.x = (Math.abs(this.pos.x) >= this.config.width) ? 0 : this.pos.x - this.config.speed;
    };

    return Parallax;

});