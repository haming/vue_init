var CentralWidget = require('./select');

var select = $.extend({}, CentralWidget, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    type: 'select_and_input', //组件的类别，用于service层动态对比配置进行实例化
    selectValue: '',
    inputValue: '',
    inputVisible: true,
    selectVisible: true,
    validate: function () { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];

        try {
            if (that.validators.length == 0) {
                var error = that.validatorsWidgets.common.validate(that.name, that.selectValue,that.inputValue,that.visible)
                if (error) {
                    errors.push(error)
                }
            } else {
                for (var i = 0; i < that.validators.length; i++) {
                    var validatorName = that.validators[i];
                    var error = that.validatorsWidgets[validatorName].validate(that.name, that.selectValue,that.inputValue,that.visible)
                    if (error) {
                        errors.push(error)
                    }
                }
            }

        } catch (e) {
            console.log(e)
        }
        return errors.length > 0 ? errors : [];
    },
});


module.exports = select;
