var CentralWidget = require('../../widget/order_form');
var CentralService = require('../../service/CentralService')

var widget = $.extend({}, CentralWidget, {
    service: CentralService,
    formHtml: '',
    startDate: '', //用于计算年龄的基准日期
    effectiveDate: '', //用于计算出生日期组件min max 限制的基准日期
    urlParams: '',

    userInfo: '',

    order: { // 后台数据库订单结构
        appntNew: {},
        insuredNewList: [],
        riskNewList: [],
        currentPremium: 0,
    },
    form: [{ // 前端试算form的结构
        insuredseqNo: '1',
        organizationId: '', //组织id
        type: '',//类型
        insuredSeq: '1',
        relationship: '00',//与投保人的关系
        birthday: '1980-01-01', //被保人生日
        sex: '0', //被保人性别
        insuYear: '1', //保险期间
        payEndYear: '0',//交费期间
        payIntv: '12',//交费方式
        payEndYearFlag: 'Y',//缴费标识
        riskCode: 'PNSD002',
        insuYearFlag: 'Y',
        amnt: 100000,//保额
        prem: '',
        mult: '1',
    }],
    formToAppntAdapter: { //试算form 至 投保人 值拷贝适配器
        "sex": "appntSex",
        "birthday": "appntBirthday",
    },
    formToInsuredAdapter: {//试算form 至 被保人 值拷贝适配器
        "sex": "insuredSex",
        "birthday": "insuredBirthday",
        "relationship": "relationToAppnt",
    },
    orderToFormTransform: function () {
        var that = this;

        /**
         * 本项目，试算的参数是数组，但赋值的时候，只需要取第一个，其它项目请根据特殊情况修改
         */
        var form = that.form[0]

        /**
         * 本项目，险种只有一个，被保人只有一个，所以取riskNewList的第一个向form赋值即可
         * riskNewList的key跟试算form的key一致，所以不需要适配器
         */

        var schemaInfo = that.order.riskNewList[0];
        for (var x in schemaInfo) {
            form[x] = schemaInfo[x]
        }

        var insuredInfo = that.order.insuredNewList[0];

        var formToInsuredAdapter = that.formToInsuredAdapter
        for (var x in formToInsuredAdapter) {
            form[x] = insuredInfo[formToInsuredAdapter[x]];
        }

        var config = require('../../widget/config').premiumTrialConfig;//读取投保人组件配置

        //将配置自动化复制进组件
        that.setUpWidgetService(form, config);
        /**
         * 本项目，试算的参数是数组。 其它项目请根据实际情况返回相应的数据格式
         */

        return [form];
    },
    formToOrderTransform: function () {
        var that = this;
        var adapter = ""

        var forms = that.form.toJSON(); //转换为非监听数据
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            that.converWidgetToData(form);
        }

        var form = forms[0];
        if (form.relationship == '00') { //本人,要向投保人信息赋值
            adapter = that.formToAppntAdapter;
            for (var x in adapter) {
                that.order.appntNew[adapter[x]] = form[x];
            }
        }
        /**
         *本项目，由于被保人只有一个，所以可以向所有被保人信息进行赋值，其它项目请根据实际情况修改
         */
        var insureds = that.order.insuredNewList;
        for (var i = 0; i < insureds.length; i++) {
            var insured = insureds[i];
            adapter = that.formToInsuredAdapter;
            for (var x in adapter) {
                insured[adapter[x]] = form[x]
            }
        }

        var schemaInfo = that.order.riskNewList[0];
        for (var x in schemaInfo) {
            schemaInfo[x] = form[x]
        }

        return that.order;
    },

    fix: function () {
        var that = this;
        //（默认为空，允许编辑，
        // 基本保险金额须为1万元整数倍。
        // 若为成年人，最低基本保险金额为20万元；
        var form = that.form[0];

        var insuredBirthday = form.birthday.value
        var insuredAmount = form.amnt.value

        var insuredAge = that.getAge(that.startDate, insuredBirthday)
        if (insuredAge >= 18 && insuredAmount < 20) {
            form.amnt.value = 20;
        }


        // 若为未成年人，最低基本保险金额为10万元）
        if (insuredAge < 18 && insuredAmount < 10) {
            form.amnt.value = 10;
        }

        var effectiveDate = that.effectiveDate;
        var relationship = form.relationship.value;

        try {
            form.birthday.fixStarEndDateByRelationship(effectiveDate, relationship);
        } catch (e) {

        }

    },
    checkCacheIdNo: function () {
        var that = this;
        function getBirthdatByIdNo(idNumber) {//根据身份证号获取生日
            var tmpStr = "";
            var idDate = "";
            var tmpInt = 0;
            var strReturn = "";
            var trim = function (s) {
                return s.replace(/^\s+|\s+$/g, "");
            };
            idNumber = trim(idNumber);
            if ((idNumber.length != 15) && (idNumber.length != 18)) {
                strReturn = "输入的身份证号位数错误";
                return strReturn;
            }

            if (idNumber.length == 15) {
                tmpStr = idNumber.substring(6, 12);
                tmpStr = "19" + tmpStr;
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

                return tmpStr;
            }
            else {
                tmpStr = idNumber.substring(6, 14);
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

                return tmpStr;
            }

        }

        function getSexByIdNum(idNumber) {//根据身份证号获取性别
            var sexno, sex;
            if (idNumber.length == 18) {
                sexno = idNumber.substring(16, 17)
            } else if (idNumber.length == 15) {
                sexno = idNumber.substring(14, 15)
            } else {
                // alert("错误的身份证号码，请核对！")
                return false
            }
            var tempid = sexno % 2;

            if (tempid == 0) {
                sex = 1; //返回女
            } else {
                sex = 0; //返回男
            }
            return sex
        }
        var insuredNew = that.order.insuredNewList[0];
        if (insuredNew.relationToAppnt == "00") {
            if (insuredNew.insuredIdtype == "I") {
                //校验身份证号与性别年龄匹配
                if(getBirthdatByIdNo(insuredNew.insuredIdno) == insuredNew.insuredBirthday&&getSexByIdNum(insuredNew.insuredIdno)==insuredNew.insuredSex){
                }else{
                    that.order.appntNew.appntidNo = "";
                    insuredNew.insuredIdno = "";//删除身份证号
                }
            }
        } else {
            if (insuredNew.insuredIdtype == "I") {
                //校验身份证号与性别年龄匹配
                if(getBirthdatByIdNo(insuredNew.insuredIdno) == insuredNew.insuredBirthday&&getSexByIdNum(insuredNew.insuredIdno)==insuredNew.insuredSex){

                }else{
                    insuredNew.insuredIdno = "";//删除身份证号
                }
            }
        }
    },
    initFix:function(isLogin){
        var that = this;
        var form = that.form[0];
        if (!that.hasCache()) {//没有缓存,读接口数据
            if(form.relationship.value == "00"&&isLogin){
                if(that.userInfo.data.employeeBirthday){
                    form.birthday.value = that.userInfo.data.employeeBirthday;
                }
                if(that.userInfo.data.employeeSex){
                    form.sex.value = that.userInfo.data.employeeSex;
                }
            }
        }
    },
    validate: function () {
        var that = this;
    }
});


module.exports = widget;
