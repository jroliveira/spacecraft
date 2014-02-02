define([
    'exports',
    'mongoose',
    
    'server/models/Character'
], function (
    exports, 
    mongoose,
     
    Character
) {

    exports.all = function (req, res) {        
        Character.find(function (err, characters) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(200, characters);
            }
        });
    };
        
    exports.get = function (req, res) {
        Character.findById(req.params._id, function (err, character) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(200, character);
            }
        });
    };
        
    exports.post = function (req, res) {
        var model = req.body;
        
        var character = new Character({
            type: model.type,
            
            health: model.health, 
            damage: model.damage, 
            speed: model.speed,
            
            timeNextMove: model.timeNextMove,
            
            projectiles: model.projectiles,
            
            components: model.components,
            image: model.image,
            
            width: model.width,
            height: model.height, 
            canvas: model.canvas,
            pos: model.pos,
            sprite: model.sprite            
        });
        
        character.save(function (err){
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(201, character);
            }
        });
    };
        
    exports.put = function (req, res) {
        var model = req.body;
        
        Character.findById(req.params._id, function (err, character) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                character.type = model.type;
            
                character.health = model.health;
                character.damage = model.damage;
                character.speed = model.speed;
                
                character.timeNextMove = model.timeNextMove;
            
                character.projectiles = model.projectiles;
                
                character.components = model.components;
                character.image = model.image;
                
                character.width = model.width;
                character.height = model.height;
                character.canvas = model.canvas;
                
                character.pos = model.pos;
                character.sprite = model.sprite;
                
                character.save(function (err){
                    if (err) {
                        res.json(500, { error: err });
                        console.log(err);
                    } else {
                        res.json(200, character);
                    }
                });
            }
        });
    };
        
    exports.delete = function (req, res) {
        Character.findById(req.params._id, function (err, character) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                character.remove(function (err){
                    if (err) {
                        res.json(500, { error: err });
                        console.log(err);
                    } else {
                        res.json(204);
                    }
                });
            }
        });
    };

});