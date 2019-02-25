var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validateName: function (value) {
        var validateNameWithChineseAndEnGT2 = function (value) {
            var result = {isValid: true, tips: ''};
            var patt1 = new RegExp(/^[\u4e00-\u9fa5]{2,}[a-zA-Z]{0,}$/);//验证只能中文输入
            if (!patt1.test(value)) {
                result.isValid = false;
            }
            return result.isValid;
        }
        var validateNameWithENGT2 = function (value) {

            var result = {isValid: true, tips: ''};
            var patt1 = new RegExp(/^[a-zA-Z\s]{4,}$/);//验证只能中文输入
            if (!patt1.test(value)) {
                result.isValid = false;
            }
            return result.isValid;
        }
        var result = {
            isCorrect:true,
            type:"modal",
            msg:"必须含有两个或以上中文字符,或者四位或以上英文字符,且不能含有阿拉伯数字或空格",
            code:"",
            isUse:true
        };

        if (value) {
            if (value.indexOf(" ") != -1) {//有空格
                result.isCorrect = false
            }
            if (validateNameWithChineseAndEnGT2(value)|| validateNameWithENGT2(value)) {
            } else {
                result.isCorrect = false
            }
        }
        
        return result;
    },

});


module.exports = input;
