var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validate: function (strToValidate) { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];

        if(false){
            errors.push({type: "modal", msg: '不能为空', code: ''})
        }

        // console.log(that.value + ':执行了validate操作')
        return errors.length > 0 ? errors : null;
    },
});


module.exports = input;
