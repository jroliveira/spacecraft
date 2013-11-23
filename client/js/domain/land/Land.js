define([
    'underscore',

    'domain/Element',
    'domain/Scenario',
    'domain/land/Character'
], function (_, Element, Scenario, Character) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.ended = false;

        this.character = new Character();

        this.elements = [];
        this.insertElement(this.character);
    }

    Land.prototype = new Scenario();

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
    
    return Land;

});
