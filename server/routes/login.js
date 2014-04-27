define([
    'exports',
    'passport'
], function (
    exports,
    passport
) {
    
    exports.get = function(req, res) {            
        var message = req.flash('loginMessage');
        
        if (message.length === 0)
            message = [{ message: '', type: '' }];
        
        res.render('login/index.html', { message: message[0].message, type: message[0].type });
    };
        
    exports.post = passport.authenticate('local-login', { successRedirect : '/', failureRedirect : '/login', failureFlash : true });
        
});