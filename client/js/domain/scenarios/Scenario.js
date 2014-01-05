define(['underscore'], function (_) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw();
        });
    };

    Scenario.prototype.updates = function () { };

    Scenario.prototype.start = function () { };

    return Scenario;

});
