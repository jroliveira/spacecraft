define([
    'mongoose'
], function (
    mongoose
) {
        
    var config = {
        user: 'sa',
        password: 'sa',
        server: 'alex.mongohq.com',
        port: '10022',
        database: 'spacecraft'
    };
        
    var mongooseConfig = function () {
        
        var connectionString = 'mongodb://' + config.user +  ':' + config.password + '@' + config.server + ':' + config.port + '/' + config.database;
        
        mongoose.connect(connectionString);
        
        return mongoose;
        
    };
        
    return mongooseConfig;

});