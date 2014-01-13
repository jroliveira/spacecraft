(function ($) {

    $.wait = function (time) {
        var defer = $.Deferred();

        setTimeout(function () { defer.resolve(); }, time);

        return defer.promise();
    };

}(jQuery));