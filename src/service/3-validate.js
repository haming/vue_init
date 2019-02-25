var cities = require("../repository/dic/cities");
var districts = require("../repository/dic/districts");
var pro = require("../repository/dic/provinces");


var validate = {
    onlyNum: function () {
        if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
                event.returnValue = false;
    },


    getCities: function (proId) {
        var list = [];
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            if (city.id.substring(0, 2) == proId) {
                list.push(city);
            }
        }
        return list;
    },
    getDistricts: function (cityId) {
        var list = [];
        for (var i = 0; i < districts.length; i++) {
            var district = districts[i];
            if (district.id.substring(0, 4) == cityId) {
                list.push(district);
            }
        }
        return list;
    },

//拆解信息
    extractAddressInfo: function (str) {
        if (checkNull(str)) {
            var _sep = str.split('#');
            vm.address.pro = _sep[0];
            setTimeout(function () {
                vm.address.city = _sep[1];
                setTimeout(function () {
                    if (getDistricts(vm.address.city).length == 0) {
                        vm.address.dis = 0;
                    } else {
                        vm.address.dis = _sep[2];
                    }
                }, 1000)
            }, 1000)
            vm.address.add = _sep[3];
        }
    },
    extractHomePhoneInfo: function (str) {
        if (checkNull(str)) {
            var _sep = str.split('-');
            vm.home_phone_number.pre = _sep[0];
            vm.home_phone_number.sub = _sep[1];
        }

    },
    extractOfficePhoneInfo: function (str) {
        if (checkNull(str)) {
            var _sep = str.split('-');
            vm.office_phone_number.pre = _sep[0];
            vm.office_phone_number.sub = _sep[1];
        }

    },
    extractEmailInfo: function (str) {
        if (str) {
            var _sep = str.split('@');
            vm.email.pre = _sep[0];
            vm.email.sub = _sep[1];
        } else {
            // vm.email.pre = '';
            // vm.email.sub = 'qq.com';
            // vm.email.sub = 'googlemail.com';
        }
    },

//检查空值
    checkNull: function (v) {
        if (v == null || v == undefined || v == "undefined" || v == "null" || v == "" || v == '' || v == []) {
            return false;
        } else {
            return true;
        }
    },
    checkId: function (country, appntidType, age) {
        var result = {
            type: false,
            msg: "",
        }
        if (this.checkCountryAndIcType(country, appntidType)) {

        } else {
            result.msg = '非中国籍不能选择居民身份证，请检查';
            result.type = false;
            return result
        }

        if (this.checkCountryAndAgeLt16(country, appntidType, age)) {

        } else {
            result.msg = '16周岁（含）以上中国大陆国籍被保险人，证件类型必须为身份证、军官证、士兵证';
            result.type = false;
            return result
        }

        if (this.checkCountryAndAgeBetween3To16(country, appntidType, age)) {

        } else {
            result.msg = '3周岁（含）-15周岁（含）中国大陆国籍被保险人，证件类型必须为户口本、身份证';
            result.type = false;
            return result
        }


        if (this.checkCountryAndAgeBetween0To3(country, appntidType, age)) {

        } else {
            result.msg = '0周岁（含）-2周岁（含）中国大陆国籍被保险人，证件类型必须为出生证、户口本、身份证';
            result.type = false;
            return result
        }


        if (this.checkHongKongAndMacaoIcType(country, appntidType)) {

        } else {
            result.msg = '被保险人国籍为香港、澳门，证件类型必须为港澳居民来往内地通行证';
            result.type = false;
            return result
        }

        if (this.checkTaiwanIcType(country, appntidType)) {

        } else {
            result.msg = '被保险人国籍为台湾，证件类型必须为台湾居民来往大陆通行证';
            result.type = false;
            return result
        }
        if (this.checkOtherIcType(country, appntidType)) {

        } else {
            result.msg = '外籍被保险人，证件类型必须为护照';
            result.type = false;
            return result
        }
        return result;
    },
    checkCountryAndIcType: function (country, appntidType) {
        if (!(country == 'CHN' || country == 'HKG' || country == 'MAC' || country == 'TWN')) {
            if (appntidType == 'I') {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

//国籍为中国大陆，>=16周岁，必须为身份证IL、军官证W、士兵证S
    checkCountryAndAgeLt16: function (country, appntidType, age) {
        var isValid = true;
        // var age = this.ages(data.birthday);
        var age = age;
        if (country == 'CHN') {
            if (age >= 16) {
                if (appntidType == 'I' || appntidType == 'L' || appntidType == 'A' || appntidType == 'S') {
                } else {
                    return false;
                }
            }
        }
        return isValid;
    },

//国籍为中国大陆，>=10周岁且<16周岁必须为户口本H、身份证IL
    checkCountryAndAgeBetween3To16: function (country, appntidType, age) {
        var isValid = true;
        // var age = this.ages(data.birthday);
        var age = age;
        if (country == 'CHN') {
            if (age >= 3 && age < 16) {
                if (appntidType == 'I' || appntidType == 'L' || appntidType == 'H') {
                } else {
                    return false;
                }
            }
        }
        return isValid;
    },
    //国籍为中国大陆，>=0周岁且<3周岁必须为户口本H、身份证IL
    checkCountryAndAgeBetween0To3: function (country, appntidType, age) {
        var isValid = true;
        // var age = this.ages(data.birthday);
        var age = age;
        if (country == 'CHN') {
            if (age < 3) {
                if (appntidType == 'B' || appntidType == 'H' || appntidType == 'I' || appntidType == 'L') {
                } else {
                    return false;
                }
            }
        }
        return isValid;
    },

//被保险人为未成年人时，只能选择子女
    checkRelationShipLt16: function (data) {
        var isValid = true;
        var age = this.ages(data.birthday);
        if (age < 16) {
            var guanxi = $('#guanxi option:selected').val();
            if (guanxi != 3) {
                isValid = false;
            }
        }
        return isValid;
    },

//国籍为香港、澳门，必须为港澳居民来往内地通行证
    checkHongKongAndMacaoIcType: function (country, appntidType) {
        var isValid = true;
        if (country == 'HKG' || country == 'MAC') {
            if (appntidType != 'T') {
                return false
            }
        }
        return isValid;
    },

//国籍为香港、澳门，必须为港澳居民来往内地通行证
    checkTaiwanIcType: function (country, appntidType) {
        var isValid = true;
        if (country == 'TWN') {
            if (appntidType != 'R') {
                return false
            }
        }
        return isValid;
    },

//外籍人士，必须为护照
    checkOtherIcType: function (country, appntidType) {
        var isValid = true;
        if (country != 'CHN' && country != 'HKG' && country != 'MAC' && country != 'TWN') {
            if (appntidType != 'P') {
                return false
            }
        }
        return isValid;
    },

//证件号码校验
    checkIdNull: function (data) {
        if (data.appntidNo || (data.appntidNo != null && data.appntidNo != '')) {
            return true;
        } else {
            return false;
        }
    },

    checkIcNumberSmallLetter: function (data) {
        if (this.checkSmallLetter(data.appntidNo)) {
            return false;//如果包含有小写字符,则不合格
        } else {
            return true;
        }
    },
    checkSmallLetter: function (icNumber) {
        //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
        var Expression = /^.*[a-z]+.*$/;
        var objExp = new RegExp(Expression);
        if (objExp.test(icNumber) == true) {
            return true;
        } else {
            return false;
        }
    },

    checkVaildIcTime: function (data) {
        if (data.ic_is_long_valid == 0 || data.ic_is_long_valid == '0') {
            if (data.ic_expiry_day) {
                if (this.isDate(data.ic_expiry_day)) {
                    var now = new Date();
                    var dateNow = now.getFullYear() + "-" + this.MonthAndDay((now.getMonth() + 1)) + '-' + this.MonthAndDay(now.getDate());
                    if (data.ic_expiry_day == dateNow) {
                        return false
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    },

    MonthAndDay: function (v) {
        if (v == 1 || v == 2 || v == 3 || v == 4 || v == 5 || v == 6 || v == 7 || v == 8 || v == 9) {
            v = "0" + v;
        }
        return v
    },


//检查根据身份证检查性别是否匹配

    getSex: function (psidno) {
        var sexno, sex;
        if (psidno.length == 18) {
            sexno = psidno.substring(16, 17)
        } else if (psidno.length == 15) {
            sexno = psidno.substring(14, 15)
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
    },
    checkSexAndId: function (ic_number, gender) {

        var sex = this.getSex(ic_number);
        if (sex != gender) {
            return false;
        } else {
            return true;
        }
    },

    checkIcNumber: function (Type, No, gender, birthday) { //证件类型，证件号码，性别，生日
        var result = {
            type: true,
            msg: ""
        };
        if (No == '' || No == null) {
            result.msg = '证件号不能为空';
            result.type = false;
            return result
        } else {
            switch (Type) {
                case "H"://户口本
                    if (No.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(No)) {
                            if ((No.substring(6, 10) + '-' + No.substring(10, 12) + '-' + No.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(No, gender)) {
                                    result.msg = '证件号码与性别不匹配';
                                    result.type = false;
                                    return result
                                } else {
                                    return result;
                                }
                            } else {
                                result.msg = '证件号码和出生日期不一致！请返回上一页确认正确的出生日期。';
                                result.type = false;
                                return result
                            }
                        } else {
                            result.msg = '请输入正确的证件号';
                            result.type = false;
                            return result
                        }
                    }

                    break;
                case "I"://身份证
                    if (No.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(No)) {
                            if ((No.substring(6, 10) + '-' + No.substring(10, 12) + '-' + No.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(No, gender)) {
                                    result.msg = '证件号码与性别不匹配';
                                    result.type = false;
                                    return result
                                } else {
                                    return result;
                                }
                            } else {
                                result.msg = '证件号码和出生日期不一致！请返回上一页确认正确的出生日期。';
                                result.type = false;
                                return result
                            }
                        } else {
                            result.msg = '请输入正确的证件号';
                            result.type = false;
                            return result
                        }
                    }

                    break;
                case "L"://临时身份证
                    if (No.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(No)) {
                            if ((No.substring(6, 10) + '-' + No.substring(10, 12) + '-' + No.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(No, gender)) {
                                    result.msg = '请输入正确的证件号';
                                    result.type = false;
                                    return result
                                } else {
                                    return result;
                                }
                            } else {
                                result.msg = '证件号码和出生日期不一致！请返回上一页确认正确的出生日期。';
                                result.type = false;
                                return result
                            }
                        } else {
                            result.msg = '请输入正确的证件号';
                            result.type = false;
                            return result
                        }
                    }

                    break;
                case "P"://护照
                    if (No.length >= 3) {
                        return result;
                    } else {
                        result.msg = '证件类型为护照时，号码长度不能少于3个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "T"://港澳通行证
                    if (No.length >= 8) {
                        return result;
                    } else {
                        result.msg = '证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "R"://台胞通行证
                    if (No.length >= 8) {
                        return result;
                    } else {
                        result.msg = '证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "S"://士兵证
                    if (No.length >= 10 && No.length <= 18) {
                        return result;
                    } else {
                        result.msg = '证件类型为军官证或士兵证，号码长度在10-18个字符之间';
                        result.type = false;
                        return result
                    }
                    break;
                case "A"://军官证
                    if (No.length >= 10 && No.length <= 18) {
                        return result;
                    } else {
                        result.msg = '证件类型为军官证或士兵证，号码长度在10-18个字符之间';
                        result.type = false;
                        return result
                    }
                    break;
                case "B"://婴儿证
                    if (No.length >= 3) {
                        return result;
                    } else {
                        result.msg = '证件类型为出生证,号码长度不能少于3个字符';
                        result.type = false;
                        return result
                    }
                    break;
                default :
                    if (No.length >= 1) {
                        return result;
                    } else {
                        result.msg = '请输入正确的证件号';
                        result.type = false;
                        return result
                    }
                    break;
            }
        }
    },


    // 收入
    checkMyShouru: function (value) {
        if (value == 0) {
            return false;
        }
        else if (value == '' || value == null) {
            return false;
        } else {
            return true;
        }
    },


    checkShouruZero: function (v) {
        v = parseFloat(v)
        if (v < 0) {
            return false;
        } else {
            return true;
        }
    },


//检测地址输入
//     checkAddress: function (v) {
//
//         var strs = v.split("#");
//         var isValid = true;
//
//         if (strs[0] == 0 || strs[0] == "0") {
//             isValid = false;
//             return false;
//
//         }
//         if (strs[1] == 0 || strs[1] == "0") {
//             isValid = false;
//             return false;
//
//             // if ($('#selProvince').val() == 50) {
//             //
//             // } else {
//             //
//             // }
//         }
//
//         if (strs[2] == 0 || strs[2] == "0") {
//             if (checkDistrictEmpty(strs[1])) {
//
//             } else {
//                 isValid = false;
//                 return false;
//             }
//         }
//
//         if (strs[3] != null && strs[3] != '') {
//         } else {
//             isValid = false;
//         }
//
//         //验证输入必须大于5个中文字符
//         if (this.validateInputAddressLt5Cn(strs[3])) {
//         } else {
//             isValid = false;
//         }
//
//         alert(strs[3]);
//         if (strs[3].indexOf('#') > 0) {
//             alert(1)
//             isValid = false;
//         }
//
//         if (isValid) {
//             return true;
//         } else {
//             return false;
//         }
//     },

    checkPostCode: function (data) {

        if (data.post_code == '') {
            return true;
        } else {
            data.post_code = cnScript(data.post_code);
            data.post_code = stripscript(data.post_code);

            if (data.post_code.length > 0 && data.post_code.length < 6) {
                return false;
            } else {
                return true;
            }
        }

    },
    ageForRealTime: function jsGetAge(strBirthday) {
        var returnAge;
        var strBirthdayArr = strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        }
        else {
            console.log(nowYear)
            console.log(birthYear)
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
            }
            else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    },
    ages: function (str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) return false;
        var birth = new Date(r[1], r[3] - 1, r[4]);

        // var birth = new Date(r[1], 4, '1);
        if (birth.getFullYear() == r[1] && (birth.getMonth() + 1) == r[3] && birth.getDate() == r[4]) {
            var today = new Date();
            var age = today.getFullYear() - r[1];

            if (birth.getMonth() + 1 < 4) {
                return age;
            }
            if (birth.getMonth() + 1 == 4) {
                return age;
            }

            if (birth.getMonth() + 1 == 5) {
                if (birth.getDate() == 1) {
                    return age;
                } else {
                    return age - 1;
                }
            }

            if (birth.getMonth() + 1 > 4) {
                return age - 1;
            }
        }
        return ("输入的日期格式错误！");
    },
    validateMobile: function (value) {
        var result = true;
        var patt1 = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");//验证长度，第一位数必须是1
        if (!patt1.test(value)) {
            result = false;
        }
        return result;
    },
    //电子邮件验证
    validateEmail: function (value) {
        var result = true
        var patt1 = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9_\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");//验证邮件
        if (!patt1.test(value)) {
            result = false;
        }
        return result;
    },
    //带小数的年收入检查(0.2  2  1.66等格式)
    testNum: function (v) {
        var r = new RegExp("^\\d+(\\.\\d+)?$");
        if (r.test(v)) {
            return true;
        } else {
            return false;
        }
    },
    //去除空格
    removeAllSpace: function (str) {
        return str.replace(/\s+/g, "");
    },

    chineseAndEnglish: function (str) {
        // var chineseAndEnglish = /^[\u0391-\uFFE5A-Za-z]+$/;
        var patt1 = new RegExp(/^[\u0391-\uFFE5A-Za-z]+$/);

        var strNumber = 0;

        for (var i = 0; i < str.length; i++) {
            if (patt1.test(str[i])) {
                strNumber = strNumber + 1;
            }
        }

        if (strNumber >= 5) {
            return true
        } else {
            return false;
        }
    },
//检测地址输入
    checkAddress: function (v) {
        var strs = v.split("#");
        var isValid = true;

        if (strs[0] == "MAC" || strs[0] == "HKG" || strs[0] == "TWN") {
            if (strs[0] == 0 || strs[0] == "0") {
                isValid = false;
                return false;
            }

            if (strs[3] != null && strs[3] != '') {
            } else {
                isValid = false;
            }
            //验证输入必须大于5个中文字符
            if (this.validateInputAddressLt5Cn(strs[3])) {
            } else {
                isValid = false;
            }
        } else {
            if (strs[0] == 0 || strs[0] == "0") {
                isValid = false;
                return false;

            }
            if (strs[1] == 0 || strs[1] == "0") {
                isValid = false;
                return false;

            }

            if (strs[2] == 0 || strs[2] == "0") {
                if (this.checkDistrictEmpty(strs[1])) {

                } else {
                    isValid = false;
                    return false;
                }
            }

            if (strs[3] != null && strs[3] != '') {
            } else {
                isValid = false;
            }

            //验证输入必须大于5个中文字符
            if (this.validateInputAddressLt5Cn(strs[3])) {
            } else {
                isValid = false;
            }

            if (strs[3].indexOf('#') > 0) {
                isValid = false;
            }

        }


        if (isValid) {
            return true;
        } else {
            return false;
        }
    },
    //验证地址输入,中文字符不能小于5个
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


    checkDistrictEmpty: function (cityId) {
        var isEmpty = true;
        for (var i = 0; i < districts.length; i++) {
            var sub = districts[i].id.substring(0, 4);
            if (sub == cityId) {
                isEmpty = false;
            }
        }
        return isEmpty;
    },

//检测区号长度
    validateAreaCode: function (areaCode) {

        var isValid = true;
        if (!areaCode || areaCode == "null") {
            // alert(2)
            return isValid;
        }

        // alert(3)
        if (areaCode != null || areaCode != '-') {
            // alert(4)
            var codeLength = areaCode.split('-')[0].length;
            if (codeLength < 3 || codeLength > 4) {
                // alert(5)
                isValid = false;
            }
        }

        return isValid;
    },

//检测电话长度
    validatePhoneCode: function (phone) {

        var isValid = true;

        if (!phone) {
            return isValid;
        }

        if (phone) {
            var areaCode = phone.split('-')[0];
            var phoneNumber = phone.split('-')[1];
            var codeLength = phoneNumber.length;

            if (codeLength == 7 || codeLength == 8) {
                if (areaCode.length < 3 || areaCode.length > 4) {
                    isValid = false;
                }
            } else if (codeLength == 10) {
                var begin = phoneNumber.substr(0, 3);
                if (begin == 400 || begin == 800) {

                } else {
                    isValid = false;
                }
            } else {
                isValid = false;
            }
        }
        return isValid;
    },
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
    },
    isDate: function (dateString) {
        if (dateString.trim() == "") return true;
        var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        if (num == 0) {
            return false;
        }
        return (num != 0);
    }
};
module.exports = validate;
