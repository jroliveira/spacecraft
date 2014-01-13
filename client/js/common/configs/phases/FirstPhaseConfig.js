define([
    'common/configs/effects/ParallaxOneConfig',
    'common/configs/effects/ParallaxTwoConfig',
    'common/configs/backgrounds/MovingBackgroundOneConfig',
    'common/backgrounds/MovingBackground',
    'common/effects/Parallax'
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