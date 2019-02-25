var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validate: function (key, value) { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];
        if(that.value){
            errors.push({type: "modal", msg: key + '不能为空', code: ''})
        }
        // console.log(that.value + ':执行了validate操作')
        return errors.length > 0 ? errors : null;
    },
});


module.exports = input;
