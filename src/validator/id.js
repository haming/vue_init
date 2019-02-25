var CentralValidator = require('./CentralValidator');

var input = $.extend({}, CentralValidator, {
    validate: function (appntidType,appntidNo,gender,birthday) { //用于验证，如有错误，返回数组，便于前端提示
        var that = this;
        var errors = [];
        var data = this.checkIcNumber(appntidType,appntidNo,gender,birthday);
            if(!data.type){
                errors.push({type: "modal", msg: data.msg, code: ''})
            }
        // console.log(that.value + ':执行了validate操作')
        return errors.length > 0 ? errors : null;
    },
    checkIcNumber: function (appntidType,appntidNo,gender,birthday) {
        var result = {
            type : true,
            msg :""
        }
        if (appntidNo == '' || appntidNo == null) {
            result.msg = '证件号不能为空';
            result.type = false;
            return result
        } else {
            switch (appntidType) {
                case "H"://户口本
                    if (appntidNo.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(appntidNo)) {
                            if ((appntidNo.substring(6, 10) + '-' + appntidNo.substring(10, 12) + '-' + appntidNo.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(appntidNo, gender)) {
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
                    if (appntidNo.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(appntidNo)) {
                            if ((appntidNo.substring(6, 10) + '-' + appntidNo.substring(10, 12) + '-' + appntidNo.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(appntidNo, gender)) {
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
                    if (appntidNo.length < 18) {
                        result.msg = '证件类型为身份证、户口本时,号码长度必须为18位';
                        result.type = false;
                        return result
                    } else {
                        if (this.checkIdCard(appntidNo)) {
                            if ((appntidNo.substring(6, 10) + '-' + appntidNo.substring(10, 12) + '-' + appntidNo.substring(12, 14)) == birthday) {
                                if (!this.checkSexAndId(appntidNo, gender)) {
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
                    if (appntidNo.length >= 3) {
                        return result;
                    } else {
                        result.msg = '证件类型为护照时，号码长度不能少于3个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "T"://港澳通行证
                    if (appntidNo.length >= 8) {
                        return result;
                    } else {
                        result.msg = '证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "R"://台胞通行证
                    if (appntidNo.length >= 8) {
                        return result;
                    } else {
                        result.msg = '证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符';
                        result.type = false;
                        return result
                    }
                    break;
                case "S"://士兵证
                    if (appntidNo.length >= 10 && appntidNo.length <= 18) {
                        return result;
                    } else {
                        result.msg = '证件类型为军官证或士兵证，号码长度在10-18个字符之间';
                        result.type = false;
                        return result
                    }
                    break;
                case "A"://军官证
                    if (appntidNo.length >= 10 && appntidNo.length <= 18) {
                        return result;
                    } else {
                        result.msg = '证件类型为军官证或士兵证，号码长度在10-18个字符之间';
                        result.type = false;
                        return result
                    }
                    break;
                case "B"://婴儿证
                    if (appntidNo.length >= 3) {
                        return result;
                    } else {
                        result.msg = '证件类型为出生证,号码长度不能少于3个字符';
                        result.type = false;
                        return result
                    }
                    break;
                default :
                    if (appntidNo.length >= 1) {
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
});


module.exports = input;
