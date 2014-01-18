define([
    'views/game/common/configs/backgrounds/BackgroundOneConfig',
    'views/game/common/backgrounds/Background'
], function (
    BackgroundOneConfig,
    Background
) {

    function StarbasePhaseConfig() { }

    StarbasePhaseConfig.character = { type: 'Soldier' };
    
    StarbasePhaseConfig.phase = { type: Background, config: BackgroundOneConfig };

    StarbasePhaseConfig.entities = null;

    return StarbasePhaseConfig;

});