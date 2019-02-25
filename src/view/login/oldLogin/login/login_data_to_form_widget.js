var CentralWidget = require('../../../widget/order_form');

var widget = $.extend({}, CentralWidget, {
    formHtml: '',
    startDate: '', //用于计算年龄的基准日期
    effectiveDate: '', //用于计算出生日期组件min max 限制的基准日期

    order: { // 登录数据结构
        employee_number: '',
        employee_name: '',
        mobile_phone: '',
        verification_code: '',
        authImage_Code: '',
        type: '',
        organization_id: '',
    },
    form: { //登录表单
        employee_number: '',
        employee_name: '',
        mobile_phone: '',
        verification_code: '',
        authImage_Code: '',
        type: '',
        organization_id: ''
    },

    orderToFormTransform: function () {
        var that = this;

        var order = that.order;
        var form = JSON.parse(JSON.stringify(order));

        //将配置自动化复制进组件
        var config = require('../../../widget/config').loginConfig;//读取投保人组件配置
        that.setUpWidgetService(form, config);
        that.form = form;
        return form;
    },
    formToOrderTransform: function () {
        var that = this;

        var form = that.form.$model;
        var order = that.converWidgetToData(form);
        that.order = order;

        return order;
    },
    fix: function (id) {
        console.log("fix",id)
        var that = this;
        var error
        if(id){
            error = that.form[id].validate();
            error.id = id
        }

        return error;
    },
    validate: function (id) {
        console.log("fix",id)
        var that = this;
        var errors;
        var errorsName = [];
        if(id){
            errors = that.form[id].validate();
            if(errors.length > 0)
            errorsName.push(id)
        }
        return errorsName.length > 0 ? errorsName : [];
    },
    widgetValidate: function (object) { //统一对组件进行自修复
        var errors = [];
        for (var x in object) {
            (function(x){
                if (object[x] && typeof object[x] == 'object' && object[x].validate) {
                    var error = object[x].validate();
                    if(error.length > 0){
                        error[0][0].id = object[x].id;
                    }
                    errors = errors.concat(error)
                }
            })(x)
        }
        console.log("errors",errors)
        return errors;
    },
});


module.exports = widget;
