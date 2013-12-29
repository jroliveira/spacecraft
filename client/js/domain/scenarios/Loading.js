define([
    'jquery',
    'underscore',

    'infrastructure/components/Loader',

    'domain/scenarios/Scenario'
], function (
    $,
    _,

    Loader,

    Scenario
) {

    function Loading(context, config) {
        this.context = context;

        this.config = config;

        this.components = [];
    }

    Loading.prototype = new Scenario();

    Loading.prototype.draw = function () {
        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw();
        });
    };

    Loading.prototype.updates = function () {
        _.each(this.components, function (component) {
            component.updates();
        });
    };

    Loading.prototype.start = function () {
        this.components.push(new Loader(this.context));
    };

    return Loading;

});
