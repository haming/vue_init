<template>
    <div id="app">
        <!--<inputNew v-bind:data="parentMsg"/>-->
        <div class="inputBody">
            <!--<div class="sendCodePopUp" :if="@auxProperties.sendCodePopUp">-->
            <!--<div class="main">发送成功</div>-->
            <!--</div>-->
            <div class="inputCenter">
                <div class="title1">快 速 登 录</div>
                <login_3/>


                <!--<div v-html="login_3">{{login_3}}</div>-->
                <!--<div ms-html="@auxProperties.formHtml | nullFilter"></div>-->

                <!--点击下一步登录-->
                <!--<div class="input_main_contain_bottom" style="width: 100%">-->
                <!--<div>-->
                <div class="new_botton_contain_disAgree" @click="clickNext">
                    点 击 进 入
                </div>
                <!--<div :visible="!@auxProperties.allowNext" class="new_botton_contain_disAgree">-->
                <!--点 击 进 入-->
                <!--</div>-->
                <!--<div :visible="@auxProperties.allowNext" class="new_botton_contain_next" id="next"-->
                <!--onclick=""-->
                <!--:click="@clickNext">-->
                <!--点 击 进 入-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
            </div>
        </div>
        <!--<form id="loginForm" :attr="{action:@auxProperties.loginUrl}" method="post"-->
        <!--class="bs-docs-example form-horizontal" style="text-align: center;">-->
        <!--<input type="hidden" name="mobile_phone" :duplex="@userInfo.mobile_phone">-->
        <!--<input type="hidden" name="verification_code" :duplex="@userInfo.verification_code">-->
        <!--<input type="hidden" name="authImage_Code" :duplex="@userInfo.authImage_Code">-->
        <!--</form>-->

        <div v-html="test">{{test}}</div>

        <input type="button" @click="userLogin()" value="userLogin(Get)"/>
        <input type="button" @click="getUserInfo()" value="getUserInfo(Get)"/>
        <input type="button" @click="change_input()" value="change_input(Get)"/>
    </div>
</template>
<script>
    import inputNew from '../../components/inputNew.vue'
    import login_3 from './loginComponents/login_3.vue'
    // import test from './loginComponents/test.js'

    var test = '<div>\n' +
        '    <div>\n' +
        '        测试\n' +
        '    </div>\n' +
        '</div>\n';
    console.log(login_3);
    console.log(test);
    import service from './service'
    import Warehouse from './Warehouse'

    export default {
        name: 'App',
        components: {
            inputNew,
            login_3
        },
        data() {
            return {
                test: test,
                // login_3: login_3,
                parentMsg: {
                    id: 'id',
                    max: 8,
                    placeholder: 'placeholder',
                    readonly: false,
                    type: 'text',
                    value: ''
                },
                userInfo: {
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
                },
                // userInfo: Warehouse.data.userInfo
            }
        },
        methods: {
            userLogin: service.userLogin,
            getUserInfo: service.getUserInfo,
            change_input: service.change_input,
            clickNext: function () {

            },
        },
    }
</script>

<style lang="sass">
    @import "index.scss"
</style>
<style lang="css">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
