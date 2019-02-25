var Centraldate = require('./date');

var date = $.extend({}, Centraldate, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    validate:function(){
        return [];
    },
    validateIdAgeAndIDExpiryDate: function ( age, ic_expiry_day, ic_type, ic_is_long_valid, relationship, effectiveDate) {
        var deferred = $.Deferred();
        var own = "投保人";
        var family = "被保险人";
        var result = [{
            isCorrect:true,
            type:"modal",
            msg:"请选择身份证有效期",
            code:""
        }];
        console.log(age, ic_expiry_day, ic_type, ic_is_long_valid, relationship, effectiveDate)
        //console.log("validateIdAgeAndIDExpiryDate", name, age, birthday, ic_expiry_day, ic_type, ic_is_long_valid,relationship, effectiveDate)//利用传参数的做法
        var oneDay = 86400000;
        var orderDate = new Date(ic_expiry_day).getTime(); //用户选择的
        var effectiveDate = new Date(effectiveDate); //用户选择的
        var Date5 = new Date((effectiveDate.getFullYear() + 5) + '/' + (effectiveDate.getMonth() + 1) + '/' + effectiveDate.getDate());
        Date5 = Date5.getTime();
        var Date10 = new Date((effectiveDate.getFullYear() + 10) + '/' + (effectiveDate.getMonth() + 1) + '/' + effectiveDate.getDate());
        Date10 = Date10.getTime();
        var Date20 = new Date((effectiveDate.getFullYear() + 20) + '/' + (effectiveDate.getMonth() + 1) + '/' + effectiveDate.getDate());
        Date20 = Date20.getTime();
        //console.log("validateIdAgeAndIDExpiryDate:effectiveDate", orderDate, Date5);
        // 当客户证件类型为“身份证”，证件有效期默认不勾选，具体逻辑为：
        // 1. 投保人小于16周岁，证件有效期-当前日期必须小于或等于5年；
        // 2. 投保人16周岁（含）至25周岁（含），证件有效期-当前日期必须小于或等于10年；
        // 3. 投保人26周岁（含）至45周岁（含），证件有效期-当前日期必须小于或等于20年；
        // 4.投保人年龄≥46周岁（含），若选择长期，默认传2099-1-1；若选择指定日期，则证件有效期-当前日期必须小于或等于20年
        if (ic_type == "I" && ic_is_long_valid == "0") {
            if (age < 16) {
                if (orderDate > Date5) {
                    result[0].msg = (relationship=="00"?own:family)+"证件有效期-当前日期必须小于或等于5年";
                    result[0].isCorrect = false;
                    return result
                } else {
                    return result[0].isCorrect?[]:result;
                }
            }
            else if (age >= 16 && age <= 25) {
                if (orderDate > Date10) {
                    result[0].msg = (relationship=="00"?own:family)+"的证件有效期-当前日期必须小于或等于10年";
                    result[0].isCorrect = false;
                    return result
                } else {
                    return result[0].isCorrect?[]:result;
                }
            }
            else if (age >= 26 && age <= 45) {
                if (orderDate > Date20) {
                    result[0].msg = (relationship=="00"?own:family)+"的证件有效期-当前日期必须小于或等于20年"
                    result[0].isCorrect = false;
                    return result
                } else {
                    return result[0].isCorrect?[]:result;
                }
            }
            else if (age >= 46) {
                if (orderDate > Date20) {
                    result[0].msg = (relationship=="00"?own:family)+"的证件有效期-当前日期必须小于或等于20年"
                    result[0].isCorrect = false;
                    return result
                } else {
                    return result[0].isCorrect?[]:result;
                }
            }
        }
        else {
            if (ic_type == "I" && ic_is_long_valid == "1") {
                if (age >= 46) {
                    return result[0].isCorrect?[]:result;
                } else {
                        result[0].msg = (relationship=="00"?own:family)+"证件有效期不合理，请确认证件有效期"
                    result[0].isCorrect = false;
                    return result
                }
            } else {
                return result[0].isCorrect?[]:result;
            }
        }
        return deferred;
    },


});

module.exports = date;
