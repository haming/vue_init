var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validateEmail: function (value) {
        var result = {
            isCorrect:true,
            type:"modal",
            msg:"请输入正确的邮箱",
            code:""
        }

        // console.log("validateEmail:",value)
        var patt1 = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9_\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");//验证邮件
        if (!patt1.test(value)) {
            result.isCorrect = false;
        }
        return result;

    },
});


module.exports = input;
