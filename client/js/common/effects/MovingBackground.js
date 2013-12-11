﻿define([
    'jquery'
], function ($) {

    function MovingBackground(config) {
        this.config = config;

        this.pos = config.pos;
        this.notifyPhaseEnded = false;
    }

    MovingBackground.prototype.updates = function () {
        if ((Math.abs(this.pos.x) + this.config.canvas.width) < this.config.width) {
            this.pos.x = this.pos.x - this.config.speed;
        } else if (this.notifyPhaseEnded === false) {
            this.notifyPhaseEnded = true;
            
            $(this).trigger('phaseEnded');
        }
    };

    return MovingBackground;

});