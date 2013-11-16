define([], function () {

    function TimeManager() {
        this.last = new Date().getTime();
        this.current = new Date().getTime();
    }

    TimeManager.prototype.canUpdate = function () {
        if ((this.current - this.last) < 201) {
            return false;
        } else {
            this.last = this.current;
            return true;
        }
    };

    TimeManager.prototype.now = function () {
        this.current = new Date().getTime();
    };

    return TimeManager;

});