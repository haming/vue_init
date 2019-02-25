var CentralWidget = require('./CentralWidget');

var input = $.extend({}, CentralWidget, {
    type: 'number',
    fix: function () {
        var data = this.keepOnlyNumber(this.value);
        if (data) {
            this.value = data;
        }
    },
    keepOnlyNumber: function (value) {
        value = value.toString();
        var newstr;
        var regexp = /[^\d]]*/g;
        newstr = value.replace(regexp, "");
        return newstr
    },
});


module.exports = input;
