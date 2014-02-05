define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'type': 'starbase',

            'components': [
                { 'type': 'Img', 'src': 'starbase.png' }
            ],

            'width': 250,
            'height': 140,
            'canvas': { 'width': 1170, 'height': 600 },
            'pos': { 'x': 890, 'y': 450 }
        }]);
    };

});