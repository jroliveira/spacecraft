define([
    'exports',
    'mongoose',
    
    'server/models/Projectile'
], function (
    exports, 
    mongoose,
     
    Projectile
) {

    exports.all = function (req, res) {        
        Projectile.find(function (err, projectiles) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(200, projectiles);
            }
        });
    };
        
    exports.get = function (req, res) {
        Projectile.findById(req.params._id, function (err, projectile) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(200, projectile);
            }
        });
    };
        
    exports.post = function (req, res) {
        var model = req.body;
        
        var projectile = new Projectile({
            type: model.type,
            
            health: model.health, 
            damage: model.damage, 
            speed: model.speed,
            
            components: model.components,
            image: model.image,
            
            width: model.width,
            height: model.height, 
            canvas: model.canvas
        });
        
        projectile.save(function (err){
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                res.json(201, projectile);
            }
        });
    };
        
    exports.put = function (req, res) {
        var model = req.body;
        
        Projectile.findById(req.params._id, function (err, projectile) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                projectile.type = model.type;
            
                projectile.health = model.health;
                projectile.damage = model.damage;
                projectile.speed = model.speed;
                
                projectile.components = model.components;
                projectile.image = model.image;
                
                projectile.width = model.width;
                projectile.height = model.height;
                projectile.canvas = model.canvas;
                
                projectile.save(function (err){
                    if (err) {
                        res.json(500, { error: err });
                        console.log(err);
                    } else {
                        res.json(200, projectile);
                    }
                });
            }
        });
    };
        
    exports.delete = function (req, res) {
        Projectile.findById(req.params._id, function (err, projectile) {
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                projectile.remove(function (err){
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