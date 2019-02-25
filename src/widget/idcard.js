var input = require('./input');

var idcard = $.extend({}, input, {
    type: 'idcard', //组件的类别，用于service层动态对比配置进行实例化

    getBirthdatByIdNo: function (idNumber) {//根据身份证号获取生日
        var tmpStr = "";
        var idDate = "";
        var tmpInt = 0;
        var strReturn = "";
        var trim = function (s) {
            return s.replace(/^\s+|\s+$/g, "");
        };

        var idNumber = this.value;
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

    },

    getSexByIdNum: function (cur_sex) {//根据身份证号获取性别
        var sexno;
        var sex;
        if(cur_sex){
            sex = cur_sex;
        }else{
            sex = 0;
        }
        var idNumber = this.value;
        if (idNumber.length == 18) {
            sexno = idNumber.substring(16, 17)
        } else if (idNumber.length == 15) {
            sexno = idNumber.substring(14, 15)
        } else {
            // alert("错误的身份证号码，请核对！")
            return sex
        }
        var tempid = sexno % 2;

        if (tempid == 0) {
            sex = 1; //返回女
        } else {
            sex = 0; //返回男
        }
        return sex
    }
});


module.exports = idcard;
