var parentWidget = require('./order_to_premiul_trial_form_widget');

var widget = $.extend({}, parentWidget, {

    fix: function () {
        var that = this;

        //（默认为空，允许编辑，
        // 基本保险金额须为1万元整数倍。
        // 若为成年人，最低基本保险金额为20万元；
        var form = that.form[0];

        var insuredBirthday = form.birthday.value
        var insuredAmount = form.amnt.value

        // 最低基本保险金额为10万元）
        if (insuredAmount < 10) {
            form.amnt.value = 10;
        }

        that.service.getUserAge(that.urlParams, insuredBirthday)
            .then(function (data) {
                console.log("getUserAge", data);
            })

        var effectiveDate = that.effectiveDate;
        var relationship = form.relationship.value;

        try {
            form.birthday.fixStarEndDateByRelationship(effectiveDate, relationship);
            form.birthday.fixDateNotBeteenStartAndEnd(); //如果已选日期不在可选之中，则清空设置默认值 1980-01-01
        } catch (e) {

        }
        if (that.userInfo) {
            if (form.relationship.value == "01") {
                if (that.userInfo.data.employeeSex == "0") {
                    form.sex.value = "1";
                } else if (that.userInfo.data.employeeSex == "1") {
                    form.sex.value = "0";
                }
            }
        }
    },
    fixRelationShip: function () {//修改投保对象
        var that = this;
        var form = that.form[0];
        if (form.relationship.value == "00") {//判断本人
            if (that.userInfo) {
                if (that.userInfo.data.employeeSex) {
                    form.sex.value = that.userInfo.data.employeeSex;
                }
                if (that.userInfo.data.employeeBirthday) {
                    form.birthday.value = that.userInfo.data.employeeBirthday;
                }
            }
        }
    },
    validate: function () {
        var deferred = $.Deferred();
        var that = this;
        var errors = [];
        var form = that.form[0];
        var insuredAmount = form.amnt.value
        if (insuredAmount < 10) {
            errors.push({type: "modal", msg: '最低基本保险金额为10万元', code: ''})
        }

        errors = errors.length > 0 ? errors : null;
        deferred.resolve(errors);
        return deferred;

    }
});


module.exports = widget;
