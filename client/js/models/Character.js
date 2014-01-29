define([
    'jquery',
    'underscore',
    'backbone'
], function (
    $,
    _,
    Backbone
) {

    var Character = Backbone.Model.extend({

        urlRoot: '/api/characters',

        idAttribute: '_id',

        defaults: {
            type: '',
            health: 1,
            damage: 1,
            speed: { up: 1, down: 1, left: 1, right: 1},
            timeNextMove: 1,
            projectiles: { first: '', second: '' },
            components: ['Img', 'HealthBar'],
            image: { width: 1, height: 1, src: '../../client/img/projectiles/<nome_da_imagem>.png' },
            width: 1,
            height: 1,
            canvas: { width: 1170, height: 600 },
            pos: { x: 1, y: 1 },
            sprite: { row: 1, col: 1 }
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

    return Character;
});