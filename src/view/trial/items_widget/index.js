require('./index.css');
var CentralWidget = require('../../../widget/CentralWidget');
var centralService = require('../../../service/CentralService');

var itemWidget = $.extend({}, CentralWidget, {
    urlParams: {},
    items: [
        {name: '投保须知', key: 'cbxz', id: parseInt(Math.random() * 10000), hasClicked: false},
        {name: '保险条款', key: 'bxtk', id: parseInt(Math.random() * 10000), hasClicked: false},
        {name: '责任免除', key: 'zrmc', id: parseInt(Math.random() * 10000), hasClicked: false},
        {name: '《声明与授权》', key: 'smysq', id: parseInt(Math.random() * 10000), hasClicked: false},
        {name: '《重大疾病保险投保提示》', key: 'zdjbbxts', id: parseInt(Math.random() * 10000), hasClicked: false},
    ],
    getUrl: function (itemid) {
        var that = this;
        var params = that.urlParams;
        params.itemid = itemid;
        var url = centralService.combineUrlWithParams('item.html', params);
        return url;
    },
    clickItem: function (item) {
        var that = this;
        var prefixName = centralService.getCacheNamePrefix(that.urlParams)
        var cacheName = prefixName + item.key
        localStorage.setItem(cacheName, "1");
        $('#' + item.id + ' a').css("color", "red");
    },
    fix: function () {
        var that = this;
        var items = that.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var prefixName = centralService.getCacheNamePrefix(that.urlParams)
            var cacheName = prefixName + item.key;
            var itemClickedCache = localStorage.getItem(cacheName);
            if (itemClickedCache == '1') { //有点击的缓存
                item.hasClicked = true;
                $('#' + item.id + ' a').css("color", "red");
            }
        }

    },
    validate: function () {
        var that = this;
        var errors = [];

        var items = that.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var prefixName = centralService.getCacheNamePrefix(that.urlParams)
            var cacheName = prefixName + item.key;
            var itemClickedCache = localStorage.getItem(cacheName);
            if (itemClickedCache != '1') { //无点击的缓存
                errors.push({type: "tooltip", msg: "请点击并阅读" + item.name + '条款', code: "", id: item.id})
            }
        }
        return errors.length > 0 ? errors : null;
    },
    onReady: function () {
        var that = this;
        console.log("onReady");
        console.log(that.urlParams)
    }
});


avalon.component('ms-701-item', {
    template: require('./701.html'),
    defaults: itemWidget
});

avalon.component('ms-601-item', {
    template: require('./601.html'),
    defaults: itemWidget
});

avalon.component('ms-603-item', {
    template: require('./603.html'),
    defaults: itemWidget
});

avalon.component('ms-605-item', {
    template: require('./605.html'),
    defaults: itemWidget
});

module.exports = itemWidget;
