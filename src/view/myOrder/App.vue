<template>
    <div id="app" class="myOrderList ms-controller">
        <!--mobile-->
        <div class="content">
            <div class="title">
                <div class="title_1">订单查询</div>
                <div class="title_2"><img src='./newImgs/aki_6.png'></div>
            </div>
            <!--<div v-show="mobile">-->
            <!--0-->
            <!--<mobile :orders="orders"></mobile>-->
            <!--</div>-->

            <!--pc-->
            <div v-show="!mobile">
                <pc :orders="orders"
                    :mobile="mobile"
                    :selectOrder="selectOrder"
                    :sendFaceMessage="sendFaceMessage"
                    :uploadHandIc="uploadHandIc"
                    :uploadIc="uploadIc"
                    :uploadBodyCheck="uploadBodyCheck"
                    :clickEditOrder="clickEditOrder"
                    :clickDeleteOrder="clickDeleteOrder"
                    :preview="preview"
                    :submitOrder="submitOrder"
                    :showCancelReason="showCancelReason"
                    :showRejectReason="showRejectReason"
                    :cancelUserOrders="cancelUserOrders"
                >

                </pc>
            </div>
        </div>

    </div>
</template>


<script>
    // import mobile from './form_html/mobile';
    import pc from './form_html/pc';
    require('../../common/deferred')

    export default {
        name: 'App',
        components: {
            pc
        },
        data() {
            return {
                mobile: false,
                orderListHolder: [],
                orders: [
                    {
                        "appntNew": {
                            "appntBirthday": "1980-01-01",
                            "appntName": "测试",
                            "appntSex": "0",
                            "appntidNo": "110101198001010010",
                            "appntidType": "I",
                            "avoirdupois": "222",
                            "companyOrSchool": "阿撒擦撒擦",
                            "contactCity": "1101",
                            "contactDetailedAddress": "爱上擦拭吃撒删除",
                            "contactDistrict": "110102",
                            "contactProvince": "11",
                            "createDate": 1539742262000,
                            "email": "saca@qq.com",
                            "id": 2210,
                            "idExpDate": "2019-11-20",
                            "idIsLongValid": "0",
                            "isDelete": 0,
                            "marriage": "7",
                            "mobilePhoneNumber": "13465465465",
                            "nativePlace": "CHN",
                            "occupationCode": "K",
                            "orderId": 153974150809489,
                            "personalIncome": "22",
                            "premSource": "撒擦擦",
                            "stature": "222",
                            "taxIdentity": "1",
                            "taxpayernoTwo": "",
                            "updateDate": 1539742270000,
                            "uploadIdcard": -1,
                            "workDepartment": ""
                        },
                        "companyPay": 0.00,
                        "configId": 137,
                        "createDate": 1539742142000,
                        "currentPremium": 222.00,
                        "deliveryMethod": "X",
                        "effecriveDate": "2018-08-10",
                        "employeeNumber": "EMP852",
                        "id": 153974150809489,
                        "insuredAmount": 100000.00,
                        "insuredNewList": [
                            {
                                "avoirdupois": "222",
                                "companyOrSchool": "阿撒擦撒擦",
                                "contactCity": "1101",
                                "contactDetailedAddress": "爱上擦拭吃撒删除",
                                "contactDistrict": "110102",
                                "contactProvince": "11",
                                "createDate": 1539742263000,
                                "email": "saca@qq.com",
                                "id": 2600,
                                "idExpDate": "2019-11-20",
                                "idIsLongValid": "0",
                                "insuredBirthday": "1980-01-01",
                                "insuredIdno": "110101198001010010",
                                "insuredIdtype": "I",
                                "insuredName": "测试",
                                "insuredSex": "0",
                                "insuredseqNo": 1,
                                "isDelete": 0,
                                "marriage": "7",
                                "mobilePhoneNumber": "13465465465",
                                "nativePlace": "CHN",
                                "occupationCode": "K",
                                "orderId": 153974150809489,
                                "personalIncome": "22",
                                "rankCode": 1,
                                "rankName": "员工",
                                "relationToAppnt": "00",
                                "stature": "222",
                                "taxIdentity": "1",
                                "updateDate": 1539742270000,
                                "uploadBodyCheck": -1,
                                "uploadConfirm": -1,
                                "uploadHandIdcard": -1,
                                "uploadIdcard": -1,
                                "uploadIdcardRelationProve": -1
                            }
                        ],
                        "isDelete": 0,
                        "orderNumber": "2102153974150809672",
                        "orderStatus": 8,
                        "orderType": 601,
                        "organizationId": "zzrs",
                        "organizationName": "自在人生",
                        "planNewList": [],
                        "policyNumber": "P00000078155",
                        "prtNo": "2102153974150809672",
                        "riskNewList": [
                            {
                                "amnt": "100000",
                                "id": 3005,
                                "insuYear": "1",
                                "insuYearFlag": "Y",
                                "insuredseqNo": 1,
                                "isDelete": 0,
                                "mult": "1",
                                "orderId": 153974150809489,
                                "payEndYear": "1",
                                "payEndYearFlag": "Y",
                                "payIntv": "12",
                                "prem": "222.00",
                                "riskCode": "PNSD002"
                            }
                        ],
                        "saleChnl": "01",
                        "saleChnl1": "01",
                        "saleChnl2": "13",
                        "saleChnl3": "02",
                        "source": "zzrs",
                        "updateDate": 1539742142000,
                        "uwResult": "人工核保中"
                    }
                ]
            }
        },
        methods: {
            getUserInfo() {
                var deferred = Deferred();
                    setTimeout(function () {
                        console.log(1)
                        deferred.reject();
                    },3000)
                return deferred.promise;
            },
            getOrderList() {
                var deferred = Deferred();
                setTimeout(function () {
                    console.log(2)
                    deferred.resolve();
                },3000)
                return deferred.promise;
            },
            selectOrder: function (order) {
                var that = this;
                // if (order.orderStatus == '8') {
                //     order.selected = !order.selected
                //     var selectPayAllWidget = that.selectPayAllWidget;
                //     selectPayAllWidget.combinedOrderList = that.combinedOrderList;
                //     selectPayAllWidget.fix()
                // } else {
                //     that.handleTips('请选择状态为“待支付”的订单');
                // }
            },
            sendFaceMessage: function (order) {
                console.log("sendFaceMessage:",order)
            },
            uploadHandIc: function (order) {

            },
            uploadIc: function (order) {

            },
            uploadBodyCheck: function (item,type) {

            },
            clickEditOrder: function (item,type) {

            },
            clickDeleteOrder: function (item,type) {

            },
            preview: function (item,type) {

            },
            submitOrder: function (item,type) {

            },
            showCancelReason: function (item,type) {

            },
            showRejectReason: function (item,type) {

            },
            cancelUserOrders: function (item,type) {

            },
        },
        mounted() { //进入页面触发
            let that = this;
            this.getUserInfo()
                .then(function () {
                    that.getOrderList()
                })
                .otherwise(function (msg) {
                    console.log("error")
                });

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
