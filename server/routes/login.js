define([
    'exports',
    'passport'
], function (
    exports,
    passport
) {
    
    exports.get = function(req, res) {
        res.render('login/index.html', { message: req.flash('loginMessage') });
    };
        
    exports.post = passport.authenticate('local-login', { successRedirect : '/', failureRedirect : '/login', failureFlash : true });
        
});