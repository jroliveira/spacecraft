define([
    'underscore',
    'backbone',
    'router',
    
    'text!templates/loading.html'
], function (
    _,
    Backbone,
    router,
     
    templateLoading
) {

    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    _.each(["Model", "Collection"], function(name) {
        var ctor = Backbone[name];
        var fetch = ctor.prototype.fetch;
        ctor.prototype.fetch = function() {
            $('article').html(templateLoading);
            this.trigger("fetch", this);
            return fetch.apply(this, arguments);
        };
    });

    var initialize = function () {        
        router.initialize();
    };

    return {
        initialize: initialize
    };
    
});