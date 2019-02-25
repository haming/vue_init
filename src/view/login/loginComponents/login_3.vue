<!--// 3.	员工工号加员工姓名做为白名单，需填写的字段有：员工工号、员工姓名、手机号码、短信验证码。请先校验员工工号和员工姓名是否为白名单，再进行短信验证码的触发；-->
<template>
    <div class="input_main_contain">

        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input class="_form_common_input_phone1 form"
                           v-model="login_data_to_form_widget.form.employee_number.value"
                           :attr="{maxlength:11,type:'text',id:login_data_to_form_widget.form.employee_number.id}"/>
                    <div class="clean" v-if="login_data_to_form_widget.form.employee_number.value"
                         @click="clickcleanThenNum(login_data_to_form_widget.form.employee_number)">
                        <img :src="AllImg.clean" alt=""/>
                    </div>
                </div>
            </div>
            <div v-if="!login_data_to_form_widget.form.employee_number.value" class="tipforie9">
                请输入您的员工工号
            </div>
            <div class="tip" :attr="{id:login_data_to_form_widget.form.employee_number.id + '-tips'}">
                *请确认您的员工工号
            </div>
        </div>
        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input class="_form_common_input_phone1 form"
                           v-model="login_data_to_form_widget.form.employee_name.value "
                           :attr="{maxlength:11,type:'text',id:login_data_to_form_widget.form.employee_name.id}"/>
                    <div class="clean" v-if="login_data_to_form_widget.form.employee_name.value"
                         @click="clickcleanThenNum(login_data_to_form_widget.form.employee_name)">
                        <img :src="AllImg.clean" alt=""/>
                    </div>
                </div>
            </div>
            <div v-if="!login_data_to_form_widget.form.employee_name.value" class="tipforie9">
                请输入您的员工姓名
            </div>
            <div class="tip" :attr="{id:login_data_to_form_widget.form.employee_name.id + '-tips'}">
                *请确认您的员工姓名
            </div>
        </div>

        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input v-if="!auxProperties.mobileInputShow" class="_form_common_input_phone1 form"
                           v-model="login_data_to_form_widget.form.mobile_phone.value "
                           :attr="{maxlength:11,type:'tel',id:login_data_to_form_widget.form.mobile_phone.id}"/>
                    <div class="clean" v-if="login_data_to_form_widget.form.mobile_phone.value"
                         @click="clickcleanThenNum(login_data_to_form_widget.form.mobile_phone)">
                        <img :src="AllImg.clean" alt=""/>
                    </div>
                    <div v-if="auxProperties.mobileInputShow" class="_form_common_input_phone2"
                         @click="switchInput">
                        {{auxProperties.mobileFormatted}}
                    </div>
                </div>
            </div>
            <div v-if="!login_data_to_form_widget.form.mobile_phone.value" class="tipforie9">
                请输入您的手机号码
            </div>
            <div class="tip" :attr="{id:login_data_to_form_widget.form.mobile_phone.id + '-tips'}">
                *请确认您的手机号码是否正确
            </div>
        </div>
        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="sms_input">
                    <div class="input_border input_code">
                        <input v-model="login_data_to_form_widget.form.verification_code.value "
                               class="form_common_input_SMSCode form"
                               :attr="{maxlength:4,type:'tel',id:login_data_to_form_widget.form.verification_code.id}"/>
                    </div>
                    <div v-if="!login_data_to_form_widget.form.verification_code.value" class="tipforie9">
                        请输入验证码
                    </div>
                    <div v-if="auxProperties.code_time" class="sms_code"
                         id="code" style="background:#dfdfdf;color: #7e7e7e">
                        <div>{{auxProperties.code_times}}s</div>
                    </div>
                    <div v-if="!auxProperties.code_time" class="sms_code"
                         @click="clickVerificationCode">获取短信验证码
                    </div>
                </div>
            </div>
            <div class="tip"
                 :attr="{id:login_data_to_form_widget.form.verification_code.id + '-tips'}">
                *请填写正确的短信验证码
            </div>
        </div>
    </div>
</template>
<script>
    import '../../../common/common';

    var clean = require('./img/ipmi_img_58.png');
    export default {
        name: 'banner',
        props: {
            form:JSON
        },
        data() {
            return {
                AllImg: {
                    clean: clean,
                },
                login_data_to_form_widget: {
                    form: {
                        employee_number: {
                            id: 'employee_number',
                            value: '',
                        },
                        employee_name: {
                            id: 'employee_name',
                            value: ''
                        },
                        mobile_phone: {
                            id: 'mobile_phone',
                            value: ''
                        },
                        verification_code: {
                            id: 'verification_code',
                            value: ''
                        },
                    }
                },
                auxProperties: {
                    employee_number: '',
                    employee_name: '',
                    mobileInputShow: '',
                    mobileFormatted: '',
                    mobile_phone: '',
                    verification_code: '',
                    code_time: '',
                }
            }
        },
        methods: {
            clickcleanThenNum: function (name) {
                var that = this;
                console.log(name);
                console.log(that.login_data_to_form_widget);
                console.log(that.login_data_to_form_widget.form[name.id]);
                that.login_data_to_form_widget.form[name.id].value = '';
            },
            clickVerificationCode() {
            },
            switchInput() {
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>

