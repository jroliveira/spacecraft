define([
    'exports',
    'mongoose',
    
    'server/models/Projectile',
    'server/models/Character',
    'server/models/Account'
], function (
    exports,
    mongoose,
     
    Projectile,
    Character,
    Account
) {
    
    exports.index = function(req, res) {
        
        var projectiles = [
            new Projectile({
                type: 'bullet',
                health: 1, damage: 3, speed: 3,
                components: [
                    { type: 'Img', src: 'projectiles_bullet.png' }
                ],
                width: 9, height: 8, canvas: { width: 1170, height: 600 }
            }), 
            new Projectile({
                type: 'laser',
                health: 1, damage: 10, speed: 7,
                components: [
                    { type: 'Img', src: 'projectiles_laser.png' }
                ],
                width: 39, height: 17, canvas: { width: 1170, height: 600 }
            }), 
            new Projectile({
                type: 'missile',
                health: 1, damage: 5, speed: 5,
                components: [
                    { type: 'Img', src: 'projectiles_missile.png' }
                ],
                width: 51, height: 10, canvas: { width: 1170, height: 600 }
            })
        ];
        
        var characters = [
            new Character({
                type: 'Ship',
                health: 50, damage: 100, speed: { up: 2, left: 2, right: 2, down: 2 },
                timeNextMove: 5,
                projectiles: { first: 'bullet', second: 'missile' },
                components: [
                    { type: 'Sprite', src: 'characters_shipSprite.png', width: 43, height: 39 },
                    { type: 'HealthBar' }
                ],
                width: 43 * 1.5, height: 39 * 1.5, canvas: { width: 1170, height: 600 }, pos: { x: 1, y: 10 }, sprite: { row: 0, col: 0 }
            }),
            new Character({
                type: 'Soldier',
                health: 50, damage: 100, speed: { up: 2, left: 2, right: 2, down: 2 },
                timeNextMove: 15,
                projectiles: { first: 'bullet', second: 'missile' },
                components: [
                    { type: 'Sprite', src: 'characters_soldierSprite.png', width: 32, height: 32 }, 
                    { type: 'HealthBar' }
                ],
                width: 32 * 1.5, height: 32 * 1.5, canvas: { width: 1170, height: 600 }, pos: { x: 1, y: 10 }, sprite: { row: 0, col: 0 }
            })
        ];
        
        var account = new Account();
        account.email = 'junolive@gmail.com';
        account.password = account.generateHash('legal');
        
        Projectile.remove({}, function (err) {
            projectiles.forEach(function (projectile) {                
                projectile.save(); 
            });
            
            Character.remove({}, function (err) {
                characters.forEach(function (character) {                
                    character.save(); 
                });
                
                Account.remove({}, function(err) {
                    account.save();
                    
                    res.render('setup/index.html');
                });
            });
        });

    };
        
});