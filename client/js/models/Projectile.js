define([
    'jquery',
    'underscore',
    'backbone'
], function (
    $,
    _,
    Backbone
) {

    var Projectile = Backbone.Model.extend({

        urlRoot: '/api/projectiles',

        idAttribute: 'type',

        defaults: {
            type: '',
            health: 1,
            damage: 1,
            speed: 1,
            components: ['Img'],
            image: { src: '' },
            width: 0,
            height: 0,
            canvas: { width: 1170, height: 600 }
        },

        validate: function (attrs) {
            var errors = [];

            if (attrs.health < 1) {
                errors.push({ name: 'health', message: 'Campo obrigatório.' });
            }
            
            if (attrs.damage < 1) {
                errors.push({ name: 'damage', message: 'Campo obrigatório.' });
            }
            
            if (attrs.speed < 1) {
                errors.push({ name: 'speed', message: 'Campo obrigatório.' });
            }

            return errors.length > 0 ? errors : false;
        }

    });

    return Projectile;
});