require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        db: 'libs/db/db',
        wait: 'libs/wait'
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
        },
        wait: {
            deps: ['jquery'],
            exports: 'wait'
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});