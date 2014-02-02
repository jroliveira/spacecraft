define([
    'mongoose'
], function (
    mongoose
) {

    'use strict';
        
    var Character = mongoose.model('Character', {
        type: { type: String, trim: true, unique: true, required: true },
        
        health: { type: Number, min: 1, required: true },
        damage: { type: Number, min: 1, required: true },
        speed: { 
            up: Number, 
            left: Number, 
            right: Number, 
            down: Number 
        },
        
        timeNextMove: { type: Number, min: 1, required: true },
        
        projectiles: {
            first: String,
            second: String
        },
        
        components: [String],
        image: {
            width: Number,
            height: Number,
            src: String
        },
        
        width: { type: Number, min: 1, required: true },
        height: { type: Number, min: 1, required: true },
        canvas: {
            width: Number,
            height: Number
        },
        pos: { 
            x: Number, 
            y: Number 
        },
        sprite: { 
            row: Number, 
            col: Number 
        }
    });
       
    return Character;

});