var validate_3 = require('../../service/3-validate.js')
var CentralWidget = require('../../widget/order_form.js');
var inputFilter = require('../../service/inputFilter.js');

var order_to_form_widget = require('./order_to_form_widget');
var widget = $.extend({}, order_to_form_widget, {
    appntValidate: function (form) {
        var that = this;

        var errors = [];

        if (validate_3.checkIcNumber(form.appntNewForm.appntidType.value, form.appntNewForm.appntidNo.value, form.appntNewForm.appntSex.value, form.appntNewForm.appntBirthday.value).msg) {
            errors.push(validate_3.checkIcNumber(form.appntNewForm.appntidType.value, form.appntNewForm.appntidNo.value, form.appntNewForm.appntSex.value, form.appntNewForm.appntBirthday.value).msg)
        }

        if (validate_3.checkId(form.appntNewForm.nativePlace.value, form.appntNewForm.appntidType.value, form.appntNewForm.age).msg) {
            errors.push(validate_3.checkId(form.appntNewForm.nativePlace.value, form.appntNewForm.appntidType.value, form.appntNewForm.age).msg)
        }

        // occupationCode,companyOrSchool
        if (form.appntNewForm.occupationCode.value == ("D1" || "D2" || "D3")) {
        }
        else {
            if (!form.appntNewForm.companyOrSchool.value) {
                errors.push('请填写单位或学校')
            }
        }

        if (that.form.appntNewForm.contactDetailedAddress.city != "4420" && that.form.appntNewForm.contactDetailedAddress.city != "4419") {
            if (that.form.appntNewForm.contactDetailedAddress.district == false || that.form.appntNewForm.contactDetailedAddress.detail == false) {
                errors.push('请填写联系地址')
            }
        }


        if (!that.validateInputAddressLt5Cn(that.form.appntNewForm.contactDetailedAddress.detail)) {
            errors.push('投保人分段地址，详细地址不能少于5个中文字符')
        }
        return errors
    },
    insuredNewValidate: function (form) { //家属验证
        var that = this;
        var errors = [];
        //修复 投保人组件数据
        var appntNewForm = form.appntNewForm;
        //修复 被保人组件数据
        var insuredNewListForm;
        for (var i = 0; i < form.insuredNewListForm.length; i++) {
            insuredNewListForm = form.insuredNewListForm[i];
            console.log("insuredNewValidate:", insuredNewListForm)
            if (insuredNewListForm.relationToAppnt.value != "00") {

                if (validate_3.checkIcNumber(insuredNewListForm.insuredIdtype.value, insuredNewListForm.insuredIdno.value, insuredNewListForm.insuredSex.value, insuredNewListForm.insuredBirthday.value).msg) {
                    errors.push(validate_3.checkIcNumber(insuredNewListForm.insuredIdtype.value, insuredNewListForm.insuredIdno.value, insuredNewListForm.insuredSex.value, insuredNewListForm.insuredBirthday.value).msg)
                }

                if (validate_3.checkId(insuredNewListForm.nativePlace.value, insuredNewListForm.insuredIdtype.value, insuredNewListForm.age).msg) {
                    errors.push(validate_3.checkId(insuredNewListForm.nativePlace.value, insuredNewListForm.insuredIdtype.value, insuredNewListForm.age).msg)
                }
                //
                // if (insuredNewListForm.age > 17) {
                //     if (insuredNewListForm.mobilePhoneNumber.value == appntNewForm.mobilePhoneNumber.value) {
                //         errors.push("被保险人手机号码不可与投保人一致")
                //     }
                //     if (insuredNewListForm.email.value == appntNewForm.email.value) {
                //         errors.push("被保险人邮箱不可与投保人一致")
                //     }
                //
                // }
                if (insuredNewListForm.relationToAppnt.value == '01') {
                    if (appntNewForm.appntSex.value == insuredNewListForm.insuredSex.value) {
                        errors.push('员工本人的性别不能跟配偶性别一致')
                    }
                }

                if (insuredNewListForm.companyOrSchool.visible) {
                    if (!insuredNewListForm.companyOrSchool.value) {
                        errors.push('请填写单位或学校')
                    }
                }
                // if (insuredNewListForm.occupationCode.value == ("D1" || "D2" || "D3")) {
                // }
                // else {
                //     if (!insuredNewListForm.companyOrSchool.value) {
                //         errors.push('请填写单位或学校')
                //     }
                // }
                if(insuredNewListForm.contactDetailedAddress.city != "4420" && insuredNewListForm.contactDetailedAddress.city != "4419"){
                    if (insuredNewListForm.contactDetailedAddress.district == false  || insuredNewListForm.contactDetailedAddress.detail == false ) {
                        errors.push('被保险人请填写联系地址')
                    }
                }

                if (!that.validateInputAddressLt5Cn(insuredNewListForm.contactDetailedAddress.detail)) {
                    errors.push('被保险人分段地址，详细地址不能少于5个中文字符')
                }
            }
        }
        return errors
    },
});


module.exports = widget;
