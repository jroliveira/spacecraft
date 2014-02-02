define([
    'mongoose',
    'bcrypt-nodejs'
], function (
    mongoose,
    bcrypt
) {

    'use strict';
        
    var accountSchema = mongoose.Schema ({
        email: { type: String, trim: true, unique: true, required: true },
        password: { type: String, trim: true, required: true }
    });
        
    accountSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
        
    accountSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
       
    return mongoose.model('Account', accountSchema);

});