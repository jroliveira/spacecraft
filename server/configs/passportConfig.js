define([
    'passport',
    'passport-local',
    
    'server/models/Account'
], function (
    passport,
    passportLocal,
     
    Account
) {
    'use strict';
        
    var passportConfig = function () {

        passport.serializeUser(function(account, done) {
            done(null, account.id);
        });
    
        passport.deserializeUser(function(id, done) {
            Account.findById(id, function(err, account) {
                done(err, account);
            });
        });
    
        passport.use('local-signup', new passportLocal.Strategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },    
        function(req, email, password, done) {
            Account.findOne({ 'email' :  email }, function(err, account) {
                if (err)
                    return done(err);
    
                if (account)
                    return done(null, false, req.flash('signupMessage', 'That e-mail is already taken'));
                
                var newAccount = new Account();
                
                if (!newAccount.validEmail(email))
                    return done(null, false, req.flash('signupMessage', 'The e-mail is not a valid'));
                
                newAccount.email = email;
                newAccount.password = newAccount.generateHash(password);

                newAccount.save(function(err) {
                    if (err) 
                        throw err;

                    return done(null, newAccount, req.flash('loginMessage', { message: 'Account created successfully', type: 'alert alert-success' }));
                });
            });
        }));
    
        passport.use('local-login', new passportLocal.Strategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            Account.findOne({ 'email' :  email }, function(err, account) {
                if (err) 
                    return done(err);
    
                if (!account)
                    return done(null, false, req.flash('loginMessage', { message: 'Invalid email or password.', type: 'alert-danger' }));
    
                if (!account.validPassword(password))
                    return done(null, false, req.flash('loginMessage', { message: 'Invalid email or password.', type: 'alert-danger' }));
    
                return done(null, account);
            });
        }));
        
        return passport;
    }

    
    return passportConfig;

});