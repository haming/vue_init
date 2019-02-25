/**
 * Created by gthowe on 17/4/19.
 */
var calculateDate = {

    calDate: function (effectiveDate, relationship) {
        var result = {
            dateAllowedMin: "",
            dateAllowedMax: ""
        }

        var dateAllowedMax;
        var dateAllowedMin;
        var yearToCompare = parseInt(effectiveDate.split('-')[0])
        var monthToCompare = parseInt(effectiveDate.split('-')[1])
        var dateToCompare = parseInt(effectiveDate.split('-')[2])
        var oneDay = 86400000; //一天的毫秒数
        var SixtyDays = oneDay * 60;
        var effectiveDateMS = new Date(effectiveDate).getTime();
        var minimumDate = effectiveDateMS - SixtyDays;  //生效日期 - 60天


        if (relationship == "03" || relationship == "09") {
            var time = effectiveDateMS - (oneDay * 30);
            var MaxyearToCompare = parseInt(new Date(time).getFullYear())
            var MaxmonthToCompare = parseInt(new Date(time).getMonth() + 1)
            var MaxdateToCompare = parseInt(new Date(time).getDate())

            result.dateAllowedMax = MaxyearToCompare + "-" + (MaxmonthToCompare) + '-' + (MaxdateToCompare + 0);
            result.dateAllowedMin = yearToCompare - 61 + "-" + monthToCompare + '-' + (dateToCompare + 1);

            console.log('UTIL:calDate:计算出生效日:', result);
            return result
        } else {
            result.dateAllowedMax = yearToCompare - 18 + "-" + monthToCompare + '-' + (dateToCompare + 0);
            result.dateAllowedMin = yearToCompare - 61 + "-" + (monthToCompare) + '-' + (dateToCompare + 1);
            console.log('UTIL:calDate:计算出生效日:', result);
            return result
        }
    }
};

module.exports = calculateDate;
