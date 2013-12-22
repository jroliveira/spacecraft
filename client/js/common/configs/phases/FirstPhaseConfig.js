define([
    'common/configs/characters/ShipConfig',
    'common/configs/effects/ParallaxOneConfig',
    'common/configs/effects/ParallaxTwoConfig',
    'common/configs/effects/MovingBackgroundOneConfig',

    'common/effects/MovingBackground',
    'common/effects/Parallax',

    'domain/characters/Ship'
], function (
    ShipConfig,
    ParallaxOneConfig,
    ParallaxTwoConfig,
    MovingBackgroundOneConfig,

    MovingBackground,
    Parallax,

    Ship
) {

    function FirstPhaseConfig() { }

    FirstPhaseConfig.entities = {
        character: { entity: Ship, config: ShipConfig },
        background: { entity: MovingBackground, config: MovingBackgroundOneConfig },
        effect01: { entity: Parallax, config: ParallaxOneConfig },
        effect02: { entity: Parallax, config: ParallaxTwoConfig }
    };

    return FirstPhaseConfig;

});