var insureAmount = require('./input');

var input = $.extend({}, insureAmount, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    type: 'insureAmount', //组件的类别，用于service层动态对比配置进行实例化
    // validate: function () { //用于验证，如有错误，返回数组，便于前端提示
    //     var that = this;
    //     var errors = [];
    //     for (var i = 0; i < that.validators.length; i++) {
    //         var validatorName = that.validators[i];
    //         var error = that.validatorsWidgets[validatorName].validate(that.value)

    //         if(error){
    //             errors.push(error)
    //         }
    //     }
    //     if (that.value < 10) {
    //         errors.push({type: 'modal', msg: "最低基本保险金额为10万元"})
    //     }
    //
    //     console.log(that.value + ':执行了validate操作')
    //     return errors.length > 0 ? errors : null;
    // },
    setValue: function (value) { //设置值
        var that = this;
        that.value = value / 10000;
    },
    getValue: function () { //获取值
        var that = this;
        return that.value * 10000;
    },
    fix: function () { //自动修复，例如去除空格，大小写转换等逻辑
        var that = this;
        // if (that.value > 999 || that.value < 10) {
        //     that.value = 10;
        // }
    },
});


module.exports = input;
