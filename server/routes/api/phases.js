define([
    'exports'
], function (exports) {

    exports.get = function (req, res) {
        res.json([{
            'name': 'first',
            
            'character': { 'type': 'Ship' },
            
            'phase': { 'config': 'oneMoving' },
            
            'entities': {
                'effect01': { 'config': 'one' },
                'effect02': { 'config': 'two' }
            }
        },{
            'name': 'starbase',
            
            'character': { 'type': 'Soldier' },
            
            'phase': { 'config': 'one' },
            
            'entities': null
        }]);
    };

});