define([
    'exports'
], function (exports) {
    
    exports.index = function (req, res) {
        res.render('projectile/index.html');
    };
    
    exports.create = function (req, res) {
        res.render('projectile/create.html');
    };
        
});