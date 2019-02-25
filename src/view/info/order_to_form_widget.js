var validate_3 = require('../../service/3-validate.js')
var CentralWidget = require('../../widget/order_form');
var inputFilter = require('../../service/inputFilter');

var widget = $.extend({}, CentralWidget, {
    order: {
        appntNew: {},
        insuredNewList: [],
        riskNewList: []
    },
    // preCache:{},
    ownOrder: '',
    allOrder: [],
    age: [],
    form: {
        appntNewForm: {},
        insuredNewListForm: [],
    },
    addressAdapter: { //左边：组件内   右边：投、被保人信息对象
        province: 'contactProvince',
        city: 'contactCity',
        district: 'contactDistrict',
        detail: 'contactDetailedAddress',
    },
    positionAdapter: { //左边：组件内   右边：投、被保人信息对象
        selectValue: 'position',
        inputValue: 'reason',
    },
    appntToInsuredAdapter: { //左边是投保人字段，右边是被保人字段
        appntName: 'insuredName',
        appntidType: 'insuredIdtype',
        appntidNo: 'insuredIdno',
        idExpDate: 'idExpDate',
        idIsLongValid: 'idIsLongValid',
        appntSex: 'insuredSex',
        appntBirthday: 'insuredBirthday',
        marriage: 'marriage',
        nativePlace: 'nativePlace',
        personalIncome: 'personalIncome',
        occupationCode: 'occupationCode',
        companyOrSchool: 'companyOrSchool',
        mobilePhoneNumber: 'mobilePhoneNumber',
        email: 'email',
        contactProvince: 'contactProvince',
        contactCity: 'contactCity',
        contactDistrict: 'contactDistrict',
        contactDetailedAddress: 'contactDetailedAddress',
        taxIdentity: 'taxIdentity',
        rankCode: 'rankCode',
        rankName: 'rankName',
        // serviceNo: "serviceNo"
    },
    orderToFormTransform: function () {
        var that = this;
        var order = that.order;

        try { //投保人组件升级
            var appntNewForm = JSON.parse(JSON.stringify(order.appntNew))

            var config = require('../../widget/config').appntConfig;//读取投保人组件配置
            that.setUpWidgetService(appntNewForm, config); //配置组件
            that.form.appntNewForm = appntNewForm;

            //被保人组件升级
            var insuredNewListForm = JSON.parse(JSON.stringify(order.insuredNewList))
            var config = require('../../widget/config').insuredConfig;//读取投保人组件配置
            for (var i = 0; i < insuredNewListForm.length; i++) {
                var insuredForm = insuredNewListForm[i];
                that.setUpWidgetService(insuredForm, config); //配置组件
            }

            avalon.log("insuredNewListForm:1:", insuredNewListForm)
            that.form.insuredNewListForm = insuredNewListForm;


            //投保人 地址组件 转换
            var appntNew = that.order.appntNew;

            var appntContactDetailedAddressWidget = that.form.appntNewForm.contactDetailedAddress;
            avalon.log('appntContactDetailedAddressWidget', appntContactDetailedAddressWidget)
            var adapter = that.addressAdapter;
            for (x in adapter) {
                appntContactDetailedAddressWidget[x] = appntNew[adapter[x]];
            }

            appntContactDetailedAddressWidget.fix();//将省市区数据处理完整

            //被保人 地址组件 转换
            var insureds = that.order.insuredNewList;
            var insuredsForm = that.form.insuredNewListForm;
            for (var i = 0; i < insureds.length; i++) {
                var order = insureds[i];
                var addressWidget = insuredsForm[i].contactDetailedAddress;
                for (x in adapter) {
                    addressWidget[x] = order[adapter[x]];
                }
                addressWidget.fix();//将省市区数据处理完整
            }

            //投保人 职级组件
            var positionWidget = that.form.appntNewForm.rankCode;
            positionWidget.selectValue = appntNew.rankCode
            positionWidget.inputValue = appntNew.rankName ? appntNew.rankName : "";
            that.fix()//将职级组件数据处理完整
        } catch (e) {
            avalon.log(e)
        }
        return that.form;

    },
    formToOrderTransform: function () {
        var that = this;

        //将组件数据转换成普通数据

        avalon.log("formToOrderTransform:", that.form)
        var appntNew = that.converWidgetToData(that.form.appntNewForm.$model);//投保人数据降级

        var insuredNewList = that.form.insuredNewListForm.toJSON();//被保人数据降级
        for (var i = 0; i < insuredNewList.length; i++) {
            var form = insuredNewList[i];
            form = that.converWidgetToData(form); //将组件转换成数据
            avalon.log("insuredNewListForm-" + i + " 转换后的数据", form)
        }
        that.order.appntNew = appntNew;
        that.order.insuredNewList = insuredNewList;

        //投保人 地址组件 转换
        appntNew = that.order.appntNew;
        var appntContactDetailedAddressWidget = that.form.appntNewForm.contactDetailedAddress;
        var adapter = that.addressAdapter;
        for (x in adapter) {
            appntNew[adapter[x]] = appntContactDetailedAddressWidget[x]
        }

        //被保人 地址组件 转换
        var insureds = that.order.insuredNewList;
        var insuredsForm = that.form.insuredNewListForm;
        for (var i = 0; i < insureds.length; i++) {
            var order = insureds[i];
            var addressWidget = insuredsForm[i].contactDetailedAddress;
            for (x in adapter) {
                order[adapter[x]] = addressWidget[x]
            }
        }

        //投保人 职级组件
        var positionWidget = that.form.appntNewForm.rankCode;
        appntNew.rankCode = positionWidget.selectValue;
        appntNew.rankName = positionWidget.inputValue;

        //如果选择非'其他'选项，带入职级中文字段
        // avalon.log("positionWidget",positionWidget)
        // if (positionWidget.selectValue == "7") {
        //     appntNew.rankName = "";
        // }else{
        //     for (var j = 0; j < positionWidget.candidateArray.length; j++) {
        //         var item = positionWidget.candidateArray[j];
        //         if(item.key == positionWidget.selectValue){
        //             appntNew.rankName = item.value;
        //             break;
        //         }
        //     }
        // }
        avalon.log("positionWidget:1", positionWidget)
        // that.form.insuredNewListForm[i].rankName = positionWidget.inputValue;

        //将本人的数据同步到被保人为本人的数据中
        var insureds = that.order.insuredNewList;
        for (var i = 0; i < insureds.length; i++) {
            var insured = insureds[i];
            if (insured.relationToAppnt == '00') {//如果是本人的单，将投保人数据赋值至此
                var adapter = that.appntToInsuredAdapter;
                var appntNew = that.order.appntNew;
                for (x in adapter) {
                    insured[adapter[x]] = appntNew[x];
                }
            }
        }
        avalon.log('将本人的数据同步到被保人为本人的数据中:结果-->', that.order)
        return that.order;
    },
    validate: function () {
        var that = this;
        var errors = [];
        //修复 投保人组件数据
        var appntNewForm = that.form.appntNewForm
        //修复 被保人组件数据
        var insuredNewListForm = that.form.insuredNewListForm;

        errors = errors.concat(that.widgetValidate(appntNewForm));//组件数据验证

        avalon.log(errors)
        for (var i = 0; i < insuredNewListForm.length; i++) {
            var formItem = insuredNewListForm[i];
            if (formItem.relationToAppnt.value != "00") {
                errors = errors.concat(that.widgetValidate(formItem)); //组件数据验证
            }

        }
        errors = errors.concat(that.appntValidate(that.form.$model));//验证本人
        errors = errors.concat(that.insuredNewValidate(that.form.$model)); //验证家属
        errors = errors.concat(that.validateDiffInfo());
        errors = errors.concat(that.validateToInformation());
        avalon.log("errors.concat(that.validateToInformation())", errors);
        return errors;
    },
    appntValidate: function (form) {
        var that = this;

        var errors = [];

        if (validate_3.checkIcNumber(form.appntNewForm.appntidType.value, form.appntNewForm.appntidNo.value, form.appntNewForm.appntSex.value, form.appntNewForm.appntBirthday.value).msg) {
            errors.push(validate_3.checkIcNumber(form.appntNewForm.appntidType.value, form.appntNewForm.appntidNo.value, form.appntNewForm.appntSex.value, form.appntNewForm.appntBirthday.value).msg)
        }

        // if (validate_3.checkId(form.appntNewForm.nativePlace.value, form.appntNewForm.appntidType.value, form.appntNewForm.age).msg) {
        //     errors.push(validate_3.checkId(form.appntNewForm.nativePlace.value, form.appntNewForm.appntidType.value, form.appntNewForm.age).msg)
        // }

        // occupationCode,companyOrSchool
        if (form.appntNewForm.occupationCode.value == ("D1" || "D2" || "D3")) {
        }
        else {
            if (!form.appntNewForm.companyOrSchool.value) {
                errors.push('请填写单位或学校')
            }
        }

        //concat
        // if (form.appntNewForm.nativePlace.value != "CHN") {
        //     if (!form.appntNewForm.workDepartment || form.appntNewForm.WorkDepartment == '0') {//校验职业类别的
        //         errors.push('请选择工作单位性质')
        //     }
        // }
        // var positionWidget = that.form.appntNewForm.rankCode;
        // if (positionWidget.selectValue == '7' && !positionWidget.inputValue) {
        //     errors.push('职级选择其它，请补充职级具体描述')
        // }

        // if (that.form.appntNewForm.idIsLongValid.value == 0 && that.form.appntNewForm.idExpDate.value == "") {
        //     errors.push('请选择证件有效期')
        // }
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

        var insuredNewListForm
        for (var i = 0; i < form.insuredNewListForm.length; i++) {
            insuredNewListForm = form.insuredNewListForm[i];
            avalon.log("insuredNewValidate:", insuredNewListForm)
            if (insuredNewListForm.relationToAppnt.value != "00") {

                if (validate_3.checkIcNumber(insuredNewListForm.insuredIdtype.value, insuredNewListForm.insuredIdno.value, insuredNewListForm.insuredSex.value, insuredNewListForm.insuredBirthday.value).msg) {
                    errors.push(validate_3.checkIcNumber(insuredNewListForm.insuredIdtype.value, insuredNewListForm.insuredIdno.value, insuredNewListForm.insuredSex.value, insuredNewListForm.insuredBirthday.value).msg)
                }

                // if (validate_3.checkId(insuredNewListForm.nativePlace.value, insuredNewListForm.insuredIdtype.value, insuredNewListForm.age).msg) {
                //     errors.push(validate_3.checkId(insuredNewListForm.nativePlace.value, insuredNewListForm.insuredIdtype.value, insuredNewListForm.age).msg)
                // }
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

                if (insuredNewListForm.contactDetailedAddress.city != "4420" && insuredNewListForm.contactDetailedAddress.city != "4419") {
                    if (insuredNewListForm.contactDetailedAddress.district == false || insuredNewListForm.contactDetailedAddress.detail == false) {
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
    fix: function () {
        var that = this;
        //修复 投保人组件数据
        var appntNewForm = that.form.appntNewForm;
        //修复 被保人组件数据
        var insuredNewListForm = that.form.insuredNewListForm;

        avalon.log("fix")
        avalon.log(appntNewForm, insuredNewListForm)

        that.widgetFix(appntNewForm);//组件数据自修复
        for (var i = 0; i < insuredNewListForm.length; i++) {
            var formItem = insuredNewListForm[i];
            that.widgetFix(formItem); //组件数据自修复
        }

        var effectiveDate = that.effectiveDate;
        var relationship = insuredNewListForm[0].relationToAppnt.value;

        // idExpDate
        try {
            appntNewForm.appntBirthday.fixStarEndDateByRelationship(effectiveDate, "00");
            appntNewForm.appntBirthday.fixDateNotBeteenStartAndEnd(); //如果已选日期不在可选之中，则清空设置默认值 1980-01-01
            appntNewForm.idExpDate.fixIdTypeExpDate();
            if (relationship != "00") {
                insuredNewListForm[0].insuredBirthday.fixStarEndDateByRelationship(effectiveDate, relationship);
                insuredNewListForm[0].insuredBirthday.fixDateNotBeteenStartAndEnd(); //如果已选日期不在可选之中，则清空设置默认值 1980-01-01
                insuredNewListForm[0].idExpDate.fixIdTypeExpDate();
            }
        } catch (e) {
        }


        //保险资金来源-过滤特殊字符
        that.form.appntNewForm.premSource.value = inputFilter.keepLetterAndWordAndNumber(that.form.appntNewForm.premSource.value);
        //个人年收入 -- 转成整形
        if (that.form.appntNewForm.personalIncome.value || that.form.appntNewForm.personalIncome.value === 0 || that.form.appntNewForm.personalIncome.value === '0') {

            that.form.appntNewForm.personalIncome.value = parseInt(that.form.appntNewForm.personalIncome.value);
            if (that.form.appntNewForm.personalIncome.value.toString() == 'NaN') {
                that.form.appntNewForm.personalIncome.value = ''
            }
        }

        if (that.form.appntNewForm.idExpDate.value == "2999-01-01" && that.form.appntNewForm.idIsLongValid.value == 0) {
            that.form.appntNewForm.idExpDate.value = ""
        }

        that.form.appntNewForm.age = that.getAge(that.startDate, that.form.appntNewForm.appntBirthday.value)
        if (that.form.appntNewForm.appntidType.value == "I") {
            if (that.form.insuredNewListForm[0].relationToAppnt.value != "00") {
                if (that.form.appntNewForm.appntidNo.value) {
                    that.form.appntNewForm.appntBirthday.value = that.form.appntNewForm.appntidNo.getBirthdatByIdNo();
                    that.form.appntNewForm.appntSex.value = that.form.appntNewForm.appntidNo.getSexByIdNum(that.form.appntNewForm.appntSex.value);
                }
            }

            //固定国籍
            that.form.appntNewForm.nativePlace.value = "CHN";
            that.form.appntNewForm.nativePlace.visible = false;
        } else { //还原国籍
            that.form.appntNewForm.nativePlace.visible = true;
        }


        for (var i = 0; i < that.form.insuredNewListForm.length; i++) {
            that.form.insuredNewListForm[i].age = that.getAge(that.startDate, that.form.insuredNewListForm[i].insuredBirthday.value)

            //个人年收入 -- 转成整形
            if (that.form.insuredNewListForm[i].personalIncome.value || that.form.insuredNewListForm[i].personalIncome.value === "0" || that.form.insuredNewListForm[i].personalIncome.value === 0) {
                that.form.insuredNewListForm[i].personalIncome.value = parseInt(that.form.insuredNewListForm[i].personalIncome.value);
                if (that.form.insuredNewListForm[i].personalIncome.value.toString() == 'NaN') {
                    that.form.insuredNewListForm[i].personalIncome.value = ''
                }
            }

            if (that.form.insuredNewListForm[i].idExpDate.value == "2999-01-01" && that.form.insuredNewListForm[i].idIsLongValid.value == 0) {
                that.form.insuredNewListForm[i].idExpDate.value = ""
            }

            if (that.form.insuredNewListForm[i].relationToAppnt.value == "00") {  //被保人是本人
                //职级组件 fix
                var positionWidget = that.form.appntNewForm.rankCode;
                if (positionWidget.selectValue == '7') {
                    positionWidget.inputVisible = true;
                } else {
                    positionWidget.inputVisible = false;

                }
            } else {
            }
            if (that.form.insuredNewListForm[i].insuredIdtype.value == "I") {
                if (that.form.insuredNewListForm[i].insuredIdno.value) {
                    that.form.insuredNewListForm[i].insuredBirthday.value = that.form.insuredNewListForm[i].insuredIdno.getBirthdatByIdNo();
                    that.form.insuredNewListForm[i].insuredSex.value = that.form.insuredNewListForm[i].insuredIdno.getSexByIdNum(that.form.insuredNewListForm[i].insuredSex.value);
                }

                //固定国籍
                that.form.insuredNewListForm[i].nativePlace.value = "CHN";
                that.form.insuredNewListForm[i].nativePlace.visible = false;
            } else { //还原国籍
                that.form.insuredNewListForm[i].nativePlace.visible = true;
            }

            if (that.form.insuredNewListForm[i].age >= 6) {
                if (that.form.insuredNewListForm[i].occupationCode.value == "D1" || that.form.insuredNewListForm[i].occupationCode.value == "D2" || that.form.insuredNewListForm[i].occupationCode.value == "D4") {
                    that.form.insuredNewListForm[i].companyOrSchool.visible = false;
                } else {
                    that.form.insuredNewListForm[i].companyOrSchool.visible = true;
                }
            }
        }


    },
    initFix: function () {
        var deferred = Deferred();
        var that = this;
        // avalon.log("initFix")
        // avalon.log(that.preCache)
        that.form.appntNewForm.appntName.value = that.userInfo.employeeName ? that.userInfo.employeeName : "测试";
        that.form.appntNewForm.mobilePhoneNumber.value = that.userInfo.mobile;

        for (var i = 0; i < that.form.insuredNewListForm.length; i++) {
            // that.form.insuredNewListForm[i].age = that.getAge(that.startDate, that.form.insuredNewListForm[i].insuredBirthday.value)
            if (that.form.insuredNewListForm[i].relationToAppnt.value == "00") {  //被保人是本人

                if (!that.form.appntNewForm.appntidType.value) {
                    that.form.appntNewForm.appntidType.value = "I";
                    that.form.appntNewForm.nativePlace.value = "CHN";
                }

                //职级具体描述判断清空
                if (that.form.appntNewForm.rankCode.selectValue != "7") {
                    that.form.appntNewForm.rankCode.inputValue = "";
                    that.form.appntNewForm.rankName = "";
                }

                //固定为身份证
                // that.form.appntNewForm.appntidType.visible = false;
                // that.form.appntNewForm.appntidType.value = "I";

                //固定国籍
                // that.form.appntNewForm.nativePlace.value = "CHN";
                // that.form.appntNewForm.nativePlace.visible = false;

                // //婚姻状态
                // if (!that.form.appntNewForm.marriage.value) {
                //     that.form.appntNewForm.marriage.value = '7'
                // }

                //职业类型
                if (!that.form.appntNewForm.occupationCode.value) {
                    that.form.appntNewForm.occupationCode.value = 'K'
                }
                //职级
                avalon.log("that.ownOrder:", that.ownOrder)
                if (that.ownOrder) {
                    var positionWidget = that.form.appntNewForm.rankCode;
                    positionWidget.selectValue = that.ownOrder.rankCode;
                    if (positionWidget.selectValue == '7') {
                        positionWidget.inputValue = that.ownOrder.rankName;
                        positionWidget.inputVisible = true
                    } else {
                        positionWidget.inputVisible = false
                    }
                }
            }
            else { //为家属投保

                that.form.appntNewForm.rankCode.visible = false; //隐藏投保人的职级信息

                if (that.form.insuredNewListForm[i].age < 18) {//未成年家属

                    //同步手机号
                    if (!that.form.insuredNewListForm[i].mobilePhoneNumber.value) {//空值
                        that.form.insuredNewListForm[i].mobilePhoneNumber.value = that.form.appntNewForm.mobilePhoneNumber.value;
                    }
                    //同步邮箱
                    if (!that.form.insuredNewListForm[i].email.value) {//空
                        if (that.ownOrder) {//本人已投保
                            that.form.insuredNewListForm[i].email.value = that.ownOrder.email;
                        }
                    }

                    //同步联系地址
                    if (that.ownOrder) {//已投保

                        that.form.insuredNewListForm[i].contactDetailedAddress.province = that.ownOrder.contactProvince;
                        that.form.insuredNewListForm[i].contactDetailedAddress.city = that.ownOrder.contactCity;
                        that.form.insuredNewListForm[i].contactDetailedAddress.district = that.ownOrder.contactDistrict;
                        that.form.insuredNewListForm[i].contactDetailedAddress.detail = that.ownOrder.contactDetailedAddress;
                        that.form.insuredNewListForm[i].contactDetailedAddress.visible = false;
                        that.form.insuredNewListForm[i].contactDetailedAddress.fix()
                    }
                }
                else {//成年家属

                    //固定为身份证
                    that.form.insuredNewListForm[i].insuredIdtype.visible = false;
                    that.form.insuredNewListForm[i].insuredIdtype.value = "I";

                    //固定国籍
                    that.form.insuredNewListForm[i].nativePlace.value = "CHN";
                    that.form.insuredNewListForm[i].nativePlace.visible = false;


                    //同步联系地址
                    if (that.ownOrder) {//已投保
                        that.form.insuredNewListForm[i].contactDetailedAddress.province = that.ownOrder.contactProvince;
                        that.form.insuredNewListForm[i].contactDetailedAddress.city = that.ownOrder.contactCity;
                        that.form.insuredNewListForm[i].contactDetailedAddress.district = that.ownOrder.contactDistrict;
                        that.form.insuredNewListForm[i].contactDetailedAddress.detail = that.ownOrder.contactDetailedAddress;
                        that.form.insuredNewListForm[i].contactDetailedAddress.fix()
                    }
                }

                //婚姻状态
                if (that.form.insuredNewListForm[i].relationToAppnt.value == "01") { //配偶
                    if (!that.form.insuredNewListForm[i].marriage.value) {
                        that.form.insuredNewListForm[i].marriage.value = '2';
                        // that.form.insuredNewListForm[i].marriage.visible = false
                    }
                    // if (!that.form.appntNewForm.marriage.value) {
                    //     that.form.appntNewForm.marriage.value = '2';
                    //     that.form.appntNewForm.marriage.visible = false
                    // }
                }
                // if (that.form.insuredNewListForm[i].relationToAppnt.value == "03") { //子女
                //     if (!that.form.insuredNewListForm[i].marriage.value) {
                //         that.form.insuredNewListForm[i].marriage.value = ''
                //     }
                //     if (!that.form.appntNewForm.marriage.value) {
                //         that.form.appntNewForm.marriage.value = ''
                //     }
                // } else if (that.form.insuredNewListForm[i].relationToAppnt.value == "01") { //配偶
                //     if (!that.form.insuredNewListForm[i].marriage.value) {
                //         that.form.insuredNewListForm[i].marriage.value = '2';
                //         that.form.insuredNewListForm[i].marriage.visible = false
                //     }
                //     if (!that.form.appntNewForm.marriage.value) {
                //         that.form.appntNewForm.marriage.value = '2';
                //         that.form.appntNewForm.marriage.visible = false
                //     }
                // } else { //父母
                //     if (!that.form.insuredNewListForm[i].marriage.value) {
                //         that.form.insuredNewListForm[i].marriage.value = '2'
                //     }
                // }

                if (that.form.insuredNewListForm[i].age <= 6) {
                    that.form.insuredNewListForm[i].occupationCode.value = "L";
                }
                if (that.form.insuredNewListForm[i].age < 6) {
                    that.form.insuredNewListForm[i].companyOrSchool.visible = false;

                }
            }
        }
        return deferred.promise;
    },

    validateDiffInfo: function () {
        var that = this;
        var errors = [];

        var appntNewForm = that.form.appntNewForm;

        for (var i = 0; i < that.form.insuredNewListForm.length; i++) {
            var insuredOrder = that.form.insuredNewListForm[i];
            insuredOrder.age = that.getAge(that.startDate, insuredOrder.insuredBirthday.value);

            if (insuredOrder.relationToAppnt.value != "00" && insuredOrder.insuredIdtype.value == "I") {
                if (insuredOrder.insuredBirthday.value == insuredOrder.insuredIdno.getBirthdatByIdNo() && insuredOrder.insuredSex.value == insuredOrder.insuredIdno.getSexByIdNum()) {
                } else {
                    errors.push({type: "modal", msg: '与保险方案页信息不符，请确认', code: ''});
                }
            } else if (insuredOrder.relationToAppnt.value == "00" && appntNewForm.appntidType.value == "I") {
                if (that.form.appntNewForm.appntBirthday.value == that.form.appntNewForm.appntidNo.getBirthdatByIdNo() && that.form.appntNewForm.appntSex.value == that.form.appntNewForm.appntidNo.getSexByIdNum()) {
                } else {
                    errors.push({type: "modal", msg: '与保险方案页信息不符，请确认', code: ''});
                }
            }
        }

        return errors.length > 0 ? errors : [];

    },
    widgetValidate: function (object) { //重写调用
        var errors = [];
        var index = 0;
        var that = this;
        for (y in object) {
            for (x in object) {
                if (object[x] && typeof object[x] == 'object' && object[x].validate) {
                    if (object[x].serieNo == index) {
                        var error = object[x].validate();
                        errors = errors.concat(error);
                        if (x == "idIsLongValid") {//证件有效期
                            if (object[x].value === "0" || object[x].value === 0) {
                                if (object.idExpDate.value == "") {
                                    errors.push('请选择证件有效期');
                                }
                            }
                            errors = errors.concat(object.idExpDate.validateIdAgeAndIDExpiryDate(object.age, object.idExpDate.value, object.appntidType ? object.appntidType.value : object.insuredIdtype.value, object.idIsLongValid.value, that.form.insuredNewListForm[0].relationToAppnt.value, that.startDate));
                        }
                        index += 1;
                        break;
                    }
                }
            }
        }
        return errors;
    },
    validateToInformation: function () {
        var that = this;
        avalon.log("CONTROLLER:validateToInformation()userInfo.gender:", that.allOrder);
        var errors = [];
        var myOrder = that.form.insuredNewListForm[0];
        var userInfo = that.form.appntNewForm;
        if (myOrder.relationToAppnt.value != '00') {
            if (myOrder.age > 17) {
                if (userInfo.mobilePhoneNumber.value == myOrder.mobilePhoneNumber.value) {
                    errors.push('被保险人手机号码不可与员工一致');
                } else if (that.allOrder.length) {//判读订单中是否存在和此单一样的手机号码
                    for (var i = 0; i < that.allOrder.length; i++) {
                        if (that.allOrder[i].insuredNewList) {
                            var item = that.allOrder[i].insuredNewList[0];
                            if (item.relationToAppnt != '00') {
                                if (myOrder.relationToAppnt.value != item.relationToAppnt && myOrder.mobilePhoneNumber.value == item.mobilePhoneNumber) {
                                    errors.push('被保险人手机号码不可与其他成年家属一致');
                                }
                            }
                        }

                    }
                }
            }
        }
        if (myOrder.relationToAppnt.value != '00') {
            if (myOrder.age > 17) {
                if (userInfo.email.value == myOrder.email.value) {
                    errors.push('被保险人邮箱不可与员工一致');
                } else if (that.allOrder.length) {//判读订单中是否存在和此单一样的邮箱
                    for (var i = 0; i < that.allOrder.length; i++) {
                        if (that.allOrder[i].insuredNewList) {
                            var item = that.allOrder[i].insuredNewList[0];
                            var age = that.getAge(that.startDate, item.insuredBirthday);
                            if (item.relationToAppnt != '00' && age >= 18 && item.orderId != userInfo.orderId) {
                                if (myOrder.relationToAppnt.value != item.relationToAppnt && myOrder.email.value == item.email) {
                                    errors.push('被保险人邮箱不可与其他成年家属一致');
                                } else if (myOrder.email.value == item.email && myOrder.insuredIdtype.value != item.insuredIdtype) {
                                    errors.push('被保险人邮箱不可与其他成年家属一致');
                                } else if (myOrder.email.value == item.email && myOrder.insuredIdno.value != item.insuredIdno) {
                                    errors.push('被保险人邮箱不可与其他成年家属一致');
                                }

                            }
                        }
                    }
                }
            }
        }
        avalon.log("errors()", errors);
        return errors
    },
    validateInputAddressLt5Cn: function (v) {
        var nameStripscript2 = function (s) {
            var pattern = new RegExp("^[\u4e00-\u9fa5]{1,}$");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                if (s.substr(i, 1).replace(pattern) == undefined || s.substr(i, 1).replace(pattern) == "undefined" || s.substr(i, 1).replace(pattern) == null) {
                    rs = rs + s.substr(i, 1);
                }
            }
            return rs;
        }
        v = nameStripscript2(v);
        var patt1 = new RegExp("^[\u4e00-\u9fa5]{5,}$");//验证只能中文输入
        if (patt1.test(v)) {
            return true;
        } else {
            return false;
        }
    }
});


module.exports = widget;
