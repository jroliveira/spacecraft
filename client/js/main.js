require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        order: 'libs/require/order',
        text: 'libs/require/text',
        db: 'libs/db/db',
        wait: 'libs/wait',
        bootstrap: 'libs/bootstrap/js/bootstrap',
        socketio: '../../socket.io/socket.io',
        'jquery.format': 'libs/jquery.format-1.2/jquery.format-1.2',
        datejs: 'libs/datejs/date',
        'datejs.pt-BR': 'libs/datejs/date-pt-BR'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
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
        },
        socketio: {
            exports: 'io'
        },
        'jquery.format': {
            deps: ["jquery"]
        },
        datejs: {
            deps: ["jquery"]
        },
        'datejs.pt-BR': {
            deps: ["jquery", "datejs"]
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});