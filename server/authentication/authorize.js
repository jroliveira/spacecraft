define([ ], function () {
    
    var authorize = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        
        res.redirect('/login?redirect={0}'.format(req.originalUrl));
    }

    return authorize;

});