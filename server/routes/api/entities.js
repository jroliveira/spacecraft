define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'type': 'starbase',

            'components': ['Img'],
            'image': { 'src': '../../client/img/starbase.png' },

            'width': 250,
            'height': 140,
            'canvas': { 'width': 895, 'height': 600 },
            'pos': { 'x': 630, 'y': 450 }
        }]);
    };

});