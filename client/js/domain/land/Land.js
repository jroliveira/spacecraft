define([
    'underscore',

    'domain/land/Element',
    'domain/land/Character',
], function (_, Element, Character) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.ended = false;

        this.character = new Character();

        this.elements = [];
        this.insertElement(this.character);
    }

    Land.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.elements, function (element) {
            element.draw(self.context);
        });
    };

    Land.prototype.updates = function () {
        var self = this;

        _.each(this.elements, function (element) {
            if (element instanceof Element) {
                self.detectsCollision(element);
            }

            element.updates();
        });

        this.draw();
    };

    Land.prototype.start = function () {
        var self = this;

        this.draw();

        $(document).bind('keydown', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 37:
                    self.character.left(true);
                    break;
                case 38:
                    self.character.up(true);
                    break;
                case 39:
                    self.character.right(true);
                    break;
                case 40:
                    self.character.down(true);
                    break;
            }
        });

        $(document).bind('keyup', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 37:
                    self.character.left(false);
                    break;
                case 38:
                    self.character.up(false);
                    break;
                case 39:
                    self.character.right(false);
                    break;
                case 40:
                    self.character.down(false);
                    break;
            }
        });
    };
    
    // Collision
    
    Land.prototype.detectsCollision = function (element) {
        var self = this;

        if (element.destroyed()) {
            this.removeElement(element);
            return;
        }

        _.each(this.elements, function (obstacle) {
            if ((obstacle instanceof Element) && (obstacle != element)) {
                if (element.collided(obstacle)) {
                    element.damages(obstacle.damage);
                    if (element.destroyed()) {
                        self.removeElement(element);
                    }

                    obstacle.damages(element.damage);
                    if (obstacle.destroyed()) {
                        self.removeElement(obstacle);
                    }
                }
            }
        });
    };
    
    // Config
    
    Land.prototype.insertElement = function (element) {
        this.elements.push(element);
    };

    Land.prototype.removeElement = function (element) {
        var i = this.elements.indexOf(element);

        delete this.elements[i];
    };

    return Land;

});
