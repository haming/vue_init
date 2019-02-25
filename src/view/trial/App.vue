<template>
    <div id="app">

        <div class="col-xs-12 col-sm-7 conter-right">
            <div class="col-xs-12 col-sm-12 center-top center-top-border">
                <div class="titleImg1 ">
                    保险方案
                </div>
            </div>

            <div class="inputBorder">
                <!--为谁投保-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">为谁投保:</div>
                    <div class="col-xs-8 col-sm-9 cleanSelectIcon">
                        <select id="relationship" class="input-xlarge mobile_select form-control form"
                                v-model='order_to_premiul_trial_form_widget.form[0].relationship.value'>
                            <option :selected="order_to_premiul_trial_form_widget.form[0].relationship.value == item.key"
                                    v-for="(item,index) in order_to_premiul_trial_form_widget.form[0].relationship.candidateArray"
                                    :key="index">{{item.value}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-xs-12  div_line"></div>

                <!--出生日期-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left" for="datetimepicker">出生日期:</div>
                    <div class="col-xs-8 col-sm-9 cleanSelectIcon" style="background: none">
                        <input type="text" id="datetimepicker"

                               :startDate="order_to_premiul_trial_form_widget.form[0].birthday.start"
                               :endDate="order_to_premiul_trial_form_widget.form[0].birthday.end"

                               class="form-control background_white  withForIput datetimepicker form" placeholder=""
                               v-model="order_to_premiul_trial_form_widget.form[0].birthday.value"
                               readonly/>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--性别-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">性别:</div>
                    <div class="col-xs-8 col-sm-9  cleanSelectIcon">
                        <select class="input-xlarge mobile_select form-control form"
                                v-model="order_to_premiul_trial_form_widget.form[0].sex.value">
                            <option v-for='(item,index) in order_to_premiul_trial_form_widget.form[0].sex.candidateArray'>
                                {{item.value}}
                            </option>
                        </select>

                    </div>
                </div>

                <div class="col-xs-12  div_line"></div>
                <!--保险期间-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">保险期限:</div>
                    <div class="col-xs-8 col-sm-9 list-right1">
                        <span>终身</span>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--保费-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left" for="exampleInputPassword1">保费:</div>
                    <div class="col-xs-8 col-sm-9 cleanColPadding"
                         style="padding-left: 0;padding-right: 0;text-align: right">
                        <!--保险金额-->
                        <input type="tel" class="form-control background_white withToInput form_blur"
                               id="exampleInputPassword1"
                               placeholder="请输入" maxlength="3"
                               v-model="order_to_premiul_trial_form_widget.form[0].amnt.value">
                        <span style="margin-left: 8px">元</span>
                        <span class="homeLogin" @click="clickEliminate"></span>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--交费方式-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">交费方式:</div>
                    <div class="col-xs-8 col-sm-9  cleanSelectIcon">
                        <select class="input-xlarge mobile_select form-control form"
                                v-model="order_to_premiul_trial_form_widget.form[0].payIntv.value">
                            <option v-for='(item,index) in order_to_premiul_trial_form_widget.form[0].payIntv.candidateArray'>
                                {{item.value}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--交费期间 / 交费年限-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">交费年限:</div>
                    <div class="col-xs-8 col-sm-9  cleanSelectIcon">
                        <select class="input-xlarge mobile_select form-control form"
                                v-model="order_to_premiul_trial_form_widget.form[0].payEndYear.value">
                            <option v-for='(item,index) in order_to_premiul_trial_form_widget.form[0].payEndYear.candidateArray'
                            >
                                <span>{{item.name}}</span>
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--年金起领年龄-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">年金起领年龄:</div>
                    <div class="col-xs-8 col-sm-9  cleanSelectIcon">
                        <select class="input-xlarge mobile_select form-control form"
                                v-model="order_to_premiul_trial_form_widget.form[0].getYear.value">
                            <option v-for='(item,index) in order_to_premiul_trial_form_widget.form[0].getYear.candidateArray'
                            >
                                <span>{{item.name}}</span>
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>

                <!--年金领取方式-->
                <div class="col-xs-12 col-sm-12 center-right-list">
                    <div class="col-xs-4 col-sm-3 list-left">年金领取方式:</div>
                    <div class="col-xs-8 col-sm-9  cleanSelectIcon">
                        <select class="input-xlarge mobile_select form-control form"
                                v-model="order_to_premiul_trial_form_widget.form[0].getIntv.value">
                            <option v-for='(item,index) in order_to_premiul_trial_form_widget.form[0].getIntv.candidateArray'
                            >
                                <span>{{item.name}}</span>
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12  div_line"></div>


                <div style="clear: both"></div>


            </div>

        </div>

    </div>
</template>

<script>
    import HelloWorld from '../../components/HelloWorld'

    const {Observable, Subject, ReplaySubject, from, of, range} = require('rxjs');
    const {map, filter, switchMap} = require('rxjs/operators');

    var service = require('./service')
    // var service = ''


    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        data() {
            return {
                service: service,
                form: "",
                // premiul_body_check_widget: '',//体检提示语组件
                itemWidget: {},//条款组件
                order_to_premiul_trial_form_widget: {
                    form: [
                        {
                            relationship: {
                                value: '',
                                candidateArray: [],
                            },
                            birthday: {
                                start: '',
                                end: '',
                                value: ''
                            },
                            sex: {
                                candidateArray: [],
                                value: ''
                            },
                            amnt: {
                                value: '',
                            },
                            payIntv: {
                                value: '',
                                candidateArray: [],
                            },
                            payEndYear: {
                                value: '',
                                candidateArray: [],
                            },
                            getYear: {
                                value: '',
                                candidateArray: [],
                            },
                            getIntv: {
                                value: '',
                                candidateArray: [],
                            }
                        }]
                },//订单与试算表单格式转换组件
            }
        },
        methods: {
            clickEliminate: function () {

            }

        },
        mounted() {
            // range(1, 200)
            //     .pipe(filter(x => x % 2 === 1), map(x => x + x))
            //     .subscribe(x => console.log(x));


            var that = this;
            var url = window.location.href;
            $('#start').show()
            var urlParams = that.service.extractUrlParams(url);
            that.urlParams = urlParams;
            // that.testMobileOrPc();
            that.service.initWithoutLoginService(url)
                .then(function (data) {
                    console.log("init 获取的数据", data);
                    that.order_to_premiul_trial_form_widget = data.data.order_to_premiul_trial_form_widget;
                    // for (var x in data.data) {
                    //     that[x] = data.data[x];
                    // }
                    // that.service.setBanner(that.auxProperties.params.$model, that.auxProperties.products.$model)
                    //     .then(function (data) {
                    //         that.auxProperties.product = data
                    //         console.log('that.auxProperties.product', that.auxProperties.product)
                    //     })
                    // setTimeout(function () {
                    //     that.bindListeners();
                    //     that.initView();
                    //
                    //     var result = {
                    //         data: {
                    //             candidateArrays: that.candidateArrays.$model,
                    //             productInfo: that.productInfo.$model,
                    //             schemaInfo: that.schemaInfo.$model,
                    //             userInfo: that.userInfo.$model,
                    //             auxProperties: that.auxProperties.$model,
                    //             order_to_premiul_trial_form_widget: that.order_to_premiul_trial_form_widget,
                    //             premiul_body_check_widget: that.premiul_body_check_widget
                    //         }
                    //     };
                    //
                    //     that.premiumTrial(result);
                    //
                    //
                    //     alertModal.setMobile(that.mobile)
                    // }, 500)
                })
                .catch(function (errs) {
                    // that.handleTips(errs);
                });

        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
