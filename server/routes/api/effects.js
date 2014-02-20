define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'name': 'one',
            'type': 'Parallax',

            'speed': 10,
            'pos': { 'x': 0 },

            'components': [
                { 'type': 'ImgContinuous', 'src': 'parallax_parallax1.png' }
            ],

            'width': 1170,
            'canvas': { 'width': 1170, 'height': 600 }
        },{
            'name': 'two',
            'type': 'Parallax',

            'speed': 5,
            'pos': { 'x': 0 },

            'components': [
                { 'type': 'ImgContinuous', 'src': 'parallax_parallax2.png' }
            ],

            'width': 1170,
            'canvas': { 'width': 1170, 'height': 600 }
        }]);
    };

});