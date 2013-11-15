define([
    'domain/ammunition/Ammunition'
], function (Ammunition) {

    var missile = (function () {

        function Missile(posX, posY) {
            this.pos = { x: posX, y: posY };
            
            this.life = this.initLife();
            this.damage = 10;
            
            this.speedy = 5;

            this.image = new Image();
            this.image.src = "../../client/img/ammunition/missile.png";
        }

        Missile.prototype = new Ammunition();

        return Missile;

    })();

    return missile;

});