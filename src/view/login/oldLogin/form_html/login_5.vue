<!--// 5.	员工证件号后六位加员工姓名做为白名单，需填写的字段有：员工证件号后六位、员工姓名、手机号码、短信验证码。请先校验员工证件号后六位和员工姓名是否为白名单，再进行短信验证码的触发；-->
<template>
    <div class="input_main_contain">
        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input
                            class="_form_common_input_phone1 form"
                            v-model="login_data_to_form_widget.form.employee_number.value"
                            :attr="{maxlength:11,type:'text',id:login_data_to_form_widget.form.employee_number.id}"
                    />
                    <div
                            class="clean"
                            v-if="login_data_to_form_widget.form.employee_number.value"
                            onclick=""
                            :click="clickcleanThenNum(login_data_to_form_widget.form.employee_number)"
                    >
                        <img :attr="{src:clean}" alt=""/>
                    </div>
                </div>
            </div>
            <div v-if="!auxProperties.employee_number" class="tipforie9">
                请输入您的证件号码后六位
            </div>
            <div
                    class="tip"
                    :attr="{id:login_data_to_form_widget.form.employee_number.id + '-tips'}"
            >
                *请确认您的证件号码后六位
            </div>
        </div>
        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input
                            class="_form_common_input_phone1 form"
                            v-model="login_data_to_form_widget.form.employee_name.value "
                            :attr="{maxlength:11,type:'text',id:login_data_to_form_widget.form.employee_name.id}"
                    />
                    <div
                            class="clean"
                            v-if="login_data_to_form_widget.form.employee_name.value"
                            onclick=""
                            :click="clickcleanThenNum(login_data_to_form_widget.form.employee_name)"
                    >
                        <img :attr="{src:clean}" alt=""/>
                    </div>
                </div>
            </div>
            <div v-if="!auxProperties.employee_name" class="tipforie9">
                请输入您的员工姓名
            </div>
            <div
                    class="tip"
                    :attr="{id:login_data_to_form_widget.form.employee_name.id + '-tips'}"
            >
                *请确认您的员工姓名
            </div>
        </div>

        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="input_border">
                    <input
                            v-if="!auxProperties.mobileInputShow"
                            class="_form_common_input_phone1 form"
                            v-model="login_data_to_form_widget.form.mobile_phone.value "
                            :attr="{maxlength:11,type:'tel',id:login_data_to_form_widget.form.mobile_phone.id}"
                    />
                    <div
                            class="clean"
                            v-if="login_data_to_form_widget.form.mobile_phone.value"
                            onclick=""
                            :click="clickcleanThenNum(login_data_to_form_widget.form.mobile_phone)"
                    >
                        <img :attr="{src:clean}" alt=""/>
                    </div>
                    <div
                            v-if="auxProperties.mobileInputShow"
                            class="_form_common_input_phone2"
                            onclick=""
                            :click="auxProperties.switchInput"
                    >
                        {{auxProperties.mobileFormatted}}
                    </div>
                </div>
            </div>
            <div v-if="!auxProperties.mobile_phone" class="tipforie9">
                请输入您的手机号码
            </div>
            <div
                    class="tip"
                    :attr="{id:login_data_to_form_widget.form.mobile_phone.id + '-tips'}"
            >
                *请确认您的手机号码是否正确
            </div>
        </div>
        <!--<div class="ip_top">-->
        <!--<div class="input_border_buttom">-->
        <!--<div style="background-color: white;position: relative">-->
        <!--<div class="input_border input_code">-->
        <!--<img class="icon" :attr="{src:icon2}" alt=""/>-->
        <!--<input-->
        <!--v-model="login_data_to_form_widget.form.authImage_Code.value  "-->
        <!--class="form_common_input_SMSCode form"-->
        <!--:attr="{maxlength:4,type:'tel',id:login_data_to_form_widget.form.authImage_Code.id}"-->
        <!--data-toggle="tooltip"-->
        <!--data-placement="top"-->
        <!--title="图形验证码"-->
        <!--/>-->
        <!--</div>-->
        <!--<img-->
        <!--v-if="auxProperties.codeUrl"-->
        <!--class="imgCode"-->
        <!--style=""-->
        <!--:attr="{src:auxProperties.codeUrl}"-->
        <!--alt=""-->
        <!--onclick=""-->
        <!--:click="changeCode"-->
        <!--/>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-if="!auxProperties.authImage_Code" class="tipforie9">-->
        <!--请输入图形验证码-->
        <!--</div>-->
        <!--<div-->
        <!--class="tip"-->
        <!--:attr="{id:login_data_to_form_widget.form.authImage_Code.id + '-tips'}"-->
        <!--&gt;-->
        <!--*请填写正确的图形验证码-->
        <!--</div>-->
        <!--</div>-->
        <div class="ip_top">
            <div class="input_border_buttom">
                <div class="sms_input">
                    <div class="input_border input_code">
                        <input
                                v-model="login_data_to_form_widget.form.verification_code.value "
                                class="form_common_input_SMSCode form"
                                :attr="{maxlength:4,type:'tel',id:login_data_to_form_widget.form.verification_code.id}"
                        />
                    </div>
                    <div v-if="!auxProperties.verification_code" class="tipforie9">
                        请输入验证码
                    </div>
                    <div
                            v-if="auxProperties.code_time"
                            class="sms_code"
                            id="code"
                            style="background:#dfdfdf;color: #7e7e7e"
                    >
                        <div>{{auxProperties.code_times}}s</div>
                    </div>
                    <div
                            v-if="!auxProperties.code_time"
                            class="sms_code"
                            onclick=""
                            :click="clickVerificationCode"
                    >
                        获取短信验证码
                    </div>
                </div>
            </div>

            <div
                    class="tip"
                    :attr="{id:login_data_to_form_widget.form.verification_code.id + '-tips'}"
            >
                *请填写正确的短信验证码
            </div>
        </div>
    </div>
</template>
