/**
 * Created by gthowe on 17/4/19.
 */
var valid = {
        //空值验证
        validateEmpty: function (value) {
            if (value == '') {
                return false
            } else {
                return true
            }
        },
        //中文校验
        isChinese: function (temp) {
            var reg = /[\u4e00-\u9fa5]/g;
            if (reg.test(temp)) {//有中文
                return false
            } else {//无中文
                var str = "[@/'\"#$%&^*]+";
                var reg1 = new RegExp(str);
                if (reg1.test(temp)) {
                    return false
                }
                return true
            }
        },
        // 姓名验证
        validateName: function (value) {
            var result = {isValid: true, tips: ''};
            var patt1 = new RegExp("^[\u4e00-\u9fa5a-zA-Z]{2,}$");//验证只能中文输入
            if (!patt1.test(value)) {
                result.isValid = false;
            }
            return result.isValid;
        },
        // 手机验证
        validateMobile: function (value) {
            var result = true;
            var patt1 = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");//验证长度，第一位数必须是1
            if (!patt1.test(value)) {
                result = false;
            }
            return result;
        },
        //校验地址
        validateAddress: function (value) {
            if (value == '') return 1;
            else {
                var _sep = value.split('#');
                if (_sep[3] == '') return 1;
                else {
                    if (!this.validateInputAddressLt5Cn(_sep[3])) {
                        return 2
                    } else {
                        return 0
                    }
                }
            }
        },
        validateInputAddressLt5Cn: function (v) {
            v = this.nameStripscript2(v);
            var patt1 = new RegExp("^[\u4e00-\u9fa5]{5,}$");//验证只能中文输入
            if (patt1.test(v)) {
                return true;
            } else {
                return false;
            }
        },
        //名称输入其他字符会自动删除
        nameStripscript2: function (s) {
            var pattern = new RegExp("^[\u4e00-\u9fa5]{1,}$");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                if (s.substr(i, 1).replace(pattern) == undefined || s.substr(i, 1).replace(pattern) == "undefined" || s.substr(i, 1).replace(pattern) == null) {
                    rs = rs + s.substr(i, 1);
                }
            }
            return rs;
        },
        //校验银行卡号
        validateBankNo: function (value) {
            if (value == '') return false
            else {
                if (value.length < 8) return false
                else return true
            }
        },
        //校验数字
        validateNumber: function (value) {
            if (!/^[0-9]*$/.test(value)) {
                return false
            } else {
                return true
            }
        },
        //校验数字和字母
        validateNumberAndWords: function (value) {
            var re = /^[0-9a-zA-Z]*$/g;  //判断字符串是否为数字和字母组合     //判断正整数 /^[1-9]+[0-9]*]*$/
            if (!re.test(value)) {
                return false;
            } else {
                return true;
            }
        },
        //数字输入其他字符会自动删除
        stripscript: function (s) {
            var pattern = new RegExp("[-＋+@＃¥％＊`~!#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_a-zA-Z].");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs + s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        //电子邮件验证
        validateEmail: function (value) {
            var result = true
            var patt1 = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");//验证邮件
            if (!patt1.test(value)) {
                result = false;
            }
            return result;
        },
        //身份验证
        checkIdCard: function (idcard) {
            var Y, JYM, JYM_X, ereg, Errors, area, S, M, M_X, idcard_array;
            if (idcard === '') {
                return false;
            }

            Errors = [true, false, false, false, false];
            area = {
                11: "北京", 12: "天津", 13: "河北", 14: "山西",
                15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
                31: "上海", 32: "江苏", 33: "浙江", 34: "安徽",
                35: "福建", 36: "江西", 37: "山东", 41: "河南",
                42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
                46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
                53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
                63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾",
                81: "香港", 82: "澳门", 91: "国外"
            };

            //先看在不在36个省里
            //再看是不是是1

            idcard_array = idcard.split("");
            /*地区检验*/
            if (area[parseInt(idcard.substr(0, 2))] == null) {
                return Errors[4];
            }
            /*身份号码位数及格式检验*/
            switch (idcard.length) {
                case 15:
                    if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 400 == 0)) {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                    } else {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                    }
                    if (ereg.test(idcard)) {
                        return 15; //15位验证通过
                    }
                    else {
                        return Errors[2];
                    }
                    break;

                case 18:
                    //18位身份号码检测
                    //出生日期的合法性检查
                    //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                    //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
                    } else {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
                    }
                    if (ereg.test(idcard)) {//测试出生日期的合法性
                        //计算校验位
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                            + parseInt(idcard_array[7])
                            + parseInt(idcard_array[8]) * 6
                            + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";

                        JYM = "10x98765432";
                        JYM_X = "10X98765432";
                        M = JYM.substr(Y, 1);
                        /*判断校验位*/
                        M_X = JYM_X.substr(Y, 1);
                        /*判断校验位*/

                        if (M == idcard_array[17] || M_X == idcard_array[17]) {
                            return 1;
                            /*检测ID的校验位false;*/
                        }
                        else {
                            return Errors[3];
                        }
                    }
                    else {
                        return Errors[2];
                    }
                    break;

                default:
                    return Errors[1];
                    break;
            }
        }
    }
;

module.exports = valid;