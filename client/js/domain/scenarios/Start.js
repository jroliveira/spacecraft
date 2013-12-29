define([
    'jquery',
    'underscore',

    'infrastructure/components/Text',

    'domain/scenarios/Scenario'
], function (
    $,
    _,

    Text,

    Scenario
) {

    function Start(context, config) {
        this.context = context;

        this.config = config;

        this.components = [];
    }

    Start.prototype = new Scenario();

    Start.prototype.draw = function () {
        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw();
        });
    };

    Start.prototype.start = function () {
        var config = { message: 'precione ENTER para começar o jogo.', pos: { x: 50, y: 50 } };
        var component = new Text(config, this.context);
        this.components.push(component);

        $(document).on('enter', this.mainPhase);
    };

    Start.prototype.mainPhase = function (event, pressed) {
        $(document).trigger('mainPhase');
    };

    return Start;

});
