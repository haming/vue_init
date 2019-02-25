var date600 = require('./date');

var date701 = $.extend({}, date600, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    relationshipConfig: { //产品允许的投保日期
        "00": {
            start: { type: 'Y', value: 60 },
            end: { type: 'Y', value: 18 }
        },
        "01": {
            start: { type: 'Y', value: 60 },
            end: { type: 'Y', value: 18 }
        },
        "03": {
            start: { type: 'Y', value: 60 },
            end: { type: 'D', value: 28 }
        },
        "02": {
            start: { type: 'Y', value: 60 },
            end: { type: 'Y', value: 18 }
        },
        "13": {
            start: { type: 'Y', value: 60 },
            end: { type: 'Y', value: 18 }
        },
    }

});

module.exports = date701;
