var CentralWidget = require('./CentralWidget');
var CentralService = require('../service/CentralService');

var input = $.extend({}, CentralWidget, {
    type: 'order_form', //组件的类别，用于service层动态对比配置进行实例化
    effectiveDate: "",
    startDate: "",
    order: {},
    form: {},
    ownOrder: "",
    userInfo: "",
    urlParams: '',
    orderToFormTransform: function () {

    },
    formToOrderTransform: function () {

    },
    setUpWidgetService: function (form, widgetConfig) {
        var deferred = $.Deferred();
        var that = this;
        var index = 0;
        //将配置自动化复制进组件
        for (var x in widgetConfig) {
            //取得组件实例 (创建一个独立的新对象)
            widgetConfig[x].serieNo = index;
            index += 1;
            var widget = $.extend({}, require('../widget/index')[widgetConfig[x].type]);
            //将配置放进组件实例
            for (var y in widgetConfig[x]) {
                widget[y] = widgetConfig[x][y];
            }
            var value = form[x];
            widget.setValue(value); //设置值的时候，组件会进行单位转换、拆解等操作
            form[x] = widget

            // console.log(widgetConfig[x].type, widget)
        }

        deferred.resolve(form);
        // deferred.reject();
        return deferred;
    },
    converWidgetToData: function (object) { //统一对组件进行数据转换
        var data = {}
        for (var x in object) {
            if (object[x] && typeof object[x] == 'object' && object[x].getValue) {
                console.log(object[x] + '即将被转换')
                object[x] = data[x] = object[x].getValue();
            } else {
                data[x] = object[x]
            }
        }
        return data;
    },
    widgetFix: function (object) { //统一对组件进行自修复
        var that = this;
        var deferred = $.Deferred()
        for (var x in object) {
            if (object[x] && typeof object[x] == 'object' && object[x].fix) {
                object[x].fix();
            }
        }
        return deferred
    },
    widgetValidate: function (object) { //统一对组件进行自修复
        var errors = [];
        var index = 0;
        for (var y in object) {
            for (var x in object) {
                if (object[x] && typeof object[x] == 'object' && object[x].validate) {
                    if (object[x].serieNo == index) {
                        var error = object[x].validate();
                        errors = errors.concat(error)
                        index += 1;
                        break;
                    }
                }
            }
        }
        return errors;
    },
    hasCache: function () {
        var that = this;
        var cachePreFix = CentralService.getCacheNamePrefix(that.urlParams);
        var cacheName = cachePreFix + 'order';
        var orderString = localStorage.getItem(cacheName);
        if (orderString) {
            return true;
        } else {
            return false;
        }
    },
    orderToCache: function () {
        var that = this;
        var cachePreFix = CentralService.getCacheNamePrefix(that.urlParams);
        var cacheName = cachePreFix + 'order';
        localStorage.setItem(cacheName, JSON.stringify(that.order));
    },
    cacheToOrder: function () {
        var that = this;
        var cachePreFix = CentralService.getCacheNamePrefix(that.urlParams);
        var cacheName = cachePreFix + 'order';
        var orderString = localStorage.getItem(cacheName);
        var order = "";
        if (orderString) {
            order = JSON.parse(orderString);
            that.order = order;
        }
        return order;
    },
    removeCache: function () {
        var that = this;
        var cachePreFix = CentralService.getCacheNamePrefix(that.urlParams);
        var cacheName = cachePreFix + 'order';
        localStorage.removeItem(cacheName);
    }
});


module.exports = input;
