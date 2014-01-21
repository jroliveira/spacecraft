define([
    'underscore',
    'backbone',
    'router'
], function (
    _,
    Backbone,
    router
) {

    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    var initialize = function () {        
        router.initialize();
    };

    return {
        initialize: initialize
    };
    
});