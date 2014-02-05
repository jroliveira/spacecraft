define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'type': 'asteroid',

            'health': 10,
            'damage': 20,
            'speed': 1.5,

            'components': [
                { 'type': 'Img', 'src': 'enemies_asteroid.png' },
                { 'type': 'HealthBar' }
            ],

            'width': 95,
            'height': 93,
            'canvas': { 'width': 1170, 'height': 600 }
        }]);
    };

});