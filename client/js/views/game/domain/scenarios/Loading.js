define([
    'jquery',
    'underscore',

    'views/game/infrastructure/components/Loader',

    'views/game/domain/scenarios/Scenario'
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
