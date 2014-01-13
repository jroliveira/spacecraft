define([
    'jquery',
    'underscore',

    'domain/Entity',
    'domain/Living'
], function (
    $,
    _,
    
    Entity,
    Living
) {

    function Phase() { }

    Phase.prototype.configure = function () { };

    Phase.prototype.start = function () {
        var self = this;

        this.insertEntity(this.phase);
        _.each(this.config.entities, function (entity) {
            self.insertEntity(new entity.type(entity.config));
        });

        this.insertEntity(this.character);
    };
    
    Phase.prototype.updates = function () {
        var self = this;

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });
        
        $(this).trigger('updated');
    };

    // Collision

    Phase.prototype.detectsCollision = function (entity) {
        _.each(this.entities, function (obstacle) {
            if ((obstacle instanceof Entity) && (obstacle != entity)) {
                if (entity.collidedWith(obstacle)) {
                    entity.resolvesCollision(obstacle);
                    obstacle.resolvesCollision(entity);
                }
            }
        });
    };

    // Config

    Phase.prototype.insertEntity = function (entity) {
        if (entity instanceof Living) {
            $(entity).on('destroy', $.proxy(this.removeEntity, this));
        }

        this.entities.push(entity);

        $(this).trigger('insertedEntity', [entity]);
    };

    Phase.prototype.removeEntity = function (event, entity) {
        var i = this.entities.indexOf(entity);

        delete this.entities[i];

        $(this).trigger('deletedEntity', [entity]);
    };

    return Phase;

});
