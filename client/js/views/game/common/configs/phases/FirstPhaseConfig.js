define([
    'views/game/common/configs/effects/ParallaxOneConfig',
    'views/game/common/configs/effects/ParallaxTwoConfig',
    'views/game/common/configs/backgrounds/MovingBackgroundOneConfig',
    'views/game/common/backgrounds/MovingBackground',
    'views/game/common/effects/Parallax'
], function (
    ParallaxOneConfig,
    ParallaxTwoConfig,
    MovingBackgroundOneConfig,
    MovingBackground,
    Parallax
) {

    function FirstPhaseConfig() { }

    FirstPhaseConfig.character = { type: 'Ship' };

    FirstPhaseConfig.phase = { type: MovingBackground, config: MovingBackgroundOneConfig };

    FirstPhaseConfig.entities = {
        effect01: { type: Parallax, config: ParallaxOneConfig },
        effect02: { type: Parallax, config: ParallaxTwoConfig }
    };

    return FirstPhaseConfig;

});