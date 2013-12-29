define([
    'jquery',

    'infrastructure/components/Component'
], function ($, Component) {

    function Text(config, context) {
        this.context = context;

        this.config = config;
    }

    Text.prototype = new Component();

    Text.prototype.draw = function () {
        this.context.font = '22pt sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText(this.config.message, (895 / 2), (600 / 2));
    };

    return Text;

});