var validatorsWidgets = require('../validator/index')
var CentralWidget = { //总的
    type: 'central', //组件的类别，用于service层动态对比配置进行实例化
    validatorsWidgets: validatorsWidgets,
    id: '',
    name: '',
    serieNo: '',
    defaultValue: '', //默认值
    value: '', //页面显示的值
    visible: true,
    validators: [],
    validate: function () { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];
        console.log(that.name + ':执行了validate操作:value为'+that.value)

        try {
            if (that.validators.length == 0) {
                var error = that.validatorsWidgets.common.validate(that.name, that.value)
                if (error) {
                    errors.push(error)
                }
            } else {
                for (var i = 0; i < that.validators.length; i++) {
                    var validatorName = that.validators[i];
                    var error = that.validatorsWidgets[validatorName].validate(that.name, that.value)
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
    display: function () { //用于编码、数字等代号转换成文字，以供阅读
        return value;
    },
    fix: function () { //自动修复，例如去除空格，大小写转换等逻辑
        var that = this;
        console.log(that.value + ':执行了fix操作')
    },
    setValue: function (value) { //设置值
        var that = this;
        that.value = value;
    },
    getValue: function () { //获取值
        var that = this;
        return that.value;
    },
    getAge: function (startDate, birthday) {
        try {
            var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) return false;
            var birth = new Date(r[1], r[3] - 1, r[4]);
            if (birth.getFullYear() == r[1] && (birth.getMonth() + 1) == r[3] && birth.getDate() == r[4]) {
                var today = new Date(startDate);
                var age = today.getFullYear() - r[1];

                if (today.getMonth() > birth.getMonth()) {
                    return age;
                }
                if (today.getMonth() == birth.getMonth()) {
                    if (today.getDate() >= birth.getDate()) {
                        return age;
                    } else {
                        return age - 1;
                    }
                }
                if (today.getMonth() < birth.getMonth()) {
                    return age - 1;
                }
            }
        } catch (e) {
            console.log(e)
            return ("输入的日期格式错误！");
        }

        //尝试异步获取年龄


    },
};
module.exports = CentralWidget;
