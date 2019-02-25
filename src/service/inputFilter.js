/**
 * Created by gthowe on 17/4/24.
 */
var inputFilter = {
    //只保留字母不区分大小写
    keepOnlyLetter: function (value) {
        var newstr;
        var regexp = /[^a-zA-Z]]*/g;
        newstr = value.replace(regexp, "");
        return newstr
    },
//只保留汉字
    keepOnlyWord: function (value) {
        var newstr;
        var regexp = /[^\u4E00-\u9FA5]]*/g;
        newstr = value.replace(regexp, "");
        return newstr
    },
//只保留数字
    keepOnlyNumber: function (value) {
        value = value.toString();
        var newstr;
        var regexp = /[^\d]]*/g;
        newstr = value.replace(regexp, "");
        return newstr
    },
//保留字母和中文 (包含空格)
    keepLetterAndWord: function (value) {
        var newstr;
        value = value.trim();  //去除头尾空格

        if(this.CheckChinese(value)){
            var regLetter = /[^a-zA-Z\u4E00-\u9FA5]/g;
            newstr = value.replace(regLetter, "");
            return newstr
        }else{
            var regLetter = /[^a-zA-Z\u4E00-\u9FA5\u0020]/g;
            newstr = value.replace(regLetter, "");
            return newstr
        }

    },
    //保留字母和中文和数字 (包含空格)
    keepLetterAndWordAndNumber: function (value) {
        var newstr;
        value = value.trim();  //去除头尾空格

        if(this.CheckChinese(value)){
            var regLetter = /[^a-zA-Z0-9\u4E00-\u9FA5]/g;
            newstr = value.replace(regLetter, "");
            return newstr
        }else{
            var regLetter = /[^a-zA-Z0-9\u4E00-\u9FA5\u0020]/g;
            newstr = value.replace(regLetter, "");
            return newstr
        }

    },
//保留数字与字母
    keepNumberAndLetter: function (value) {
        var newstr;
        var regLetter = /[^a-zA-Z\d]/g;
        newstr = value.replace(regLetter, "");
        return newstr
    },
    //保留数字与字母
    keepEmail: function (value) {
        var newstr;
        var regLetter = /[^a-zA-Z\d@._]/g;
        newstr = value.replace(regLetter, "");
        return newstr
    },
    //保留数字与字母
    relaceAddress: function (value) {
        var newstr;
        var regLetter = /[#]/g;
        newstr = value.replace(regLetter, "");
        return newstr
    },
    //去除非数字及取整
    replaceOtherExceptNumber: function (value) {
        if (value.toString()) {
            var newstr;
            var regexp = /[^1234567890]]*/g;
            newstr = value.toString().replace(regexp, "");
            if (parseInt(newstr)) {
                return parseInt(newstr);
            } else {
                return '';
            }
        } else {
            return value;
        }
    },
    CheckChinese : function (value) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(value)){
            return true
        }else{
            return false
        }
    }
};


module.exports = inputFilter;