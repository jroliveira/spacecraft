require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        db: 'libs/db/db'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        db: {
            exports: 'db'
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});