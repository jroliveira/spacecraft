define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'name': 'loading',
            
            'canvas': { 'width': 1170, 'height': 600 }
        },{
            'name': 'main',
            
            'canvas': { 'width': 1170, 'height': 600 }
        },{
            'name': 'start',
            
            'canvas': { 'width': 1170, 'height': 600 }
        }]);
    };

});