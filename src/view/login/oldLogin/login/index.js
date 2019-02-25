var commonService = require("../../../service/CentralService");
require('../../CentralReference');
var centralController = require('../../../controller/CentralController');
var service = require('./service');

require('./index.css');
require('./form_common_input_code/index');
require('./form_common_input_code_time/index');
require('./modal_tips_2_line/index');

var logo = require('./logo.png');
var clean = require('./ipmi_img_58.png');


var vm = $.extend({}, centralController, {
    service: service,
    logo: logo,
    clean: clean,
    auxProperties: [],
    allowNext: true,
    isIe: false,
    login_data_to_form_widget: '',//登录的表单组件

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
    pushHistory: function () {
        var baseUrl = vm.urlParams.source + '-2.html';
        var urlParams = vm.urlParams.$model;
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.history.replaceState('', "", url);
    },
    changeCode: function () {
        this.codeUrl = config.loginCodeUrl + '?token=' + parseInt(Math.random() * 100000);
        console.log("changeCode:", this.codeUrl);
    },
    widthAdapt: function () {
        if (document.body.clientWidth < 750) {
            document.getElementById("start").style.width = "100%";
            document.getElementById("start").style.margin = "0";
        } else {
            document.getElementById("start").style.width = "100%";
            document.getElementById("start").style.margin = "140px auto 0px";
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
        }
    },
    setLocalStorageAfterLogin: function () {
        var deferred = $.Deferred();
        var that = this;
        localStorage.setItem('mobile_phone', that.userInfo.mobile_phone);
        deferred.resolve();//遵从deferred
        return deferred;
    },
    removeLocalStorageBeforeLogin: function () {
        var deferred = $.Deferred();
        var dataToPost = this.userInfo.$model;
        var mobile_phone_number = JSON.parse(localStorage.getItem('mobile_phone_number'));
        if (mobile_phone_number != dataToPost.mobile_phone) {
            localStorage.removeItem("myOrder");
            localStorage.removeItem("userInfo");
        }
        deferred.resolve();
        return deferred;
    },
    switchInput: function () {
        var that = this;
        that.auxProperties.mobileInputShow = false;
        $("#" + 'mobileInput').focus()
    },

    //region 验证
    validateBeforCodeService: function () {//点击验证验证码
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = this.userInfo.$model;
        if (!that.service.validate.validateMobile(dataToPost.mobile_phone)) {
            that.auxProperties.phoneNumberShow = true;
            deferred.reject('抱歉clickNext，您不符合本次参保条件，请确认您的手机号码是否正确')
        }
        else if (!dataToPost.authImage_Code) {
            that.auxProperties.codeNumberShow = true;
            deferred.reject('请填写正确的图形验证码')
        }
        else {
            deferred.resolve();
        }
        return deferred;
    },
    verificationCode: function () {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = this.userInfo.$model;
        service.interfaces.post("verificationCode", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {

                    that.auxProperties.sendCodePopUp = true; //弹出弹窗
                    setTimeout(function () {
                        that.auxProperties.sendCodePopUp = false;//3秒后自动消失
                    }, 3000);
                    that.auxProperties.code_times = 60;
                    that.auxProperties.code_time = !that.auxProperties.code_time;
                    that.code_timechange();
                    that.auxProperties.codeNumberShow = false;
                    deferred.resolve()
                } else {
                    deferred.reject(data.msg);
                    that.auxProperties.codeNumberShow = true;

                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    //endregion 验证

    //region 点击事件
    code_timechange: function () {
        var that = this;
        that.auxProperties.code_time = !that.auxProperties.code_time;
        var a = setInterval(function () {
            if (that.auxProperties.code_times > 0) {
                that.auxProperties.code_times = that.auxProperties.code_times - 1;
            }
            if (that.auxProperties.code_times == 0) {
                that.auxProperties.code_time = !that.auxProperties.code_time;
                that.auxProperties.code_times = 60;
                clearInterval(a)
            }
        }, 1000)
    },
    clickVerificationCode: function () {
        var deferred = $.Deferred();
        var that = this;

        var form = that.login_data_to_form_widget.formToOrderTransform();
        that.service.sendVerificationCodeService(that.urlParams.$model, form)
            .then(function (data) {
                that.handleTips(data.msg);
                that.code_timechange();
            })
            .catch(function (err) {
                that.handleTips(err)
            });
        return deferred;
    },
    clickcleanThenNum: function (widget) { //清空input框的字符及提示
        var that = this;
        widget.value = "";
        var item = widget.$model;
        that.auxProperties[item.id] = false
    },
    clickNext: function () {
        var that = this;
        var errors = [];

        for (var key in that.login_data_to_form_widget.form) {
            var msg = that.login_data_to_form_widget.validate(that.login_data_to_form_widget.form[key].id)
            var id = msg + '-tips';
            $('#' + id).css('display', 'none');
            if (vm.urlParams.order_type == 801||vm.urlParams.order_type == 603||vm.urlParams.order_type == 605||vm.urlParams.order_type == 701) {
                if (msg && (msg == "verification_code" || msg == "mobile_phone" || msg == "employee_number" || msg == "employee_name"|| msg == "authImage_Code")) {
                    errors.push(msg);
                }
            }
        }
        if (errors.length > 0) {
            //显示错误提示
            for (var i = 0; i < errors.length; i++) {
                (function (i) {
                    var id = errors[i] + '-tips';
                    $('#' + id).css('display', 'block');
                    // 自动消失错误提示
                    // setTimeout(function () {
                    //     $('#' + id).css('display', 'none');
                    // }, 3000)
                })(i)
            }
            return
        }

        var form = that.login_data_to_form_widget.formToOrderTransform();
        that.service.clickNextService(that.urlParams.$model, form)
            .then(function (url) {
                window.location.href = url;
            })
            .catch(function (err) {
                if (err.statusCode == -2) { //特殊处理员工姓名及工号红字的显示
                    var employee_numberId = that.login_data_to_form_widget.form.employee_number.id;
                    employee_numberId = employee_numberId + '-tips';
                    $('#' + employee_numberId).css('display', 'block');
                    $('#' + employee_numberId).text("*抱歉，未找到您的信息");


                    var employee_nameId = that.login_data_to_form_widget.form.employee_name.id;
                    employee_nameId = employee_nameId + '-tips';
                    $('#' + employee_nameId).css('display', 'block');
                    $('#' + employee_nameId).text("*抱歉，未找到您的信息");

                    // 自动消失错误提示

                    // setTimeout(function () {
                    //     $('#' + employee_numberId).css('display', 'none');
                    //     $('#' + employee_numberId).text("*请确认您的员工工号");
                    //     $('#' + employee_nameId).css('display', 'none');
                    //     $('#' + employee_nameId).text("*请确认您的员工姓名");

                    // }, 3000)
                }
                // else if (err.statusCode == -1){
                //     var mobile_phoneId = that.login_data_to_form_widget.form.mobile_phone.id;
                //     mobile_phoneId = mobile_phoneId + '-tips';
                //     $('#' + mobile_phoneId).css('display', 'block');
                //
                //     var verification_codeId = that.login_data_to_form_widget.form.verification_code.id;
                //     verification_codeId = verification_codeId + '-tips';
                //     $('#' + verification_codeId).css('display', 'block');
                //     // 自动消失错误提示
                //     setTimeout(function () {
                //         $('#' + mobile_phoneId).css('display', 'none');
                //         $('#' + verification_codeId).css('display', 'none');
                //     }, 3000)
                // }
                else {
                    that.handleTips(err.msg)
                }
            });

    },
    //endregion 点击事件

    //region 数据监听
    bindListeners: function () {
        var that = this;

        $('.form').off('blur'); //解绑所有监听
        $('.form').off('change'); //解绑所有监听
        $('.form').blur(function () {
            var errors = "";
            var id = $(this).attr("id");
            var value = $(this).val();
            if (value) {
                that.auxProperties[id] = true;
            } else {
                that.auxProperties[id] = false;
            }
            errors = that.login_data_to_form_widget.fix(id);
            console.log(errors)
            // errors = that.login_data_to_form_widget.validate();
            // console.log("result:",errors);
            if (errors.length > 0) {
                //显示错误提示
                id = id + '-tips';
                $('#' + id).css('display', 'block');
                // 自动消失错误提示
                // setTimeout(function () {
                //     $('#' + id).css('display', 'none');
                // }, 3000)
            } else {
                id = id + '-tips';
                $('#' + id).css('display', 'none');
            }
        })
        $(".form").focus(function () {
            var id = $(this).attr("id");
            that.auxProperties[id] = true;
            console.log(that.auxProperties[id]);
        })
    },
    //endregion 数据监听

    initPage: function () {//初始化页面
        var deferred = $.Deferred();
        var that = this;
        that.bindListeners();
        that.widthAdapt();
        that.service.getCookies(that.auxProperties.createData, that.auxProperties.order_type);//先拿到缓存

        that.isIe = that.myBrowserType();

        deferred.resolve();
        return deferred;
    },
    goToMyOrder: function () {
        var that = this;
        if (!that.myBrowserType()) {
            that.pushHistory();
        }
        var baseUrl = 'myOrder.html';
        var urlParams = vm.urlParams.$model;
        console.log("urlParams:", urlParams)
        var url = commonService.combineUrlWithParams(baseUrl, urlParams);
        window.location.href = url;
    },

    init: function () {
        var that = this;
        var url = window.location.href;
        $('#start').show()
        that.service.initWithoutLoginService(url)
            .then(function (data) {
                console.log("init 获取的数据", data);
                for (var x in data.data) {
                    that[x] = data.data[x];
                }

                if (that.auxProperties.isLogin) { //如果已经登录，则要跳转到我的订单页
                    return that.goToMyOrder();
                } else { //如果未登录，初始化页面
                    return that.initPage()
                }

            })
            .catch(function (errs) {
                that.handleTips(errs);
            });
    },
});
vm = avalon.define(vm);
vm.init();
