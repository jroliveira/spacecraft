define([
    'exports',
    'passport'
], function (
    exports,
    passport
) {
    
    exports.getCreate = function(req, res) {
        res.render('account/create.html', { message: req.flash('signupMessage') });
    };
    
    exports.postCreate = passport.authenticate('local-signup', { successRedirect : '/login', failureRedirect : '/account/create', failureFlash : true });

});