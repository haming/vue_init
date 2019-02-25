var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validateMobile: function (value) {
        var result = {
            isCorrect:true,
            type:"modal",
            msg:"请输入正确的手机号码",
            code:""
        }
        var patt1 = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");//验证长度，第一位数必须是1
        if (!patt1.test(value)) {
            result.isCorrect = false;
        }
        return result;
    },
});


module.exports = input;
