define([
    'domain/ammunition/Ammunition'
], function (Ammunition) {

    var bullet = (function () {

        function Bullet(posX, posY) {
            this.pos = { x: posX, y: posY };

            this.life = this.initLife();
            this.damage = 5;
            
            this.speedy = 3;

            this.image = new Image();
            this.image.src = "../../client/img/ammunition/bullet.png";
        }

        Bullet.prototype = new Ammunition();

        return Bullet;

    })();

    return bullet;

});