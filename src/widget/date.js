var CentralWidget = require('./CentralWidget');

var date = $.extend({}, CentralWidget, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    type: 'date', //组件的类别，用于service层动态对比配置进行实例化

    start: "", //组件允许选择的开始日期
    end: "",//组件允许选择的结束日期

    startDate: "",//用于计算年龄的日期参数

    relationship: '',
    relationshipConfig: { //产品允许的投保日期
        "00": {
            start: { type: 'Y', value: 65 },
            end: { type: 'Y', value: 18 }
        },
        "01": {
            start: { type: 'Y', value: 65 },
            end: { type: 'Y', value: 18 }
        },
        "03": {
            start: { type: 'Y', value: 65 },
            end: { type: 'D', value: 60 }
        },
        "02": {
            start: { type: 'Y', value: 65 },
            end: { type: 'Y', value: 18 }
        },
        "13": {
            start: { type: 'Y', value: 65 },
            end: { type: 'Y', value: 18 }
        },
    },

    //身份证有效期次日fix
    fixIdTypeExpDate: function () {
        var that = this;
        try {
            that.end = "";
            that.start = that.addDate(new Date(), 1);
        } catch (e) {

            console.log(e)
        }
    },
    /**
     * 用于根据与投保人关系、prd要求的配置，设置正确的开始及结束日期限制
     * 使用前，请正确设置relationship 及 relationshipConfig
     */
    fixStarEndDateByRelationship: function (effectiveDate, relationship) {

        var that = this;

        try {
            var config = that.relationshipConfig[relationship];
            var result = that.calDate(effectiveDate, config)
            that.end = result.end;
            that.start = result.start;
        } catch (e) {

            console.log(e)
        }

    },
    /**
     * 如果年龄不在可选范围内，则处理正确
     */
    fixDateNotBeteenStartAndEnd: function () {

        function CompareDate(d1, d2) {
            return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
        }
        var that = this;
        //修复value值不在start 与 end 之间的问题
        if (that.start && that.end && that.value) {
            var startDateMill = new Date(that.start).getTime();
            var endDateMill = new Date(that.end).getTime();
            var valueDateMill = new Date(that.value).getTime();

            if (valueDateMill >= startDateMill && valueDateMill <= endDateMill) {

            } else { //值不在可选范围内
                that.value = '1980-01-01'
            }

        }


    },
    calDate: function (effectiveDate, config) {
        var that = this;
        var result = {
            start: "",
            end: ""
        }
        console.log(config)

        try {
            var oneDay = 86400000; //一天的毫秒数
            var effectiveDateMS = new Date(effectiveDate).getTime();

            //计算end
            if (config.end.type == 'D') {
                var time = effectiveDateMS - (oneDay * config.end.value);
                var yearToCompare = parseInt(new Date(time).getFullYear())
                var monthToCompare = parseInt(new Date(time).getMonth() + 1)
                var dateToCompare = parseInt(new Date(time).getDate())
                result.end = yearToCompare + "-" + that.getFormatDate(monthToCompare) + '-' + that.getFormatDate(dateToCompare + 0);
            } else if (config.end.type == 'Y') {
                var yearToCompare = parseInt(new Date(effectiveDate).getFullYear())
                var monthToCompare = parseInt(new Date(effectiveDate).getMonth() + 1)
                var dateToCompare = parseInt(new Date(effectiveDate).getDate())
                result.end = yearToCompare - config.end.value + "-" + that.getFormatDate(monthToCompare) + '-' + that.getFormatDate(dateToCompare + 0);
            }

            //计算start
            if (config.start.type == 'D') {
                var time = effectiveDateMS - (oneDay * config.start.value);
                var yearToCompare = parseInt(new Date(time).getFullYear())
                var monthToCompare = parseInt(new Date(time).getMonth() + 1)
                var dateToCompare = parseInt(new Date(time).getDate())
                result.start = yearToCompare + "-" + that.getFormatDate(monthToCompare) + '-' + that.getFormatDate(dateToCompare + 0);
            } else if (config.start.type == 'Y') {
                var yearToCompare = parseInt(new Date(effectiveDate).getFullYear())
                var monthToCompare = parseInt(new Date(effectiveDate).getMonth() + 1)
                var dateToCompare = parseInt(new Date(effectiveDate).getDate())
                result.start = yearToCompare - (config.start.value + 1) + "-" + that.getFormatDate(monthToCompare) + '-' + that.getFormatDate(dateToCompare + 1);
            }
        } catch (e) {
            console.log(e)
        }

        return result
    },
    addDate: function (date, days) {
        var that = this;

        if (days == undefined || days == '') {
            days = 1;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + that.getFormatDate(month) + '-' + that.getFormatDate(day);
    },
    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    getFormatDate: function (arg) {
        if (arg == undefined || arg == '') {
            return '';
        }

        var re = arg + '';
        if (re.length < 2) {
            re = '0' + re;
        }

        return re;
    }


});

module.exports = date;
