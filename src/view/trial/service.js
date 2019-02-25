var centralService = require('../../service/CentralService');

var products = require('../../repository/dic/products');
var service = {
    getDefaultDataService: function (urlParams) { //获取默认值设置的服务
        var that = this;
        var deferred = $.Deferred();
        var data = {
            statusCode: 1,
            msg: "",
            data: {
                candidateArrays: that.getDefaultCandidateArrayService(urlParams),
                auxProperties: { //覆盖父类的 auxProperties 属性
                    formHtml: require('./form_html/' + urlParams.order_type + '.html'),
                    totalAmount: 0,
                    params: urlParams,
                    current_premium: 0,
                    needToPremiumTrial: false,
                    companyName: that.config.companyName,
                    riskCode: "QMLD018",
                    defaultInsureAmoutTwo: '', //设定附加险的默认值是0
                    insuranceName: products.getName(urlParams.order_type),
                    products: products.products,
                    product: [],
                    organization_id: '',
                    insurance_period: that.config.lifeTimeInsurancePeriod,
                    bannerTitle: '',
                    resFooterTime: 3000,
                    organizationName: '',
                    step: 'Trial',
                    radio: '0',
                    effectiveDate: '', //生效日
                    tipsType: 0, //提示控制默认为0
                    uploadType: '', // 上传状态提示控制
                    amountTips: '', //提示控制默认为0
                    isFamily: 0,
                    isCreateOrder: '',
                    orderId: '',
                    order_type: that.config.order_type, //产品类型
                    increaseDate: false,
                    insuredAmountForInput: '', //用于除以10000后的input组件使用
                    defaultBirthday: '1980-01-01',
                    originRelationship: '01',
                    currentPremiumUrl: 'xyb-cashValue.html?organization_id=xyb&source=xyb&order_type=701',
                    isLogin: false,
                    login: false,
                    defaultPeriod: 30,
                    currentPremiumUrl_click: false,
                    viewCashValueLink: "",
                    isCumulative: false, //是否累计提示
                    current_premium_size: '年', //显示价格交费方式格式
                    getMyOrder: '',
                    data: '',
                    remark: '',
                    insuredAmountForInputPlus: '',
                    uploadTypeinsuredAmount: '',
                    uploadTypedefaultInsureAmoutTwo: '',
                    isCumulativeinsuredAmount: false,
                    isCumulativedefaultInsureAmoutTwo: false,
                    amountTipsinsuredAmount: '',
                    amountTipsdefaultInsureAmoutTwo: '',
                    //endregion 辅助性数据

                    //region 组件数据
                    isCheck: {
                        isCheck: false
                    },
                    pay_intervals: [], //定义paymentMethod即是交费方式
                    relationships: [],
                    pay_years: [], //修改缴费期间
                    InsurancePeriodYears: [], //保险期间
                    aLumpSum: [{key: "0", value: '一次性交清', view: '一次性交清'}], //一次性交清
                    age: 0,
                    min: "1960-01-05",
                    max: "2021-01-05",

                    dateAllowedMax: "",
                    dateAllowedMin: "",
                },
                urlParams: urlParams,
                productInfo: {},
                userInfo: {},
                order: {
                    organizationId: urlParams.organization_id,
                    relationship: '',
                    type: urlParams.order_type
                },
                appntInfo: that.getDefaultappntInfoService(urlParams),
                insuredInfos: that.getDefaultInsuredInfosService(urlParams),
                schemaInfo: that.getDefaultschemaInfoService(urlParams),
                LCInsureImparts: that.getDefaultLCInsureImpartsService(urlParams),
                form: that.getDefaultschemaInfoService(urlParams),//form 表单跟方案信息结构一样
                premiul_body_check_widget: "",//体检提示语组件
                itemWidget: '',//条款组件
                order_to_premiul_trial_form_widget: "",
            },
        };
        deferred.resolve(data);
        return deferred;
    },
    getDefaultFormService: function (urlParams) {
        var result = [{ //保险方案信息
            insuredseqNo: '1',
            organizationId: urlParams.organization_id, //组织id
            type: urlParams.order_type,//类型
            insuredSeq: '1',
            relationship: '00',//与投保人的关系
            birthday: '1980-01-01', //被保人生日
            sex: '0', //被保人性别
            insuYear: '1', //保险期间
            payEndYear: '0',//交费期间
            payIntv: '12',//交费方式
            payEndYearFlag: 'Y',//缴费标识
            riskCode: 'PNSD002',
            insuYearFlag: 'Y',
            amnt: 100000,//保额
            prem: '',
            mult: '1',
        }];
        if (urlParams.order_type == '701') {
            result.relationship = '-1';
        }
        return result
    },
    generateLoginUrlService: function (urlParams, auxProperties, order) {
        var deferred = $.Deferred();
        var that = this;

        var params = urlParams;
        params.next = params.source + '-' + '3.html';
        params.createOrder = 1; //标识需要创建订单

        var url = service.combineUrlWithParams("login.html", params);

        deferred.resolve(url);
        return deferred;
    },
    getTotalInsuredAmount: function (urlParams, result) { //累计保费
        var deferred = $.Deferred();
        var that = this;

        var form = result.data.order_to_premiul_trial_form_widget.form[0];

        var schemaInfo = {
            relationship: form.relationship.value,
            pay_year_flag: form.payEndYearFlag,
            pay_interval: form.payIntv.value,
            pay_year: form.payEndYear.value,
            gender: form.sex.value,
            birthday: form.birthday.value,
            insuredAmount: form.amnt.getValue(),
        };

        try {
            console.log('result.data.schemaInfo +++++++++++==', result.data.schemaInfo)
            that.getInsuredAmount(urlParams, schemaInfo, result.data.userInfo.data.employeeNumber)
                .then(function (data) {
                    result.data.auxProperties.totalAmount = data.mainAmount;
                    deferred.resolve(data);
                })
                .catch(function (err) {
                    deferred.resolve(0);
                });
        } catch (e) {
            deferred.resolve(0);
            console.log(e)
        }

        return deferred;
    },
    setCurrentPremiumUrl: function (myOrder, auxProperties, defaultInsureAmoutTwo) {
        console.log("setCurrentPremiumUrl:", myOrder);
        var deferred = $.Deferred();
        // var currentPremiumUrl = 'xyb-cashValue.html' +
        //     '?gender=' + myOrder.gender +
        //     '&birthday=' + myOrder.birthday +
        //     '&pay_year=' + myOrder.pay_year +
        //     '&insured_amount=' + myOrder.insured_amount +
        //     '&insured_amount_two=' + defaultInsureAmoutTwo * 10000 +
        //     '&order_type=' + auxProperties.order_type +
        //     '&getPeriod=' + myOrder.insurance_period +
        //     '&current_premium=' + myOrder.current_premium +
        //     '&relationship=' + myOrder.relationship +
        //     '&organization_id=' + auxProperties.organization_id;
        var currentPremiumUrl = 'xyb-cashValue.html' + '?gender=0' +
            '&birthday=1980-01-01' +
            '&pay_year=5' +
            '&insured_amount=100000' +
            '&insured_amount_two=100000' +
            '&order_type=701' +
            '&getPeriod=' +
            '&current_premium=' +
            '&relationship=' +
            '&organization_id=';
    },
    copyOrderIfExistCache: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;

        var cacheName = that.getCacheNamePrefix(urlParams) + "form";
        var formCache = localStorage.getItem(cacheName)

        var form = result.data.form;
        if (formCache) {
            form = JSON.parse(formCache);
        }

        deferred.resolve(result);
        return deferred;
    },
    copyOrderIfExistDraft: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;

        that.getOrderList(urlParams)
            .then(function (data) {
                var orders = data.data;
                var hasDraft = false;
                var draftIndex = false;

                for (var i = 0; i < orders.length; i++) {
                    var order = orders[i];
                    if (order.orderStatus == '0') {
                        hasDraft = true;
                        draftIndex = i;
                        result.data.auxProperties.orderId = order.id
                    }
                }
                if (hasDraft) {
                    if (orders[draftIndex].appntNew) {
                        result.data.appntInfo = orders[draftIndex].appntNew;
                    }
                    if (orders[draftIndex].insuredNewList) {
                        result.data.insuredInfos = orders[draftIndex].insuredNewList;
                    }

                    result.data.schemaInfo = orders[draftIndex].riskNewList;

                    //向表单赋值
                    var insuredInfo = result.data.insuredInfos[0];

                    var insurerToFormAdapter = { // 赋值适配器  //左边：form  -- 右边：被保人信息
                        "sex": "insuredSex",
                        "birthday": "insuredBirthday",
                        "relationship": "relationToAppnt",
                    };

                    var form = result.data.form[0]
                    for (var x in insurerToFormAdapter) {
                        form[x] = insuredInfo[insurerToFormAdapter[x]];
                    }

                    console.log("经适配器赋值后的form:", form);

                }
                deferred.resolve(result);
            })
            .catch(function () {
                deferred.resolve(result);
            });

        return deferred;
    },
    copyOrderIfExistUrlId: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;

        var id = urlParams.id;
        if (id) { //url 存在订单id
            try {
                result.data.auxProperties.orderId = urlParams.id;
                that.getOrder(urlParams, id)
                    .then(function (data) {
                        if (data.statusCode == "1") {
                            var order = data.data;
                            if (order) { //如果订单存在
                                if (order.appntNew) {
                                    result.data.appntInfo = order.appntNew;
                                }
                                if (order.insuredNewList) {
                                    result.data.insuredInfos = order.insuredNewList;
                                }
                                result.data.schemaInfo = order.riskNewList;
                            }
                            deferred.resolve(result);
                        } else {
                            deferred.resolve(result);
                        }
                    })
                    .catch(function (res) {
                        deferred.resolve(result);
                    });
            } catch (e) {
                console.log('copyOrderIfExistUrlId', e)
            }
        }
        else {//url 不存在订单id
            deferred.resolve(result);
        }
        return deferred;
    },
    copyUserInfoToAppntInfo: function (userInfo, appntInfo) {
        var deferred = $.Deferred();
        var that = this;

        console.log("userInfo++++++++++++++++", userInfo)

        var adapter = {
            employeeName: 'appntName',
            employeeBirthday: 'appntBirthday',
            employeeSex: 'appntSex',
            employeeIdno: 'appntidNo',
            employeeIdtype: 'appntidType',
        };

        //将userInfo的值赋值进投保人
        for (var x in adapter) {
            if (userInfo[x]) {
                appntInfo[adapter[x]] = userInfo[x];
            }
        }

        deferred.resolve();
        return deferred;
    },
    setBanner: function (urlParams, products) {
        var deferred = $.Deferred();
        var product = {};
        for (var i = 0; i < products.length; i++) {
            var item = products[i];
            if (item.order_type == urlParams.order_type) {
                product = item
            }
        }
        deferred.resolve(product);
        return deferred
    },
    copyAppntInfoFromHistory: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;

        var newParams = JSON.parse(JSON.stringify(urlParams));
        delete newParams['order_type'];//需要获取所有的订单
        that.getOrderList(newParams)
            .then(function (data) {
                var orderList = data.data;
                for (var i = 0; i < orderList.length; i++) {
                    if (orderList[i].orderStatus != 0) {
                        result.data.appntInfo = orderList[i].appntNew
                    }
                }

                deferred.resolve(result)
            })
            .catch(function (msg) {
                deferred.reject(msg)
            });

        return deferred;
    },
    parsePremiumTrialFormService: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;
        var form = result.data.form[0];

        var config = require('../../widget/config').premiumTrialConfig;//读取投保人组件配置
        //将配置自动化复制进组件
        that.setUpWidgetService(form, config);

        deferred.resolve(result.data.form);
        return deferred;
    },
    getCorrectDataService: function (urlParams, result) {
        var deferred = $.Deferred();
        var that = this;

        var defaultData;

        that.getDefaultDataService(urlParams)
            .then(function (data) {

                defaultData = data.data;
                //表单内部数据fix
                var order_to_premiul_trial_form_widget = result.data.order_to_premiul_trial_form_widget;
                order_to_premiul_trial_form_widget.fix();

                //重新计算体检资料的提示；
                var premiul_body_check_widget = result.data.premiul_body_check_widget;
                var form = order_to_premiul_trial_form_widget.form[0];

                try {
                    that.getTotalInsuredAmount(urlParams, result)
                        .then(function (data) {
                            var totalAmount = data.mainAmount;
                            totalAmount = parseInt(totalAmount) + parseInt(form.amnt.getValue());
                            premiul_body_check_widget.setValue(
                                result.data.productInfo.startDate,
                                form.relationship.value,
                                form.sex.value,
                                form.birthday.value,
                                totalAmount, //总保费
                                data.mainAmount
                            )
                            premiul_body_check_widget.fix()
                            deferred.resolve(result);
                        })
                        .catch(function (err) {
                            premiul_body_check_widget.setValue(
                                result.data.productInfo.startDate,
                                form.relationship.value,
                                form.sex.value,
                                form.birthday.value,
                                form.amnt.getValue() //总保费
                            )
                            premiul_body_check_widget.fix()
                            deferred.resolve(result);
                        })
                } catch (e) {
                    console.log(e)
                }
            })
            .catch(function (errs) {
                deferred.reject(errs)
            });
        return deferred;
    },
    clickNextService: function (urlParams, auxProperties, order) {
        var deferred = $.Deferred();
        var that = this;

        var orderId = '';
        var defaultData = '';

        that.getDefaultDataService(urlParams)
            .then(function (data) {
                defaultData = data.data;
                return that.getUserInfo(urlParams)
            })
            .then(function (data) {
                var deferred = $.Deferred();
                if (data.statusCode == -401) { //未登录
                    deferred.reject(data)
                    return deferred;
                } else { //已登录
                    if (auxProperties.orderId) { //服务器 已经存在草稿单
                        deferred.resolve(auxProperties.orderId)
                        return deferred;
                    } else {//服务器 无草稿单
                        var relationship = order.insuredNewList[0].relationToAppnt;
                        return that.createOrder(urlParams, relationship);
                    }
                }
            })
            .then(function (id) {
                orderId = id;
                var schemaInfo = JSON.parse(JSON.stringify(order.riskNewList));

                schemaInfo[0].birthday = order.insuredNewList[0].insuredBirthday;
                schemaInfo[0].sex = order.insuredNewList[0].insuredSex;
                return that.saveSchemaInfo(urlParams, schemaInfo, auxProperties.current_premium, orderId);
            })
            // .then(function () {
            //     return that.saveAppntInfo(urlParams, order.appntNew, orderId);
            //
            // })
            // .then(function () {
            //     return that.saveInsuredInfo(urlParams, order.insuredNewList, orderId);
            // })
            .then(function () {
                var baseUrl = urlParams.source + '-' + '3.html';
                var params = urlParams;
                params.id = orderId;
                var url = service.combineUrlWithParams(baseUrl, params);
                deferred.resolve(url);
            })
            .catch(function (err) {
                deferred.reject(err)
            });
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

        //合并用户信息服务 优先级： 后台数据 > 缓存 > 默认值
        //合并订单信息服务 优先级： 后台数据 > 缓存 > 默认值
        //合并用户与订单数据 优先级：用户数据 > 订单数据
        that.getDefaultDataService(urlParams)
            .then(function (data) {
                for (var x in data.data) {
                    result.data[x] = data.data[x];
                }
                console.log('result', result);
                return that.getProductInfo(urlParams)
            })
            .then(function (productInfo) {
                result.data.productInfo = productInfo;
                // result.data.productInfo.candidateArrays.relationships = "-1,00,01,02,03,13";
                return that.getUserInfo(urlParams)
            })
            .then(function (userInfo) {
                if (userInfo.statusCode == 1) {
                    result.data.userInfo = userInfo;
                    result.data.auxProperties.isLogin = true;
                }
                return that.copyOrderIfExistCache(urlParams, result);
            })
            .then(function () {
                if (result.data.auxProperties.isLogin) { //已登录情况下才处理getOrderList
                    return that.copyAppntInfoFromHistory(urlParams, result);
                } else { //未登录直接跳过
                    var deferred = $.Deferred();
                    deferred.resolve(result);
                    return deferred;
                }
            })
            .then(function (data) {
                console.log("appntInfo ", result.data.appntInfo)
                console.log("copyOrderIfExistDraft start")
                return that.copyOrderIfExistDraft(urlParams, result)
            })
            .then(function (form) {

                console.log("appntInfo ", result.data.appntInfo)
                console.log("copyOrderIfExistUrlId start")
                return that.copyOrderIfExistUrlId(urlParams, result)
            })
            .then(function () {

                if (result.data.auxProperties.isLogin) { //已登录情况下才处理从用户信息copy信息到appnt
                    return that.copyUserInfoToAppntInfo(result.data.userInfo, result.data.appntInfo);
                } else { //未登录直接跳过
                    var deferred = $.Deferred();
                    deferred.resolve(result);
                    return deferred;
                }
            })

            .then(function (data) {

                //实例化体验资料上传要求的组件
                var premiul_body_check_widget = $.extend({}, require('./premiul_body_check_801'));
                result.data.premiul_body_check_widget = premiul_body_check_widget;

                //实例化条款组件
                var itemWidget = $.extend({}, require('./items_widget/index'));
                itemWidget.urlParams = urlParams;
                result.data.itemWidget = itemWidget;

                //实例化订单与试算表单格式转换组件

                var central_order_prem_widget;
                if (urlParams.order_type == "801") {
                    central_order_prem_widget = require('./order_to_premiul_trial_form_widget_801');
                }
                var order_to_premiul_trial_form_widget = $.extend({}, central_order_prem_widget);

                var order = {
                    appntNew: result.data.appntInfo,
                    insuredNewList: result.data.insuredInfos,
                    riskNewList: result.data.schemaInfo,
                };

                //配置组件
                if (result.data.auxProperties.isLogin) {
                    order_to_premiul_trial_form_widget.userInfo = result.data.userInfo;
                }
                order_to_premiul_trial_form_widget.order = order;
                order_to_premiul_trial_form_widget.urlParams = urlParams;
                order_to_premiul_trial_form_widget.form = that.getDefaultFormService(urlParams);

                order_to_premiul_trial_form_widget.startDate = result.data.productInfo.startDate;
                order_to_premiul_trial_form_widget.effectiveDate = result.data.productInfo.effectiveDate;
                if (order_to_premiul_trial_form_widget.hasCache()) {
                    order_to_premiul_trial_form_widget.cacheToOrder();//使用缓存
                }

                order_to_premiul_trial_form_widget.orderToFormTransform(); //数据转换
                order_to_premiul_trial_form_widget.initFix(result.data.auxProperties.isLogin)
                order_to_premiul_trial_form_widget.getInsuredAmount = that.getInsuredAmount;

                result.data.order_to_premiul_trial_form_widget = order_to_premiul_trial_form_widget;


                return that.getCorrectDataService(urlParams, result)
                // deferred.resolve(result);

            })
            .then(function (data) {
                deferred.resolve(result);
            })
            .catch(function (err) {
                console.log(err)
                deferred.resolve(result)
            });

        return deferred;
    },
};

service = $.extend({}, centralService, service);
module.exports = service;
