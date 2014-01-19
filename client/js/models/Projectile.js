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

        idAttribute: '_id',

        defaults: {
            type: '',
            health: 1,
            damage: 1,
            speed: 1,
            components: ['Img'],
            image: { src: '../../client/img/projectiles/<nome_da_imagem>.png' },
            width: 1,
            height: 1,
            canvas: { width: 1170, height: 600 }
        },

        validate: function (attrs) {
            var errors = [];

            if (!attrs.type) errors.push({ name: 'type', message: 'Campo obrigatório.' });
            
            if (attrs.health < 1) errors.push({ name: 'health', message: 'Campo obrigatório.' });
            
            if (attrs.damage < 1) errors.push({ name: 'damage', message: 'Campo obrigatório.' });
            
            if (attrs.speed < 1) errors.push({ name: 'speed', message: 'Campo obrigatório.' });
            
            if (attrs.width < 1) errors.push({ name: 'width', message: 'Campo obrigatório.' });
            
            if (attrs.height < 1) errors.push({ name: 'height', message: 'Campo obrigatório.' });

            return errors.length > 0 ? errors : false;
        }

    });

    return Projectile;
});