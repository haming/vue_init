var centralService = require('../../pension/2/service');
var service = {
    getDefaultDataService: function (urlParams) { //获取默认值设置的服务
        var that = this;
        var deferred = $.Deferred();

        // var formHtml = urlParams.organization_id == "pension" ? require('./form_html/' + 'pension' + '.html') : require('./form_html/' + 'aki' + '.html')
        // var formHtml = (urlParams.order_type == "801" || urlParams.order_type == "603" || urlParams.order_type == "605") ? require('./form_html/' + 'pension' + '.html') : require('./form_html/' + 'pension' + '.html')
        var formHtml;
        switch (urlParams.pension) {
            case "1":
                formHtml = require('./form_html/pension_1.html');
                break;
            case "2":
                formHtml = require('./form_html/pension_2.html');
                break;
            case "3":
                formHtml = require('./form_html/pension_3.html');
                break;
            case "4":
                formHtml = require('./form_html/pension_4.html');
                break;
            case "5":
                formHtml = require('./form_html/pension_5.html');
                break;
            case "6":
                formHtml = require('./form_html/pension_6.html');
                break;
            default :
                formHtml = require('./form_html/pension_1.html');
                break;
        }
        var data = {
            statusCode: 1,
            msg: "",
            data: {
                candidateArrays: { //候选的可选数据

                },
                auxProperties: {
                    formHtml: formHtml,
                    next: '',//用于判断是否需要跳转回上个页面
                    code_time: false,//用于判断是否点击了获取短信验证码按钮
                    code_times: 60,//用于点击获取验证码之后的倒计时时间显示
                    showClean: false,//用于判断手机号码是否输入，控制删除按钮显示
                    loginUrl: that.config.serverUrl + '/' + that.config.env + '/opr/' + that.config.source + '/userLogin',
                    codeUrl: that.config.loginCodeUrl,
                    phoneNumberShow: false,//手机号码错误提示显示
                    codeNumberShow: false,//图形验证码错误提示显示
                    phoneCodeNumberShow: false,//短信验证码错误提示显示
                    mobileFormatted: '',//手机号码输入之后的拆分显示
                    sendCodePopUp: false,//短信发送成功弹窗提示
                    mobileInputShow: false,//用于手机号码显示格式
                    allowNext: true,//判断是否可以点击进入按钮（登录按钮）
                    order_type: urlParams.order_type,
                    organization_id: urlParams.organization_id,
                    isLogin: false,
                    employee_number: false,//水印
                    employee_name: false,//水印
                    mobile_phone: false,//水印
                    authImage_Code: false,//水印
                    verification_code: false,//水印
                    createData: {
                        "relationship": '',
                        "employee_number": '',
                        "gender": '',
                        "organization_name": '',
                        "birthday": '',
                        "type": '',
                        "pay_year": '',
                        "insured_amount": '',
                        "insured_amount_two": '',//附加险的默认值
                        "current_premium": '',
                        "pay_year_flag": '',
                        "remark": '',
                        "pay_interval": '',//交费方式
                        "insurance_period": ''
                    },
                },
                urlParams: urlParams,
                productInfo: {},
                myOrder: {},
                userInfo: {
                    employee_number: '',
                    employee_name: '',
                    mobile_phone: '',
                    verification_code: '',
                    authImage_Code: '',
                    type: urlParams.order_type,
                    organization_id: urlParams.organization_id
                },
            },
        };
        deferred.resolve(data);
        return deferred;
    },

    checkHasOrder: function (order_type) {
        var deferred = $.Deferred();
        var that = this;
        that.getOrderList(order_type)
            .then(function (orderList) {
                if (orderList == null) {
                    deferred.resolve(false)
                }
                else if (orderList.length == 0) {
                    deferred.resolve(false)
                } else if (orderList.length > 0) {
                    deferred.resolve(true)
                }
            });
        return deferred;
    },
    getCookies: function (createData, order_type) {//拿到Cookies
        var deferred = $.Deferred();
        for (var x in createData) {
            createData[x] = localStorage.getItem(order_type + '-' + 'pension-2-' + x);
        }
        console.log("getCookies()", createData);
        deferred.resolve(createData);
        return deferred;
    },
    deleteCookies: function (createData) {
        var deferred = $.Deferred();
        for (var x in createData) {
            localStorage.removeItem(order_type + '-' + 'pension-2-' + x);
        }
        deferred.resolve();
        return deferred;
    },
    clickNextService: function (urlParams, form) {
        var deferred = $.Deferred();
        var that = this;
        try {

            that.loginService(urlParams, form)
                .then(function () {
                    var params = urlParams;
                    that.getOrderList(urlParams).then(function (data) {
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
                                        var url = that.combineUrlWithParams(baseUrl, params);
                                        // window.location.href = url;
                                        deferred.resolve(url);
                                    })
                                } else {
                                    console.log("clickNextService")
                                    console.log(params)
                                    if (params.createOrder == '1') { //要求创建订单
                                        var form_order_widget = require('../../pension/2/order_to_premiul_trial_form_widget');
                                        form_order_widget.urlParams = params;

                                        var orderFromCache = form_order_widget.cacheToOrder();

                                        console.log("orderFromCache", orderFromCache)
                                        var orderId = '';
                                        var relationship = orderFromCache.insuredNewList[0].relationToAppnt;
                                        that.createOrder(urlParams, relationship)
                                            .then(function (id) {
                                                orderId = id;
                                                return that.saveSchemaInfo(urlParams, orderFromCache.riskNewList, orderFromCache.currentPremium, orderId);
                                            })
                                            // .then(function () {
                                            //     var appntNew = orderFromCache.appntNew
                                            //     appntNew.appntName = appntNew.appntName ? appntNew.appntName : form.employee_name
                                            //     appntNew.mobilePhoneNumber = appntNew.mobilePhoneNumber ? appntNew.mobilePhoneNumber : form.mobile_phone
                                            //     return that.saveAppntInfo(urlParams, orderFromCache.appntNew, orderId);
                                            //
                                            // })
                                            // .then(function () {
                                            //     return that.saveInsuredInfo(urlParams, orderFromCache.insuredNewList, orderId);
                                            // })
                                            .then(function () {
                                                var baseUrl = urlParams.source + '-' + '3.html';
                                                var params = urlParams;
                                                params.id = orderId;
                                                delete params['next'];
                                                delete params['createOrder'];
                                                var url = that.combineUrlWithParams(baseUrl, params);
                                                deferred.resolve(url);
                                            })
                                            .catch(function (err) {
                                                deferred.reject(err);
                                            })
                                    } else { //不要求创建订单，直接跳转试算方案页
                                        var url = '';
                                        if (params.next) {
                                            var urlParam = {};
                                            for (var x in params) {
                                                urlParam[x] = params[x]
                                            }
                                            delete urlParam.id;
                                            delete urlParam.next;
                                            url = that.combineUrlWithParams(params.next, urlParam);
                                        } else {
                                            delete params.id;
                                            delete params.next;
                                            delete params.createOrder;
                                            url = that.combineUrlWithParams("index.html", params);
                                        }

                                        deferred.resolve(url);
                                    }
                                }
                            } else {//没有历史订单
                                console.log("clickNextService")
                                console.log(params)
                                if (params.createOrder == '1') { //要求创建订单
                                    var form_order_widget = require('../../pension/2/order_to_premiul_trial_form_widget');
                                    form_order_widget.urlParams = params;

                                    var orderFromCache = form_order_widget.cacheToOrder();

                                    console.log("orderFromCache", orderFromCache)

                                    var orderId = '';

                                    var relationship = orderFromCache.insuredNewList[0].relationToAppnt;
                                    that.createOrder(urlParams, relationship)
                                        .then(function (id) {
                                            orderId = id;
                                            return that.saveSchemaInfo(urlParams, orderFromCache.riskNewList, orderFromCache.currentPremium, orderId);
                                        })
                                        // .then(function () {
                                        //     var appntNew = orderFromCache.appntNew
                                        //     appntNew.appntName = appntNew.appntName ? appntNew.appntName : form.employee_name
                                        //     appntNew.mobilePhoneNumber = appntNew.mobilePhoneNumber ? appntNew.mobilePhoneNumber : form.mobile_phone
                                        //     return that.saveAppntInfo(urlParams, orderFromCache.appntNew, orderId);
                                        //
                                        // })
                                        // .then(function () {
                                        //     return that.saveInsuredInfo(urlParams, orderFromCache.insuredNewList, orderId);
                                        // })
                                        .then(function () {
                                            var baseUrl = urlParams.source + '-' + '3.html';
                                            var params = urlParams;
                                            params.id = orderId;
                                            delete params['next'];
                                            delete params['createOrder'];
                                            var url = that.combineUrlWithParams(baseUrl, params);
                                            deferred.resolve(url);
                                        })
                                        .catch(function (err) {
                                            deferred.reject(err);
                                        })
                                } else { //不要求创建订单，直接跳转试算方案页
                                    var url = '';
                                    if (params.next) {
                                        var urlParam = {};
                                        for (var x in params) {
                                            urlParam[x] = params[x]
                                        }
                                        delete urlParam.id;
                                        delete urlParam.next;
                                        url = that.combineUrlWithParams(params.next, urlParam);
                                    } else {
                                        delete params.id;
                                        delete params.next;
                                        delete params.createOrder;
                                        url = that.combineUrlWithParams("index.html", params);
                                    }
                                    deferred.resolve(url);
                                }
                            }
                        }
                    })
                })
                .catch(function (err) {
                    deferred.reject(err);
                })
        } catch (e) {
            console.log(e)
        }

        return deferred;
    },
    initWithoutLoginService: function (url) {
        var deferred = $.Deferred();
        var that = this;

        var result = {
            data: {}
        };
        //解释参数
        var urlParams = that.extractUrlParams(window.location.href)
        result.data.urlParams = urlParams;
        that.getDefaultDataService(urlParams)
            .then(function (data) {
                for (var x in data.data) {
                    result.data[x] = data.data[x];
                }
                return that.getProductInfo(urlParams)
            })
            .then(function (productInfo) {
                result.data.productInfo = productInfo;
                return that.getUserInfo(urlParams)
            })
            .then(function (data) {
                if (data.statusCode == -401) { //未登录
                    result.data.auxProperties.isLogin = false;
                } else {
                    result.data.userInfo = data.data;
                    result.data.auxProperties.isLogin = true;
                }

                //实例化表单组件
                var login_data_to_form_widget = $.extend({}, require('./login_data_to_form_widget'));
                login_data_to_form_widget.order = result.data.userInfo;
                login_data_to_form_widget.orderToFormTransform();
                result.data.login_data_to_form_widget = login_data_to_form_widget;
                deferred.resolve(result);
            })
            .catch(function (err) {
                deferred.resolve(result)
            });

        return deferred;
    }
};

service = $.extend({}, centralService, service);
module.exports = service;
