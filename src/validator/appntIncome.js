var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    notNull: "",
    income: function (value) { //用于验证，如有错误，返回数组，便于前端提示
        var result = {
            isCorrect:true,
            type:"modal",
            msg:"投保人为本人，年收入必须大于0",
            code:""
        };
        if (parseInt(value) >0) {//不为空
        }else{//为空
            result.isCorrect = false;
        }
        return result;
    },
});


module.exports = input;
