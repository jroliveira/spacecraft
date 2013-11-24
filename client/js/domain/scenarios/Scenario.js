define([
    'jquery',
    'underscore',

    'domain/Entity'
], function ($, _, Entity) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.entities, function (entity) {
            entity.draw(self.context);
        });
    };

    Scenario.prototype.updates = function() {
        var self = this;

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });

        this.draw();

        $(this).trigger('update');
    };

    Scenario.prototype.start = function() {
        this.bindKeyUp();
        this.bindKeyDown();
        
        this.draw();
    };

    // Collision

    Scenario.prototype.detectsCollision = function (entity) {
        _.each(this.entities, function (obstacle) {
            if ((obstacle instanceof Entity) && (obstacle != entity)) {
                if (entity.collided(obstacle)) {
                    entity.damages(obstacle);
                    obstacle.damages(entity);
                }
            }
        });
    };
    
    // Event

    Scenario.prototype.bindKeyDown = function () {
        var self = this;

        $(document).bind('keydown', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32:
                    $(self).trigger('spaceKeyDown', [true]);
                    break;
                case 70:
                    $(self).trigger('fKeyDown', [true]);
                    break;
                case 82:
                    $(self).trigger('rKeyDown', [true]);
                    break;
                case 37:
                    $(self).trigger('leftKeyDown', [true]);
                    break;
                case 38:
                    $(self).trigger('upKeyDown', [true]);
                    break;
                case 39:
                    $(self).trigger('rightKeyDown', [true]);
                    break;
                case 40:
                    $(self).trigger('downKeyDown', [true]);
                    break;
            }
        });
    };

    Scenario.prototype.bindKeyUp = function () {
        var self = this;

        $(document).bind('keyup', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32:
                    $(self).trigger('spaceKeyUp', [false]);
                    break;
                case 70:
                    $(self).trigger('fKeyUp', [false]);
                    break;
                case 82:
                    $(self).trigger('rKeyUp', [false]);
                    break;
                case 37:
                    $(self).trigger('leftKeyUp', [false]);
                    break;
                case 38:
                    $(self).trigger('upKeyUp', [false]);
                    break;
                case 39:
                    $(self).trigger('rightKeyUp', [false]);
                    break;
                case 40:
                    $(self).trigger('downKeyUp', [false]);
                    break;
            }
        });
    };

    // Config

    Scenario.prototype.shoot = function (munition) {
        $(munition).on('destroy', this.removeEntity);

        this.insertEntity(munition);
    };

    Scenario.prototype.threaten = function(enemy) {
        $(enemy).on('destroy', this.removeEntity);

        this.insertEntity(enemy);
    };

    Scenario.prototype.insertEntity = function (entity) {
        this.entities.push(entity);
    };

    Scenario.prototype.removeEntity = function (event, entity) {
        var i = entity.owner.entities.indexOf(entity);

        delete entity.owner.entities[i];
    };

    return Scenario;

});
