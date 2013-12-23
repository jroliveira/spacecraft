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

    FirstPhaseConfig.character = { type: Ship, config: ShipConfig };

    FirstPhaseConfig.phase = { type: MovingBackground, config: MovingBackgroundOneConfig };

    FirstPhaseConfig.entities = {
        effect01: { type: Parallax, config: ParallaxOneConfig },
        effect02: { type: Parallax, config: ParallaxTwoConfig }
    };

    return FirstPhaseConfig;

});