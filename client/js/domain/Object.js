define([], function() {

    var object = (function () {

        function Object() {
            
        }
        
        Object.prototype.pos = {
            x: 0,
            y: 0
        };

        return Object;

    })();

    return object;

});