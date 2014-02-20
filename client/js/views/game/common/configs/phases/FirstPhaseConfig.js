define([
    'views/game/common/configs/effects/ParallaxOneConfig',
    'views/game/common/configs/effects/ParallaxTwoConfig',
    'views/game/common/effects/Parallax'
], function (
    ParallaxOneConfig,
    ParallaxTwoConfig,
    Parallax
) {

    function FirstPhaseConfig() { }

    FirstPhaseConfig.character = { type: 'Ship' };

    FirstPhaseConfig.phase = { config: 'oneMoving' };

    FirstPhaseConfig.entities = {
        effect01: { type: Parallax, config: ParallaxOneConfig },
        effect02: { type: Parallax, config: ParallaxTwoConfig }
    };

    return FirstPhaseConfig;

});