var centralService = require('../../service/CentralService');

var service = {
    getDefaultDataService: function (urlParams) { //获取默认值设置的服务
        var that = this;
        var deferred = Deferred();
        var data = {
            statusCode: 1,
            msg: "",
            data: {
                candidateArrays: that.getDefaultCandidateArrayService(urlParams),
                auxProperties: {myOrderAge: 17},
                urlParams: urlParams,
                productInfo: {},
                userInfo: {},
                order: {
                    organizationId: urlParams.organization_id,
                    relationship: '',
                    type: urlParams.order_type
                },
                ownOrder: "", //json
                allOrder: "", //全部订单
            },
            appntNewForm: {},
            insuredNewListForm: {},
            order_to_form_widget: {},
        };
        deferred.resolve(data);
        return deferred.promise;
    },
    parseAppntNewFormService: function (userInfo, order, appntNewForm) {
        var deferred = Deferred();
        var that = this;

        // deferred.reject(data.msg)
        for (x in order.appntNew) {
            appntNewForm[x] = order.appntNew[x]; //获取本人数据
        }
        var config = require('../../widget/config').appntConfig;//读取投保人组件配置
        //
        that.setUpWidgetService(appntNewForm, config); //配置组件,返回ui层可用的数据
        //
        deferred.resolve(appntNewForm);
        return deferred.promise;
    },
    getCrsStatusForHtml: function (relationship, userinfo_resident_flag, myorder_resident_flag) {
        var deferred = Deferred();
        var that = this;

        if (relationship == '00') {
            if (userinfo_resident_flag == 1) {
                deferred.resolve(1)
            } else {
                deferred.resolve(2)
            }
        } else {
            if (userinfo_resident_flag == 1 && myorder_resident_flag == 1) {
                deferred.resolve(3)
            }
            else if (userinfo_resident_flag == 1 && myorder_resident_flag != 1) {
                deferred.resolve(4)
            }
            else if (userinfo_resident_flag != 1 && myorder_resident_flag == 1) {
                deferred.resolve(5)
            }
            else if (userinfo_resident_flag != 1 && myorder_resident_flag != 1) {
                deferred.resolve(6)
            }
        }

        return deferred.promise;
    },
    parseInsuredNewListFormService: function (userInfo, orders, insuredNewListFormElement, insuredNewListForm) {
        var deferred = Deferred();
        var that = this;


        var config = require('../../widget/config').insuredConfig;//读取投保人组件配置
        for (var i = 0; i < insuredNewListForm.length; i++) {
            var insuredForm = insuredNewListForm[i];
            that.setUpWidgetService(insuredForm, config); //配置组件 ,升级被保人数据
        }

        deferred.resolve(insuredNewListForm);
        return deferred.promise;
    },
    getCorrectDataService: function (urlParams, result) {
        var deferred = Deferred();

        var appntNewForm = result.data.appntNewForm;
        var insuredNewListForm = result.data.insuredNewListForm[0];

        var adapter = { //左边是投保人字段，右边是被保人字段
            appntName: 'insuredName',
            appntidType: 'insuredIdtype',
            appntidNo: 'insuredIdno',
            idExpDate: 'idExpDate',
            idIsLongValid: 'idIsLongValid',
            appntSex: 'insuredSex',
            appntBirthday: 'insuredBirthday',
            marriage: 'marriage',
            nativePlace: 'nativePlace',
            personalIncome: 'personalIncome',
            occupationCode: 'occupationCode',
            companyOrSchool: 'companyOrSchool',
            mobilePhoneNumber: 'mobilePhoneNumber',
            email: 'email',
            contactDetailedAddress: 'contactDetailedAddress',
            taxIdentity: 'taxIdentity',
            // serviceNo: "serviceNo"
        };

        if (insuredNewListForm.relationToAppnt.value == '00') {
            for (x in adapter) {
                insuredNewListForm[adapter[x]].value = appntNewForm[x].value;
            }
        }

        deferred.resolve(result);
        return deferred.promise;
    },
    clickNextService: function (urlParams, appntNewForm, insuredNewListForm, orderId, candidateArrays) {
        var deferred = Deferred();
        var that = this;



        // for (var i = 0; i < insuredNewListForm.length; i++) {
        //     var insured = insuredNewListForm[i];
        //     if(insured.relationToAppnt == "00"){
        //
        //     }
        // }


        that.saveAppntInfo(urlParams, appntNewForm, orderId)
            .then(function () {
                return that.saveInsuredInfo(urlParams, insuredNewListForm, orderId);
            })
            .then(function () {
                return that.getCrsStatusForHtml(insuredNewListForm[0].relationToAppnt, appntNewForm.taxIdentity, insuredNewListForm[0].taxIdentity)
            })
            .then(function (status) {

                //删除缓存
                try {
                    var form_order_widget = require('../trial/order_to_premiul_trial_form_widget');
                    form_order_widget.urlParams = urlParams;
                    form_order_widget.removeCache();//删除缓存
                } catch (e) {
                }

                var params = urlParams;
                params.id = orderId;
                var targetUrl = '';

                if (status == 1) { //两者都不需要填写crs
                    targetUrl = '4.html';
                }

                if (status == 2) { //只是用户单需要填写crs
                    targetUrl = 'crs_userinfo.html';
                    params.resident_flag = appntNewForm.taxIdentity;
                }

                if (status == 3) { //两者都不需要填写crs
                    targetUrl = '4.html';
                }
                if (status == 4) { //只是家属单需要填写crs
                    targetUrl = 'crs.html';
                    params.resident_flag = insuredNewListForm[0].taxIdentity;
                }
                if (status == 5) { //只是用户单需要填写crs
                    targetUrl = 'crs_userinfo.html';
                    params.resident_flag = appntNewForm.taxIdentity;
                }
                if (status == 6) { //两者都需要填写crs
                    targetUrl = 'crs_userinfo.html';
                    params.resident_flag = appntNewForm.taxIdentity;
                }

                var baseUrl = urlParams.source + '-' + targetUrl;
                var url = service.combineUrlWithParams(baseUrl, params);
                deferred.resolve(url);
            })
            .otherwise(function (err) {
                deferred.reject(err)
            });


        return deferred.promise;
    },
    initwithLoginService: function (url, noCache) {
        var deferred = Deferred();
        var that = this;

        var result = {
            data: {}
        };

        //解释参数
        var urlParams = that.extractUrlParams(url);
        result.data.urlParams = urlParams;

        //合并用户信息服务 优先级： 后台数据 > 缓存 > 默认值
        //合并订单信息服务 优先级： 后台数据 > 缓存 > 默认值
        //合并用户与订单数据 优先级：用户数据 > 订单数据

        that.getDefaultDataService(urlParams)
            .then(function (data) {
                for (x in data.data) {
                    result.data[x] = data.data[x];
                }
                return that.getProductInfo(urlParams)
            })
            .then(function (productInfo) {
                result.data.productInfo = productInfo;
                return that.getUserInfo(urlParams)
            })
            .then(function (userInfo) {
                result.data.userInfo = userInfo.data;
                result.data.auxProperties.isLogin = true;
                return that.getOrderList(urlParams)
            })
            .then(function (orderList) {
                result.data.allOrder = orderList.data;
                try {
                    for (var i = 0; i < orderList.data.length; i++) {
                        var orders = orderList.data[i].insuredNewList;
                        for (var x = 0; x < orders.length; x++) {
                            if (orders[x].relationToAppnt == "00" && orders[x].orderStatus != 0) {
                                result.data.ownOrder = orders[x];
                            }
                        }
                    }
                } catch (e) {
                    avalon.log(e)
                }
                return that.getOrder(urlParams, urlParams.id);
            })
            .then(function (order) {

                result.data.order = JSON.parse(JSON.stringify(order.data))
                //order 到 form 表单转换

                var order_to_form_widget = urlParams.order_type == "701"?$.extend({}, require('./order_to_form_widget701')):$.extend({}, require('./order_to_form_widget'));
                order_to_form_widget.urlParams = urlParams;
                order_to_form_widget.startDate = result.data.productInfo.startDate;
                order_to_form_widget.effectiveDate = result.data.productInfo.startDate;
                order_to_form_widget.ownOrder = result.data.ownOrder;
                order_to_form_widget.order = result.data.order;
                order_to_form_widget.userInfo = result.data.userInfo;
                order_to_form_widget.allOrder = result.data.allOrder;
                if (order_to_form_widget.hasCache() && !noCache) {
                    order_to_form_widget.cacheToOrder();//如果有缓存，从缓存读取订单数据数据
                    // order_to_form_widget.preCache = JSON.parse(JSON.stringify(order_to_form_widget))
                    // avalon.log("order_to_form_widget.preCache:",order_to_form_widget.preCache)
                }
                order_to_form_widget.orderToFormTransform();

                order_to_form_widget.initFix();
                result.data.order_to_form_widget = order_to_form_widget;
                deferred.resolve(result);
            })
            .otherwise(function (err) {
                deferred.reject(err)
            });

        return deferred.promise;
    },
};
service = $.extend({}, centralService, service);
module.exports = service;
