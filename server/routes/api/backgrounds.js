define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'name': 'one',
            'type': 'Background',

            'pos': { 'x': 1, 'y': 1 },
            
            'width': 250,
            'height': 140,
            'canvas': { 'width': 1170, 'height': 600 }
        },{
            'name': 'oneMoving',
            'type': 'MovingBackground',            

            'pos': { 'x': 0 },
            'speed': 2.5,
            
            
            'components': [
                { 'type': 'ImgContinuous', 'src': 'backgrounds_background1.png' }
            ],
            
            'width': 3091,
            'canvas': { 'width': 1170, 'height': 600 }
        }]);
    };

});