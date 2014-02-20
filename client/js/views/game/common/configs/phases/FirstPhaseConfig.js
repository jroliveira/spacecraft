define([], function () {

    function FirstPhaseConfig() { }

    FirstPhaseConfig.character = { type: 'Ship' };

    FirstPhaseConfig.phase = { config: 'oneMoving' };

    FirstPhaseConfig.entities = {
        effect01: { config: 'one' },
        effect02: { config: 'two' }
    };

    return FirstPhaseConfig;

});