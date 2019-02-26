<template>
    <div id="info">
        <div>
            <div v-show="shuishou" class="all" style="display: none">
                <div class="all_center">
                    <table class="all_text">
                        <tr style="background: #e5f6fe">
                            <td style="width: 25%; border-bottom:none ; border-right:none ">户籍类型</td>
                            <td style="width: 45%; border-bottom:none ; border-right:none;text-align: center">条件</td>
                            <td style=" border-bottom:none;">个人税收居民身份</td>
                        </tr>
                        <tr>
                            <td style="border-bottom: none;border-right: none">中国公民</td>
                            <td style="border-bottom: none;border-right: none;text-align: left">在中国大陆定居（无论有无房产）</td>
                            <td style="border-bottom: none;">中国税收居民</td>
                        </tr>
                        <tr>
                            <td style="border-bottom: none;border-right: none">中国公民</td>
                            <td style="border-bottom: none;border-right: none;text-align: left">侨居海外、居住在香港、澳门、台湾</td>
                            <td style="border-bottom: none;">非中国税收居民</td>
                        </tr>
                        <tr>
                            <td style="border-right: none" rowspan="2">外国人、海外侨民、香港、澳门、台湾同胞</td>
                            <td style="border-bottom: none;border-right: none; text-align: left">
                                <div>需同时满足以下两点</div>
                                <div>1）在中国境内居住（无论有无房产）；</div>
                                <div>2）且在一个纳税年度内，一次离境不超过30天，或多次离境累计不超过90天</div>
                            </td>
                            <td style="border-bottom: none;">中国税收居民</td>
                        </tr>
                        <tr>
                            <td style="border-right: none;text-align: left">不能同时满足上述两点</td>
                            <td>非中国税收居民</td>
                        </tr>
                    </table>
                    <div class="sure" @click="detail">确认</div>
                </div>
            </div>
            <div style="margin-top: 50px">
                <!--<wbr is="ms-banner"/>-->
            </div>
        </div>
    </div>
</template>

<script>
    const service = require('./service')
    const filter = require('../../service/filter')
    export default {
        name: "info",
        data(){
            return{
                shuishou: false,
                service: service,
                // appntNewForm: '',
                // insuredNewListForm: '',
                order_to_form_widget: {
                    form:{
                        appntNewForm:{
                            nativePlace:{
                                value:""
                            },
                            rankCode:{
                                selectValue:""
                            },
                            appntidType:{
                                value:""
                            },
                            appntSex:{
                                value:""
                            },
                            occupationCode:{
                                value:""
                            }
                        }
                    }
                },
                urlParams: "",
            }
        },
        mounted(){
            var that = this;

            var url = window.location.href;
            that.testMobileOrPc()
            that.service.initwithLoginService(url)
                .then(function (data) {
                    avalon.log("init 获取的数据", data)
                    for (x in data.data) {
                        that[x] = data.data[x];
                    }
                    avalon.log('that.candidateArrays',that.candidateArrays)

                    avalon.log(that.allOrder);
                    setTimeout(function () {
                        that.bindListeners();
                        that.initView();
                        alertModal.setMobile(that.mobile);
                    }, 500);
                    $("#start").css('display','block');
                })
                .otherwise(function (errs) {
                    that.handleTips(errs);
                });
        },
        filter: filter,
        methods:{
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
            userInfo_ic_is_long_valid_change: function (value) {
                var that = this;
                var appntNewForm = that.order_to_form_widget.form.appntNewForm
                appntNewForm.idIsLongValid.value = value;
                if (appntNewForm.idIsLongValid.value == 0) {
                    setTimeout(function () {
                        $('#datetimepickerxxxx').datetimepicker('show');
                    }, 100)
                }
                that.refreshData()
            },
            userInfo_maritalStatusChange: function (value) {
                var that = this;
                var appntNewForm = that.order_to_form_widget.form.appntNewForm
                appntNewForm.marriage.value = value;
                that.refreshData()
            },
            myOrder_ic_is_long_valid_change: function (value) {
                var that = this;
                var insuredNewListForm = that.order_to_form_widget.form.insuredNewListForm;
                insuredNewListForm[0].idIsLongValid.value = value;
                if (insuredNewListForm[0].idIsLongValid.value == 0) {
                    setTimeout(function () {
                        $('#datetimepicker3').datetimepicker('show');
                    }, 100)
                }
                that.refreshData()
            },
            myOrder_maritalStatusChange: function (value) {
                var that = this;
                var insuredNewListForm = that.order_to_form_widget.form.insuredNewListForm;
                insuredNewListForm[0].marriage.value = value;
                that.refreshData()
            },
            refreshData: function (id) {
                var that = this;
                setTimeout(function () {
                    var errs = [];
                    if (id) {
                        // var isChangeOwn = that.order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value == "00" && id == "UserIc_number";
                        // if (id == "insuredIdno_0"|| isChangeOwn) {
                        //     errs = that.order_to_form_widget.validateDiffInfo()
                        // }
                    }
                    if (errs.length > 0) {
                        that.handleTips(errs);
                    } else {
                        that.order_to_form_widget.fix();
                        //缓存处理
                        that.order_to_form_widget.formToOrderTransform();
                        that.order_to_form_widget.orderToCache();
                    }

                    // that.order_to_form_widget.fix();
                    that.bindListeners();
                    // that.service.getCorrectDataService(that.urlParams.$model, result)
                    //     .then(function (result) {
                    //         for (x in result.data) {
                    //             that[x] = result.data[x];
                    //             alert(that.order_to_form_widget.position.inputVisible)
                    //         }
                    //         that.bindListeners();
                    //         // that.handleTips(result.errs)
                    //     })
                    //
                }, 50)
            },
            bindListeners: function () {
                var that = this;
                $('.watch').off('blur'); //解绑所有监听
                $('.watch').off('change'); //解绑所有监听
                $('.watch').change(function () { //重新绑定监听
                    //设置延时让双向绑定生效
                    var id = $(this).attr("id");
                    that.refreshData(id)
                });
            },
            clickNext: function () {
                var that = this;
                var errors = that.order_to_form_widget.validate();
                if (errors.length > 0) {
                    that.handleTips(errors[0])
                    return;
                }


                if(that.order_to_form_widget.form.appntNewForm.idIsLongValid.value == 1){
                    that.order_to_form_widget.form.appntNewForm.idExpDate.value = "2999-01-01";
                }

                for (var i = 0; i < that.order_to_form_widget.form.insuredNewListForm.length; i++) {
                    if (that.order_to_form_widget.form.insuredNewListForm[i].relationToAppnt != "00"){
                        if(that.order_to_form_widget.form.insuredNewListForm[i].idIsLongValid.value == 1){
                            that.order_to_form_widget.form.insuredNewListForm[i].idExpDate.value = "2999-01-01";
                        }
                    }
                }

                if (that.order_to_form_widget.form.appntNewForm.rankCode.selectValue) {
                    if (that.order_to_form_widget.form.appntNewForm.rankCode.selectValue != '7') {

                        for (var i = 0; i < that.candidateArrays.positions.length; i++) {
                            var item = that.candidateArrays.positions[i];
                            if (that.order_to_form_widget.form.appntNewForm.rankCode.selectValue == item.key) {
                                that.order_to_form_widget.form.appntNewForm.rankCode.inputValue = item.value
                            }
                        }
                    }
                }


                var appntForm = that.converWidgetToData(that.order_to_form_widget.form.appntNewForm.$model);
                var insuredNewListForms = that.order_to_form_widget.form.insuredNewListForm.toJSON();

                for (var i = 0; i < insuredNewListForms.length; i++) {
                    var form = insuredNewListForms[i];
                    form = that.converWidgetToData(form); //将组件转换成数据
                    avalon.log("insuredNewListForm-" + i + " 转换后的数据", form)
                }
                // //调用适配器将数据处理正确
                that.order_to_form_widget.order.appntNew = appntForm;
                that.order_to_form_widget.order.insuredNewList = insuredNewListForms;

                //将组件转换成数据
                var orderToPost = that.order_to_form_widget.formToOrderTransform()
                that.service.clickNextService(that.urlParams.$model, orderToPost.appntNew, orderToPost.insuredNewList, that.urlParams.id,that.candidateArrays.$model)
                    .then(function (url) {
                        avalon.log('跳转url', url);
                        window.location.href = url;
                    })
                    .otherwise(function (err) {
                        that.handleTips(err);
                    })
            },
            shuishouWhy: function () {
                vm.shuishou = true;
            },
            detail: function () {
                vm.shuishou = false;
            },
            showAlertTips:function(){
                alert("确定");
            }
        }
    }
</script>

<style lang="scss">
@import "./info";
</style>
