/**
 * Created by gthowe on 17/5/10.
 */
//region 工具
var commonService = require("../../../service/CentralService");
var interfaces = require('../../../config/interfaces.js');
var config = require('../../../config/config');
var urlParams = require('../../../lib/util/url_params');
var validate = require('../../../lib/util/3-validate');
var inputFilter = require('../../../lib/inputFilter');
var cookie = require('../../../lib/util/cookie');


var logo = require('./logo.png');
var clean = require('./ipmi_img_58.png');
//endregion 工具
// region i18n
var type = navigator.appName;
var lang;
if (type == 'Netscape') {
    lang = navigator.language;
}
else {
    lang = navigator.userLanguage;
}
lang = lang.substr(0, 2);
var vm = avalon.define({
    $id: "vm",
    //region 图片
    logo: logo,
    clean: clean,
    urlParams: '',
    //endregion
    //region 辅助数据
    companyName: '',
    order_type: config.order_type,
    next: '',
    code_time: false,
    code_times: 60,
    showClean: false,
    isCheck: {
        isCheck: false
    },
    loginUrl: config.serverUrl + '/' + config.env + '/opr/' + config.source + '/userLogin',
    codeUrl: config.loginCodeUrl,
    phoneNumberShow: false,
    codeNumberShow: false,
    phoneCodeNumberShow: false,
    language: 1,
    text: "",
    //endregion 辅助数据
    //region 组件数据
    mobileFormatted: '',
    organizations: [
        "shenlaohr", "qymgc", "shpudong", "gdhl", "ecitic"
    ],
    sendCodePopUp: false,
    mobileInputShow: false,
    allowNext: true,
    type: config.type, //产品类型
    organization_id: "",
    remark: '',
    //endregion 组件数据
    myOrder: {     //团体
        "id": '',//空订单无id
        "relationship": '',
        "employee_number": '',
        "insurer_name": '',
        "gender": '',
        "organization_name": '',
        "birthday": '',
        "ic_type": '',
        "ic_number": '',
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
    //region 主数据
    userInfo: {
        mobile_phone: '',
        verification_code: '',
        authImage_Code: '',
        type: '701',
        organization_id: this.organization_id
    },
    //endregion 主数据

    //region 主流程
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
    pushHistory: function () {
        var baseUrl = 'pension-2.html';
        var urlParams = vm.urlParams.$model;
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.history.replaceState('', "", url);
    },
    changeCode: function () {
        this.codeUrl = config.loginCodeUrl + '?token=' + parseInt(Math.random() * 100000);
        console.log("changeCode:", this.codeUrl);
    },
    takeOut: function (hasOrder) {//传一个参数进去
        var that = this;
        var myOrder;
        if (!hasOrder) {//无订单
            if (that.next) { //next是否有值
                if (that.order_type == '701') {
                    if (that.next == "pension-2.html") {
                        that.getCookies()//先拿到cookies,把getcookies带给下个createrOrder
                            .then(function (order) {
                                myOrder = order
                                return that.createOrder(order)//创建订单
                            })
                            .then(function (nexOrder) {
                                myOrder.id = nexOrder.id
                                return that.saveOrder(myOrder)//保存订单
                            })
                            .then(function () {
                                return vm.deleteCookies()
                            })
                            .then(function () {
                                return that.goToCreateMyOrder(myOrder.id)
                            })
                            .catch(function (msg) {//这个是将所有的验证验证一次，弹出当前的弹窗
                                console.log(msg);
                                alertModal.open(msg);
                            });
                    } else {
                        var baseUrl = vm.next;
                        var urlParams = vm.urlParams.$model;
                        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
                        window.location.href = url;
                    }

                } else {
                    var baseUrl = 'index.html';
                    var urlParams = vm.urlParams.$model;
                    var url = commonService.combineUrlWithParams(baseUrl, urlParams);
                    window.location.href = url;
                }
            } else {
                that.goTodIndex();
            }
        } else {//有订单
            alertModal.open('您已经有订单记录，立即为您转入订单页面继续操作', function () {
                that.goToMyOrder();
            });
        }
    },
    checkHasOrder: function () {
        var deferred = $.Deferred();
        var that = this;
        that.getOrderList()
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
    checkHasDraft: function (callback) {
        var result = false;
        var list = this.orderList;
        console.log(list);
        var draftId;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.order_status == 0) {
                result = true;
                draftId = item.id;
            }
        }
        callback(result, draftId);
    },
    getOrderList: function () {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {type: this.type};
        interfaces.post("getOrderList", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    that.orderList = data.data;
                    deferred.resolve(that.orderList)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    goToCreateMyOrder: function (id) {
        var that = this;
        if (!that.myBrowserType()) {
            that.pushHistory();
        }
        var baseUrl = 'pension-3.html';
        var urlParams = vm.urlParams.$model;
        urlParams.id = id;
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.location.href = url;
    },
    goTodIndex: function () {
        var that = this;
        if (!that.myBrowserType()) {
            that.pushHistory();
        }
        var baseUrl = 'pension-detail.html';
        var urlParams = vm.urlParams.$model;
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.location.href = url;
    },
    getUserInfo: function () {
        var deferred = $.Deferred();
        var that = this;
        // var dataToPost = {type: config.type};
        var dataToPost = {
            order_type: that.order_type
        }
        interfaces.post("getUserInfo", dataToPost)
            .then(function (data) {
                deferred.resolve(data)
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    widthAdapt: function () {

        if (document.body.clientWidth < 750) {
            document.getElementById("start").style.width = "100%";
            document.getElementById("start").style.margin = "0";
        } else {
            document.getElementById("start").style.width = "100%";
            document.getElementById("start").style.margin = "140px auto 100px";
        }

        $(window).resize(function () {
            if (document.body.clientWidth < 750) {
                document.getElementById("start").style.width = "100%";
                document.getElementById("start").style.margin = "0";
            } else {
                document.getElementById("start").style.width = "100%";
                document.getElementById("start").style.margin = "140px auto 100px";
            }

        });
        var mobile_phone = localStorage.getItem('mobile_phone');

        if (mobile_phone) {
            vm.userInfo.mobile_phone = mobile_phone;
        } else {
            vm.userInfo.mobile_phone
        }
    },
    switchInput: function () {
        var that = this;
        that.mobileInputShow = false;
        $("#" + 'mobileInput').focus()
    },
    checkBrowser: function myBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE9 = fIEVersion == 9.0;
            if (IE55) {
                return "IE55";
            }
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }
            if (IE9) {
                return "IE9";
            }
        }
    },
    goToMyOrder: function () {
        var that = this;
        if (!that.myBrowserType()) {
            that.pushHistory();
        }
        var baseUrl = 'myOrder.html';
        var urlParams = vm.urlParams.$model;
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.location.href = url;
    },
    login: function () {
        var deferred = $.Deferred();
        var dataToPost = this.userInfo.$model;
        dataToPost.organization_id = this.organization_id
        dataToPost.type = this.order_type
        interfaces.post("userLogin", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve()
                }
                else if (data.statusCode == -1) {

                    var nameId = that.form

                    deferred.reject()
                }

                else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    getProductInfo: function () {//获取很多信息
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            organization_id: that.organization_id,
            order_type: that.order_type,
            source: config.source,
        }
        interfaces.post("getProductInfo", dataToPost)
            .then(function (data) {
                console.log("data::", data)
                if (data.statusCode == 1) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data.msg);
                }
            })
        return deferred
    },
    removeLocalStorageBeforeLogin: function () {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = this.userInfo.$model;
        var mobile_phone_number = JSON.parse(localStorage.getItem('mobile_phone_number'));
        if (mobile_phone_number != dataToPost.mobile_phone) {
            localStorage.removeItem("myOrder");
            localStorage.removeItem("userInfo");
        }
        deferred.resolve();
        return deferred;
    },
    setLocalStorageAfterLogin: function () {
        var deferred = $.Deferred();
        var that = this;
        localStorage.setItem('mobile_phone', that.userInfo.mobile_phone);
        deferred.resolve();//遵从deferred
        return deferred;
    },
    initPage: function () {//初始化页面
        var deferred = $.Deferred();
        var that = this;
        that.bindListeners();
        that.widthAdapt();
        deferred.resolve()
        return deferred;
    },
    getCookies: function () {//拿到Cookies
        var that = this;
        var deferred = $.Deferred();
        var order = {
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
        };
        for (var x in order) {
            order[x] = localStorage.getItem(that.order_type + '-' + 'pension-2-' + x);
        }
        console.log("getCookies()", order);
        deferred.resolve(order);
        return deferred;
    },

    deleteCookies: function () {
        var deferred = $.Deferred();
        var that = this;
        localStorage.removeItem(that.order_type + '-' + 'pension-2-birthday');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-gender');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-pay_year');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-insured_amount');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-relationship');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-insurer_name');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-insurance_period');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-pay_interval');
        localStorage.removeItem(that.order_type + '-' + 'pension-2-defaultInsureAmoutTwo');//将缓存设进去
        localStorage.removeItem(that.order_type + '-' + 'pension-2-radio');//将缓存设进去
        localStorage.removeItem(that.order_type + '-' + 'pension-2-remark');//将缓存设进去
        deferred.resolve();
        return deferred;

    },
    //创建订单
    createOrder: function (myOrder) {
        var that = this;
        var deferred = $.Deferred();
        var dataToPost = {
            type: that.order_type,
            relationship: myOrder.relationship,
            organization_id: that.organization_id,
            remark: myOrder.remark,//这个要拿到的是我的订单里面的remark
        };
        console.log("createOrder()");
        console.log(dataToPost);
        interfaces.post("createOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {

                    console.log("createOrder::", data.data);
                    window.loading.open();
                    setTimeout(function () {

                        deferred.resolve(data.data)
                    }, 3000)

                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统请求超时')
            });
        return deferred
    },
    //保存订单
    saveOrder: function (myOrder) {//保存订单
        var that = this;
        var deferred = $.Deferred();
        var dataToPost = myOrder;//
        myOrder.employee_number = that.userInfo.mobile_phone//
        myOrder.step = 'Trial'
        console.log("saveOrder()");
        console.log(dataToPost);
        interfaces.post("saveOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve();
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    //endregion 主流程

    //region 验证
    validateBeforLogin: function () {
        var deferred = $.Deferred();//硬性规定写法
        var that = this;

        var dataToPost = this.userInfo.$model;
        if (!validate.validateMobile(dataToPost.mobile_phone)) {
            that.phoneNumberShow = true;
        }
        else if (!dataToPost.authImage_Code) {
            that.codeNumberShow = true;
        }
        else if (!dataToPost.verification_code) {
            that.phoneCodeNumberShow = true;
        }
        else {
            deferred.resolve();
        }
        return deferred;//硬性规定写法
    },
    validateBeforCode: function () {//点击验证验证码
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = this.userInfo.$model;
        if (!validate.validateMobile(dataToPost.mobile_phone)) {
            that.phoneNumberShow = true;
            deferred.reject('抱歉，您不符合本次参保条件，请确认您的手机号码是否正确')
        }
        else if (!dataToPost.authImage_Code) {
            that.codeNumberShow = true;
            deferred.reject('请填写正确的图形验证码')
        }
        else {
            deferred.resolve();
        }
        return deferred;//硬性规定写法
    },
    verificationCode: function () {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = this.userInfo.$model;
        interfaces.post("verificationCode", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    that.sendCodePopUp = true; //弹出弹窗
                    setTimeout(function () {
                        that.sendCodePopUp = false;//3秒后自动消失
                    }, 3000);
                    that.code_times = 60;
                    that.code_timechange();
                    that.code_time = !that.code_time;
                    that.codeNumberShow = false;
                    deferred.resolve()
                } else {
                    deferred.reject(data.msg);
                    that.codeNumberShow = true;

                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    //endregion 验证

    //region 数据监听
    bindListeners: function () {
        var that = this;
        $("#" + 'mobileInput').blur("input", function () {
            if (this.value.length == 11 && validate.validateMobile(this.value)) {
                that.mobileInputShow = true;
                that.phoneNumberShow = false;//提示号码不正确
                that.mobileFormatted = this.value.slice(0, 3) + "-" + this.value.slice(3, 7) + "-" + this.value.slice(7, 11);
            } else {
                that.phoneNumberShow = true;
                that.mobileInputShow = false;
            }
            if (this.value.length > 0) {
                that.showClean = true;
            } else {
                that.showClean = false;
            }
        });
        $("#" + 'imgCode').blur("input", function () {
            this.value = inputFilter.keepOnlyNumber(this.value)
            if (this.value.length == 4) {
                that.codeNumberShow = false;
            } else {
                that.codeNumberShow = true;
            }
        });
        $("#" + 'phoneCode').blur("input", function () {
            this.value = inputFilter.keepOnlyNumber(this.value)
            if (this.value.length == 4) {
                that.phoneCodeNumberShow = false;
            } else {
                that.phoneCodeNumberShow = true;
            }
        });

        that.$watch('@language', function observe(newV, oldV) {

        });
    },
    //endregion 数据监听

    //region 点击事件
    code_timechange: function () {
        var that = this;
        var a = setInterval(function () {
            if (that.code_times > 0) {
                that.code_times = that.code_times - 1;
            }
            if (that.code_times == 0) {
                that.code_time = !that.code_time;
                that.code_times = 60;
                clearInterval(a)
            }
        }, 1000)

    },
    clickVerificationCode: function () {
        var deferred = $.Deferred();
        var that = this;
        that.validateBeforCode()
            .then(function () {
                return that.verificationCode();
            });
        deferred.resolve();
        return deferred;
    },
    clickcleanThenNum: function () {
        var that = this;
        that.mobileFormatted = '';
        that.mobileInputShow = false;
        that.showClean = false;
        that.userInfo.mobile_phone = '';
        $('#mobileInput').val('');
    },
    clickNext: function () {
        var that = vm;
        that.validateBeforLogin()//验证登陆之前
            .then(function () {
                return that.removeLocalStorageBeforeLogin()//去掉本地存储在登陆之前
            })
            .then(function (dataToPost) {
                return that.login(dataToPost);
            })
            .then(function () {
                return that.checkHasOrder(that.order_type)//检查 已有 订单的
            })
            .then(function (hasOrder) {//这个是将方法里面的参数要带入
                return that.takeOut(hasOrder);//这个方法里面套着很多验证的方法
            })
            .catch(function (msg) {//这个是将所有的验证验证一次，弹出当前的弹窗
                console.log(msg);
                alertModal.open(msg);
            });
    }
    //endregion 点击事件
});

//run 执行代码
vm.urlParams = commonService.extractUrlParams(window.location.href);
vm.next = urlParams.getQueryString('next');
if (urlParams.getQueryString('organization_id')) {
    vm.organization_id = urlParams.getQueryString('organization_id');
}
if (urlParams.getQueryString('order_type')) {
    vm.order_type = urlParams.getQueryString('order_type');
}
vm.getProductInfo()
    .then(function () {
        return vm.getUserInfo()
    })
    .then(function (data) {
        if (data.statusCode == 1) { //如果已经登录，则要跳转到我的订单页
            return vm.goToMyOrder();
        } else { //如果未登录，初始化页面
            return vm.initPage()
        }
    })
    .catch(function (msg) {
        console.log(msg);
        alertModal.open(msg);
    });
vm.getCookies()//先拿到缓存


