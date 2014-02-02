define([
    'server/configs/passportConfig',
    'server/configs/appConfig',
    'server/configs/mongooseConfig'
], function (
    passportConfig,
    appConfig,
    mongooseConfig
) {
    'use strict';
        
    return {
    
        passport: passportConfig,
        
        app: appConfig,
        
        mongoose: mongooseConfig
        
    };

});