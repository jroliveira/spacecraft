define([
    'underscore',

    'domain/Element'
], function (_, Element) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.elements, function (element) {
            element.draw(self.context);
        });
    };

    Scenario.prototype.updates = function () { };

    Scenario.prototype.start = function () { };

    // Collision

    Scenario.prototype.detectsCollision = function (element) {
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

    Scenario.prototype.insertElement = function (element) {
        this.elements.push(element);
    };

    Scenario.prototype.removeElement = function (element) {
        var i = this.elements.indexOf(element);

        delete this.elements[i];
    };

    return Scenario;

});
