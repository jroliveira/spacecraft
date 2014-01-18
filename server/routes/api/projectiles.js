define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'type': 'bullet',

            'health': 1,
            'damage': 3,
            'speed': 3,

            'components': ['Img'],
            'image': { 'src': '../../client/img/projectiles/bullet.png' },

            'width': 9,
            'height': 8,
            'canvas': { 'width': 1170, 'height': 600 }
        }, {
            'type': 'laser',

            'health': 1,
            'damage': 10,
            'speed': 7,

            'components': ['Img'],
            'image': { 'src': '../../client/img/projectiles/laser.png' },

            'width': 39,
            'height': 17,
            'canvas': { 'width': 1170, 'height': 600 }
        }, {
            'type': 'missile',

            'health': 1,
            'damage': 5,
            'speed': 5,

            'components': ['Img'],
            'image': { 'src': '../../client/img/projectiles/missile.png' },

            'width': 51,
            'height': 10,
            'canvas': { 'width': 1170, 'height': 600 }
        }]);
    };

});