define([
    'mongoose'
], function (
    mongoose
) {

    'use strict';
        
    var Projectile = mongoose.model('Projectile', {        
        type: { type: String, trim: true, unique: true, required: true },
        
        health: { type: Number, min: 1, required: true },
        damage: { type: Number, min: 1, required: true },
        speed: { type: Number, min: 1, required: true },
        
        components: [String],
        image: { 
            src: String
        },
        
        width: { type: Number, min: 1, required: true },
        height: { type: Number, min: 1, required: true },
        canvas: {
            width: Number,
            height: Number
        }
    });
       
    return Projectile;

});