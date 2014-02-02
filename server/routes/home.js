define([
    'exports'
], function (exports) {
    
    exports.index = function(req, res) {
        res.render('home/index.html', { user: req.user });
    };
        
});