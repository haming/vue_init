var CentralWidget = require('./CentralWidget');
var allProvinces = require('../repository/dic/provinces');
var allCities = require('../repository/dic/cities');
var allDistricts = require('../repository/dic/districts');

var address = $.extend({}, CentralWidget, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    type: 'address', //组件的类别，用于service层动态对比配置进行实例化
    provinces: allProvinces,
    cities: [],
    districts: [],
    province: '',
    city: '',
    district: '',
    detail: '',

    provinceId: (Math.random() * 100000),
    cityId: (Math.random() * 100000),
    districtId: (Math.random() * 100000),

    contactDetailedAddress: '',
    getCitiesByProvince: function (proId) {
        console.log('proId', proId);
        var list = [];
        for (var i = 0; i < allCities.length; i++) {
            var city = allCities[i];
            if (city.id.substring(0, 2) == proId) {
                list.push(city);
            }
        }
        this.cities = list;
        return this.cities;
    },
    getDistrictsByCity: function (cityId) {
        var list = [];
        for (var i = 0; i < allDistricts.length; i++) {
            var district = allDistricts[i];
            if (district.id.substring(0, 4) == cityId) {
                list.push(district);
            }
        }
        this.districts = list;
        return this.districts;
    },

    combineChineseName: function () { //生成中文全地址
        //地址
        var that = this;
        var str1 = that.province;
        var str2 = that.city;
        var str3 = that.district;
        var str4 = that.detail;

        var cn1, cn2, cn3, cn4;

        if (str1 == '' && str1 != '0') {
            cn1 = ''
        } else {
            var result = '';
            for (var i = 0; i < allProvinces.length; i++) {
                var item = allProvinces[i];
                if (str1 == item['id']) {
                    result = item['name']
                }
            }
            // return result;
            cn1 = result;
        }
        if (str2 == '' && str2 != '0') {
            cn2 = ''
        } else {
            var result = '';
            // console.log(cities.length);
            for (var i = 0; i < allCities.length; i++) {
                var item = allCities[i];
                if (str2 == item['id']) {
                    result = item['name'];
                }
            }
            // return result;
            cn2 = result;
        }

        if (str3 == '' && str3 != '0') {
            cn3 = ''
        } else {
            var result = '';
            for (var i = 0; i < allDistricts.length; i++) {
                var item = allDistricts[i];
                if (str3 == item['id']) {
                    result = item['name']
                }
            }
            cn3 = result;
            // return result;
        }
        if (str4) {
            cn4 = str4;
        } else {
            cn4 = ''
        }

        return cn1 + cn2 + cn3 + cn4

    },
    fix: function () { //自动修复，将省市区的选项，候选项目修复正确
        var that = this;
        var province = that.province;
        var city = that.city;
        //处理候选数组
        if (province) {
            that.getCitiesByProvince(province);
        }
        if (city) {
            that.getDistrictsByCity(city);
        }

        //处理城市选项是否在候选列表中
        var candidateArray = that.cities;
        var isValueInCandidateArray = false;
        //如果已选值不在候选值中，重置选项为空
        for (var i = 0; i < candidateArray.length; i++) {
            var item = candidateArray[i];
            if (item['key'] && item.key === that.city) {
                isValueInCandidateArray = true;
            }
            if (item['id'] && item.id === that.city) {
                isValueInCandidateArray = true;
            }
        }

        if (!isValueInCandidateArray) {
            that.city = '0'
            that.districts = []
            that.district = '0'
        }

        //处理地区选项是否在候选列表中
        candidateArray = that.districts;
        isValueInCandidateArray = false;
        //如果已选值不在候选值中，重置选项为空
        for (var i = 0; i < candidateArray.length; i++) {
            var item = candidateArray[i];
            if (item['key'] && (item.key === that.district)) {
                isValueInCandidateArray = true;
            }
            if (item['id'] && (item.id === that.district)) {
                isValueInCandidateArray = true;
        }
        }

        if (!isValueInCandidateArray) {
            that.district = '0'
        }
        console.log(that.value + ':执行了fix操作')
    },
    getValue: function () {
        var that = this;
        return that.detail;
    },
    setValue: function (detail) {

        var that = this;

        that.detail = detail;


    },
});


module.exports = address;
