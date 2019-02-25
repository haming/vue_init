var service = require('../service/CentralService')

var centralController = {
    $id: "vm",
    $listeners: [],
    service: service,
    singleProduct: '',//是否单产品项目
    urlParams: "",
    candidateArrays: "",
    auxProperties: {isLogin: false},
    productInfo: "",
    userInfo: "",
    order: "",
    appntInfo: "",
    insuredInfos: "",
    schemaInfo: "",
    LCInsureImparts: "",
    mobile: "",
    //导航
    goToIndex: function () {
        var that = this;
        var params = that.urlParams.$model;
        if (!params) {
            params = that.service.extractUrlParams(window.location.href);
        }
        var url = that.service.combineUrlWithParams("index.html", params)
        window.location.href = url;
    },
    goToDetail: function () {
        var that = this;
        var params = that.urlParams.$model;
        if (!params) {
            params = that.service.extractUrlParams(window.location.href);
        }
        var url = that.service.combineUrlWithParams(params.source + '-' + "detail.html", params)
        window.location.href = url;
    },
    goToMyOrder: function () {
        var that = this;
        var params = that.urlParams.$model;
        if (!params) {
            params = that.service.extractUrlParams(window.location.href);
        }
        if (!params.order_type) {
            params.order_type = '601'
        }

        that.service.getUserInfo(params)
            .then(function (data) {
                if (data.statusCode == -401) {
                    alertModal.open("您尚未登录，即将跳转至登录页", function () {
                        params.next = "myOrder.html";
                        var url = that.service.combineUrlWithParams("login.html", params)
                        window.location.href = url;
                    })
                } else if (data.statusCode == 1) {
                    delete params.id;
                    var url = that.service.combineUrlWithParams("myOrder.html", params);
                    window.location.href = url;
                } else {
                    that.handleTips(data.msg);
                }
            })
            .catch(function (errs) {
                that.handleTips(errs)
            });
    },
    logOut: function () {
        var deferred = $.Deferred();
        var that = this;

        var urlParams = that.service.extractUrlParams(window.location.href)
        that.service.logOut(urlParams)
            .then(function (data) {
                that.handleTips([{
                    type: "modal", msg: "您已成功退出登录", code: 1, callback: function () {
                        delete urlParams['id'];
                        var url = that.service.combineUrlWithParams("login.html", urlParams)
                        window.location.href = url;
                    }
                }]);
            })
            .catch(function (errs) {
                that.handleTips(errs);
            });

        deferred.resolve();
        // deferred.reject();
        return deferred;
    },
    takeOut: function (order_type) {
        var that = this;
        that.service.getUserInfo(that.urlParams.$model)
            .then(function (data) {
                if (data.statusCode == -401) { //未登录
                    var params = that.urlParams.$model;
                    params.order_type = order_type
                    delete params["id"];
                    var url = that.service.combineUrlWithParams(params.source + "-2.html", params);
                    window.location.href = url;
                } else { //已登录
                    var params = that.urlParams.$model;
                    params.order_type = order_type;
                    that.service.getOrderList(params)
                        .then(function (data) {
                            if (data.statusCode == 1) {
                                var orders = data.data;
                                if (orders.length > 0) { //存在订单
                                    //判断是否草稿单
                                    var isDraft = false;
                                    var isHasNotFinish = false;
                                    for (var x in orders) {
                                        if (orders[x].orderStatus == 0) {
                                            isDraft = true;
                                            break;
                                        } else {
                                            if (orders[x].orderStatus != 10) {
                                                isHasNotFinish = true;
                                            }
                                        }
                                    }
                                    if (isDraft) {//判断是否有草稿单
                                        window.alertModal.open("您已有草稿订单，将跳转到订单列表页", function () {
                                            var baseUrl = 'myOrder.html';
                                            var params = that.urlParams.$model;
                                            params.order_type = order_type
                                            var url = that.service.combineUrlWithParams(baseUrl, params);
                                            window.location.href = url;
                                        })
                                    } else {//无草稿单
                                        if (isHasNotFinish) {//判断是否有未完成的订单
                                            window.alertModal.openEventCancel("您有未完成订单，是否跳转到订单列表页完成投保", "以后再说", "现在跳转", function () {
                                                var params = that.urlParams.$model;
                                                params.order_type = order_type
                                                delete params["id"];
                                                var url = that.service.combineUrlWithParams(params.source + "-2.html", params);
                                                window.location.href = url;
                                            }, function () {
                                                var baseUrl = 'myOrder.html';
                                                var params = that.urlParams.$model;
                                                params.order_type = order_type
                                                var url = that.service.combineUrlWithParams(baseUrl, params);
                                                window.location.href = url;
                                            })
                                        } else {//没有
                                            var params = that.urlParams.$model;
                                            params.order_type = order_type
                                            delete params["id"];
                                            var url = that.service.combineUrlWithParams(params.source + "-2.html", params);
                                            window.location.href = url;
                                        }

                                    }

                                } else {//无订单
                                    var params = that.urlParams.$model;
                                    params.order_type = order_type
                                    delete params["id"];
                                    var url = that.service.combineUrlWithParams(params.source + "-2.html", params);
                                    window.location.href = url;
                                }
                            } else {
                                that.handleTips(data.msg)
                            }
                        })
                        .catch(function (err) {
                            that.handleTips(err);
                        });
                }
            })
            .catch(function (err) {
                if (err.code == -401) {
                    var params = that.urlParams.$model;
                    params.order_type = order_type
                    var url = that.service.combineUrlWithParams(params.source + "-2.html", params);
                    window.location.href = url;
                } else {
                    that.handleTips(err);
                }
            });
    },
    goToLogin: function () {
        var that = this;
        var params = that.urlParams.$model;

        if (!params) {
            params = that.service.extractUrlParams(window.location.href);
        }
        if (!params.order_type) {
            params.order_type = '601'
        }
        var url = that.service.combineUrlWithParams("login.html", params)
        window.location.href = url;

    },
    //监听
    bindListeners: function () {

    },
    unBindListeners: function () { //解绑所有控制器
        var that = this;
        $('.watch').off('change');
        $('.watch').off('blur');
        for (var i = 0; i < that.$listeners.length; i++) {
            var $listener = that.$listeners[i];
            $listener();
        }
    },
    checkBrowser: function () { //检测浏览器版本
        var that = this;
        var deferred = $.Deferred();
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = false;
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp['$1']);
            IE9 = fIEVersion == 9.0;
            if (IE55) {
                that.auxProperties.isIEType = true;
            }
            if (IE6) {
                that.auxProperties.isIEType = true;
            }
            if (IE7) {
                that.auxProperties.isIEType = true;
            }
            if (IE8) {
                that.auxProperties.isIEType = true;
            }
            if (IE9) {
                that.auxProperties.isIEType = true;
            }
        }
        deferred.resolve();
        return deferred;
    },
    //组件
    widgetValidate: function (object) { //统一对组件进行验证
        var errs = [];
        for (var x in object) {
            if (object[x] && typeof object[x] == 'object' && object[x].validate) {
                var validateResult = object[x].validate();
                if (validateResult) {
                    errs = errs.concat(validateResult)
                }
            }
        }
        return errs.length > 0 ? errs : null;
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
    //提示
    handleSingleTipsByType: function (err) {
        var that = this;
        console.log("handleSingleTipsByType:", err)
        if (err.type == "alert") {
            alert(err.msg)
        } else if (err.type == "tooltip") {
            $('#' + err.id).tooltip();
            $('#adfksj').tooltip('show');
            if (err.id) {
                $('#' + err.id).tooltip('show');
                setTimeout(function () {
                    $('#' + err.id).tooltip('destroy');
                }, 5000)
            }
            if (that.mobile) {
                $('.konwfooter').tooltip('show');
                setTimeout(function () {
                    $('.konwfooter').tooltip('destroy');
                }, 5000)
            }
        }
        else if (err.type == "modal") {
            if (err.callback) {
                alertModal.open(err.msg, err.callback)
            } else {
                alertModal.open(err.msg)
            }
        }
    },
    handleTips: function (errs) { //处理不同类型的错误提示
        console.log("handleTips", errs);
        try {
            var that = this;
            var typeOfError = typeof (errs);
            console.log(typeOfError)
            that.testMobileOrPc();
            alertModal.setMobile(that.mobile);
            if (typeOfError == "object") {
                if (errs instanceof Array) {
                    for (var i = 0; i < errs.length; i++) {
                        var err = errs[i];
                        that.handleSingleTipsByType(errs[0])
                    }
                } else {
                    that.handleSingleTipsByType(errs)
                }
            } else if (typeOfError == "string") {
                alertModal.setMobile(that.mobile);
                alertModal.open(errs)
            }
        } catch (e) {
            console.log(e)
        }
    },
    //初始化
    initView: function () {
        var that = this;
        that.testMobileOrPc();
    },
    init: function () {
        var that = this;

        var url = window.location.href;
        var urlParams = that.service.extractUrlParams(url);
        that.urlParams = urlParams;
        that.service.initWithoutLoginService(url)
            .then(function (data) {
                console.log("init 获取的数据", data);
                for (var x in data.data) {
                    that[x] = data.data[x];
                }
                setTimeout(function () {
                    that.bindListeners();
                    that.initView();
                }, 500)
            })
            .catch(function (errs) {
                that.handleTips(errs);
            });
    },
    testMobileOrPc: function () {
        var that = this;
        if (document.body.clientWidth < 768) {
            that.mobile = true;
        } else {
            that.mobile = false;
        }
        $(window).resize(function () {
            if (document.body.clientWidth < 768) {
                that.mobile = true;
            } else {
                that.mobile = false;
            }
        })
    },
    myBrowserType: function myBrowserType() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            return true
        } else {
            return false
        }
    },

};

module.exports = centralController;
