var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validate: function (name,selectValue,inputValue,visible) { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];

        if(visible){
            if(selectValue){
                if(selectValue == "7"&&!inputValue){
                    errors.push({ type: "modal", msg:"职级选择其它，请补充职级具体描述", code: "" });
                }
            }else{
                if(selectValue ==="0"){
                }else{
                    errors.push({ type: "modal", msg:"职级不为空", code: "" });
                }
            }
        }
        


        return errors.length > 0 ? errors : null;
    },
});


module.exports = input;
