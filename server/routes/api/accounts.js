define([
    'exports'
], function (
    exports
) {
        
    exports.logged = function (req, res) {
        res.json(200, req.user);
    };

});