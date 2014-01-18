require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        order: 'libs/require/order',
        text: 'libs/require/text',
        db: 'libs/db/db',
        wait: 'libs/wait',
        bootstrap: 'libs/bootstrap/js/bootstrap'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        db: {
            exports: 'db'
        },
        wait: {
            deps: ['jquery'],
            exports: 'wait'
        },
        bootstrap: {
            deps: ["jquery"]
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});