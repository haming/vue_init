var CentralValidate = { //总的

    validate: function (name,value) { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];
        for (var key in that) {
            if (typeof (that[key]) == "function" && key != "validate") {
                var runningFunc = that[key](value);
                if (!runningFunc.isCorrect) {
                    if(key == "notNull"){
                        errors.push({ type: runningFunc.type, msg:name + runningFunc.msg, code: runningFunc.code });
                    }else{
                        if(runningFunc["isUse"]){
                            errors.push({ type: runningFunc.type, msg:name + runningFunc.msg, code: runningFunc.code });
                        }else{
                            errors.push({ type: runningFunc.type, msg:runningFunc.msg, code: runningFunc.code });
                        }
                    }
                }
            }
        }
        return errors.length > 0 ? errors : null;
    },

    notNull: function (value) { //用于验证，如有错误，返回数组，便于前端提示
        var result = {
            isCorrect:true,
            type:"modal",
            msg:"不为空",
            code:""
        };
        if (value != "" && value != 0 && value != '0') {//不为空
            
        }else{//为空
            result.isCorrect = false;
        }
        return result;
    },

};


module.exports = CentralValidate;
