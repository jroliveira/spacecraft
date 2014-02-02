define([
    'exports',
    'passport'
], function (
    exports,
    passport
) {
    
    exports.get = function(req, res) {
        req.logout();
		res.redirect('/login');
    };
        
});