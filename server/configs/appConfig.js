define([
    'express',
    'module',
    'path',
    'consolidate',
    'passport',
    'connect-flash',
    'swig'
], function (
    express,
    module,
    path,
    consolidate,
    passport,
    flash,
    swig
) {
    'use strict';

    if (!String.prototype.format) {
        String.prototype.format = function() {
    
            var args = arguments;
            var sprintfRegex = /\{(\d+)\}/g;
        
            var sprintf = function (match, number) {
                return number in args ? args[number] : match;
            };
        
            return this.replace(sprintfRegex, sprintf);
        };
    }
        
    var dirname = path.dirname(module.uri);
        
    var appConfig = function (app) {

        app.configure(function () {
            app.use(express.json());
            app.use(express.urlencoded());
            
            app.engine('html', swig.renderFile);
            app.set('views', path.join(dirname, '/../../client/views'));
            app.set('view cache', false);
            swig.setDefaults({ cache: false });
            app.set('view engine', 'html');
            app.use('/client', express.static(path.join(dirname, '/../../client')));
            
            app.use(express.cookieParser());
            app.use(express.session({ secret: 'secretsession' }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(flash());
            
        });
        
        return app;
    }

    
    return appConfig;

});