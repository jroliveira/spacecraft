require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
    },

    shim: {
        underscore: {
            exports: '_'
        }
    }
});

require(['app'], function (App) {
    App.initialize();
});