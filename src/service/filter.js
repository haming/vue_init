/**
 * Created by brave on 17/2/7.
 */
/**
 * Created by brave on 16/12/28.
 */
//null filter
import Vue from 'vue'

var careersAll = require('../repository/dic/careersAll');
var maritalStatus = require('../repository/dic/maritalStatus');
var genders = require('../repository/dic/genders');
var orderStatus = require('../repository/dic/orderStatus');
var relationships = require('../repository/dic/relationships');
var icTypes = require('../repository/dic/icTypes');
var uwResults = require('../repository/dic/uwResults');
var nationLists = require('../repository/dic/nationalities');
var provinces = require('../repository/dic/provinces');
var cities = require('../repository/dic/cities');
var districts = require('../repository/dic/districts');
var surveys = require('../repository/dic/surveys');
var paymentMethod = require('../repository/dic/paymentMethod');
var work_departments = require('../repository/dic/work_departments');
var pay_intervals = require('../repository/dic/paymentMethod');//设置交费方式
var rankCode = require('../repository/dic/positions');//设置交费方式

let filter = {
    nullFilter: function (str) {
        if (str == null || str == undefined) {
            return '';
        } else {
            return str
        }
    },
    emailFilter: function (str) {
        // //avalon.log('职业代码:' + str)
        return str.toLocaleLowerCase();
    },

    payYearFilter: function (str) {
        if (str == '0' || str == 0) {
            return '趸交';
        } else {
            return str + '年'
        }
    },
    workDepartmentsFilter: function (str) {
        for (var i = 0; i < work_departments.length; i++) {
            if (str == work_departments[i].key) {
                return work_departments[i].value
            }
        }
    },

    payIntervalFilter: function (str) {
        if (str == 0) {
            return "一次性交清";
        } else {
            for (var i = 0; i < pay_intervals.length; i++) {
                if (str == pay_intervals[i].key) {
                    return pay_intervals[i].value;
                }
            }
        }
    },
    setNullFilter: function (str) {
        if (str == null || str == undefined) {
            return '--';
        } else {
            return str
        }
    },
    paymentMethodFilter: function (str) {
        if (str == '' && str != '0') {
            return '全部'
        } else {
            var items = paymentMethod;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },
    insurance_period: function (str) {
        if (str == null || str == undefined) {
            return '';
        } else {
            return str + '年'
            // if (str == 20 || str == 30) {
            //     return str + '年'
            // } else {
            //     return '至被保险人' + str + "周岁后的首个保单周年日"
            // }
        }
    },

//订单状态过滤器
    orderStatusFilter: function (str) {
        // avalon.log('订单状态代码:' + str)
        if (str == '' && str != '0') {
            return '全部'
        } else {
            var items = orderStatus;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//核保结果过滤器
    uwResultFilter: function (str) {
        // avalon.log('核保状态代码:' + str)
        if (str == '' && str != '0') {
            return '全部'
        } else {
            var items = uwResults;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//调研报告过滤器
    surveyFilter: function (str) {
        if (str == '' && str != '0') {
            return '全部'
        } else {
            var items = surveys;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },


//职级
    rankCodeFilter: function (str) {
        // avalon.log('关系代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = rankCode;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//关系
    relationShipFilter: function (str) {
        // avalon.log('关系代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = relationships;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//证件
    icTypeFilter: function (str) {
        // avalon.log('证件代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = icTypes;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//性别
    genderFilter: function (str) {
        // avalon.log('性别代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = genders;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }


    },

//是否长期有效
    icIsLongValidFilter: function (str) {
        // avalon.log('证件是否长期有效代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else if (str == '1') {
            return '是'
        } else if (str == '0') {
            return '否'
        }
    },
//是否证件号码
    icNumberFilter: function (str) {
        str = str.toUpperCase();
        return str
    },

//婚姻
    maritalFilter: function (str) {
        // avalon.log('婚姻状态代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = maritalStatus;// 引用dic/maritalStatus.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }

    },

//职业
    careerFilter: function (str) {
        // avalon.log('职业代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var items = careersAll;// 引用dic/careersAll.js
            for (var i = 0; i < items.length; i++) {
                if (str == items[i].key) {
                    return items[i].value
                }
            }
        }
    },

//国籍
    countryFilter: function (str) {
        // avalon.log('国籍代码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            for (var i = 0; i < nationLists.length; i++) {
                var item = nationLists[i];
                if (str == item['id']) {
                    // avalon.log(item['cn'])
                    return item['cn'];
                }
            }
        }
    },

//省var provinces =
    provinceFilter: function (str) {
        if (str == '' && str != '0') {
            return ''
        } else {
            var result = '';
            for (var i = 0; i < provinces.length; i++) {
                var item = provinces[i];
                if (str == item['id']) {
                    result = item['name']
                }
            }
            return result;
        }
    },

//市
    cityFilter: function (str) {
        if (str == '' && str != '0') {
            return ''
        } else {
            var result = '';
            // avalon.log(cities.length);
            for (var i = 0; i < cities.length; i++) {
                var item = cities[i];
                if (str == item['id']) {
                    result = item['name'];
                }
            }
            return result;
        }
    },

//区
    districtFilter: function (str) {
        if (str == '' && str != '0') {
            return ''
        } else {
            var result = '';
            for (var i = 0; i < districts.length; i++) {
                var item = districts[i];
                if (str == item['id']) {
                    result = item['name']
                }
            }
            return result;
        }
    },

//省市区
    addressFilter: function (str) {
        // avalon.log('地址编码:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            var _sep = str.split('#');

            var _province = _sep[0];
            var _city = _sep[1];
            var _area = _sep[2];
            var _addr = _sep[3];

            var finalResult = '';

            for (var i = 0; i < provinces.length; i++) {
                var item = provinces[i];
                if (_province == item['ProID']) {
                    var result = item['ProName']
                    finalResult = finalResult + result;
                    // avalon.log(result)
                }
            }
            for (var i = 0; i < cities.length; i++) {
                var item = cities[i];
                if (_city == item['CityID']) {
                    var result = item['CityName']
                    finalResult = finalResult + result;
                    // avalon.log(result)
                }
            }
            for (var i = 0; i < districts.length; i++) {
                var item = districts[i];
                if (_area == item['DisID']) {
                    var result = item['DisName']
                    finalResult = finalResult + result;
                    // avalon.log(result)
                }
            }
            finalResult = finalResult + _addr;

            return finalResult;
        }
    },

// 年收入
    thounsandFilter: function (str) {
        // avalon.log('千份位解释前:' + str)
        if (str == '' && str != '0') {
            return ''
        } else {
            return formatNum(str)
        }
    },

//千份位分隔符
    formatNum: function (num) {
        return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },

//千份位分隔符
    formatNumWithLetter: function (num) {
        var value = parseFloat(num);
        value = value / 10000;
        value = value.toFixed(2);
        return value;
    },

//订单类型过滤器
    orderTypeFilter: function (str) {
        // avalon.log('订单类型代码:' + str)
        if (str == 0) {
            return '请选择'
        } else if (str == 1) {
            return '珍爱'
        } else if (str == 2) {
            return '精英智选'
        }
    },

    ageFilter: function (str) {
        if (str == null || str == undefined) {
            return '';
        } else {
            var age = ages(str);
            if (age != '输入的日期格式错误！' && age != false) {
                return age;
            } else {
                return ''
            }
        }
    },


//险种编码过滤器
    riskCodeFilter: function (str) {
        if (str == null || str == undefined) {
            return '';
        } else {
            if (str == "PMLD007") {
                return "招商信诺安康万家重大疾病保险"
            }
            if (str == "QMLD018") {
                return "招商信诺附加安康万家特定恶性肿瘤疾病保险"
            }
            if (str == "QMLD017") {
                return "招商信诺附加安康万家豁免保险费疾病保险"
            }
        }
    },

    idNoFilter: function (str) {
        if (str) {
            str = str.slice(str.length - 4, str.length)
        }
        return str
    },

    payIntvFilter: function (str) {
        if (str) {
            if (str == "1") {
                return '月'
            } else {
                return '年'
            }
        }
        return str
    },

//证件号码
    ic_numberFilter: function (str) {
        // //avalon.log('职业代码:' + str)
        return str.toLocaleUpperCase();
    },

    testFilter: function (str) {
        return str + "0123"
    }
}


module.exports = filter
