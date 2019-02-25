<template>
    <div >
        <li v-for="(item,key,index) in orders">
            <div class="content_text" v-if="orders.length != 0">
                <div class="col-xs-2 col-sm-2">
                    <div style="width: 7%;margin-left: 3%;float: left;margin-top: 88px" onclick=""
                         :click="selectOrder(item)">

                        <div class="order_unselected">
                            <img v-if="item.selected != 1" :attr="{src:@box}" alt="">
                            <img v-if="item.selected == 1" :attr="{src:@gou}" alt="">
                        </div>
                    </div>
                </div>
                <div class="content_left col-xs-10 col-sm-10">
                    <div class="text">
                        <div class="textOne">订单编号：</div>
                        <div class="textTwo">{{item.orderNumber | setNullFilter}}</div>
                        <div style="clear: both"></div>
                    </div>

                    <div class="text">
                        <div class="textOne">被保险人：</div>
                        <div class="textTwo">
                            <div v-if="!item.insuredNewList || item.insuredNewList == null">--</div>
                            <div v-for="(insuredIndex,insuredPeople) in item.insuredNewList">
                                {{@insuredPeople.insuredName}}
                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                    <div class="text">
                        <div class="textOne">交费期间：</div>
                        <div class="textTwo">{{item.riskNewList[0].payEndYear |nullFilter | setNullFilter |
                            payYearFilter}}
                        </div>
                        <div style="clear: both"></div>
                    </div>

                    <div class="text">
                        <div class="textOne">当前保费：</div>
                        <div class="textTwo">{{item.currentPremium | twoNumberFilter |
                            setNullFilter}}元
                        </div>
                        <div style="clear: both"></div>
                    </div>

                    <div class="text">
                        <div class="textOne">订单状态：</div>
                        <div class="textTwo">
                            <span>{{item.orderStatus | orderStatusFilter | setNullFilter}}</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                    <div class="text">
                        <div class="textOne">核保结果：</div>
                        <div class="textTwo">
                            <span>{{item.uwResult | uwNullFilter | setNullFilter}}</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                    <!--提示-->
                    <div class="tipsBlue">
                        <div v-if="item.orderStatus == 0">※订单尚未完成填写，您可点击编辑按钮继续操作</div>
                        <div v-if="item.orderStatus == 2">
                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 3 || item.uploadStatus == 5 || item.uploadStatus == 6) ">
                                ※请及时上传体检资料
                            </div>

                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 5 || item.uploadStatus == 8) ">
                                            <span v-if="item.relationship == '00'">
                                                ※请及时上传证件资料
                                            </span>
                                <span v-if="item.relationship != '00'">
                                                <span>※请及时上传投/被保险人证件资料</span>
                                            </span>
                            </div>

                            <div v-if="item.insuredNewList[0].uploadHandIdcard == 0">
                                <span>※被保险人的人脸识别已达到次数限制，请及时上传被保险人的持证照片</span>
                            </div>

                            <div v-if="item.insuredNewList[0].uploadIdcard == 1 &&  item.appntNew.uploadIdcard == 0">
                                <span>※请及时上传投/被保险人证件资料</span>
                            </div>
                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 3 || item.uploadStatus == 4)">
                                ※请被保险人通过短信中的链接完成参保确认（如已确认，请刷新订单页）
                            </div>
                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 3 || item.uploadStatus == 4)"
                                 style="cursor: pointer">
                                <div onclick="" :click="@sendFaceMessage(item)"
                                     v-if="!item.smsSend">※如有需要可重发短信【点我发送】
                                </div>
                                <div v-if="item.smsSend">
                                    ※请等待{{item.seconds}}秒后才能重新发送
                                </div>
                            </div>
                        </div>
                        <div v-if="item.orderStatus == 4">※请点击提交按钮，将您的订单提交核保</div>

                        <div v-if="item.orderStatus == 3">

                            <div style=" ">※请提醒被保险人完成参保确认（如已确认，请刷新页面）</div>
                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 3 || item.uploadStatus == 5 || item.uploadStatus == 6) ">
                                ※请及时上传体检资料
                            </div>

                            <div v-if="(item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 5 || item.uploadStatus == 8) ">
                                             <span v-if="item.relationship == '00'">
                                                ※请及时上传证件资料
                                            </span>
                                <span v-if="item.relationship != '00'">
                                                <span>※请及时上传投/被保险人证件资料</span>
                                            </span>
                            </div>
                            <div v-if="item.insuredNewList[0].uploadIdcard == 1 &&  item.appntNew.uploadIdcard == 0">
                                <span>※请及时上传投/被保险人证件资料</span>
                            </div>
                            <div onclick="" style=" " :click="@sendFaceMessage(item)"
                                 v-if="!item.smsSend">※如有需要可重发短信【点我发送】
                            </div>
                            <div style=" " v-if="item.smsSend">
                                ※请等待{{item.seconds}}秒后才能重新发送
                            </div>
                        </div>

                        <div v-if="item.orderStatus ==8">※请您在{{item.lastPayDay}}前完成支付，到期订单将自动撤销</div>
                        <div v-if="item.orderStatus ==10">※恭喜您参保成功，保单已生效</div>
                        <div v-if="item.insuredNewList[0].uploadBodyCheckTips == -1 && (item.orderStatus == 2 || item.orderStatus == 3 || item.orderStatus == 4)">
                            由于您的累计保额降低，无需上传体检资料
                        </div>
                        <div v-if="item.insuredNewList[0].uploadIdcardTips == -1 && (item.orderStatus == 2 || item.orderStatus == 3 || item.orderStatus == 4)">
                            由于您的累计保费减少至20万元以内，无需上传证件资料
                        </div>
                        <div v-if="item.orderStatus == 11">
                            ※您已申请退保，退费时效说明：Q米支付金额24小时内退回Q米账户，其他金额5个工作日内退回银行卡。
                        </div>


                    </div>
                </div>
                <div style="clear: both"></div>
                <!--<div class="order-btn-ctrl">-->

                    <!--<div v-if="item.insuredNewList[0].uploadIdcard == 1 &&  item.appntNew.uploadIdcard == 0"-->
                         <!--class="send"-->
                         <!--style="display: block">-->
                        <!--<div class=" btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.uploadStatus == 1 &&  item.orderStatus == 2"-->
                         <!--class="send"-->
                         <!--style="display: block">-->
                        <!--&lt;!&ndash;提示需要上传被保险人需要上传体检报告和身份证正反面的和邮件确认的&ndash;&gt;-->
                        <!--<div class=" btn red_btn" onclick="" :click="@uploadBodyCheck(item)"-->
                             <!--style="color:#F66856 ;border: 1px solid #F66856">上传体检资料-->
                        <!--</div>-->
                        <!--<div class=" btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 1 &&  item.orderStatus == 3"-->
                         <!--class="send"-->
                         <!--style="display: block">-->
                        <!--&lt;!&ndash;提示需要上传被保险人需要上传体检报告和身份证正反面的和邮件确认的&ndash;&gt;-->
                        <!--<div class=" btn red_btn" onclick="" :click="@uploadBodyCheck(item)"-->
                             <!--style="color:#F66856 ;border: 1px solid #F66856">上传体检资料-->
                        <!--</div>-->
                        <!--<div class=" btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<br>&ndash;&gt;-->
                    <!--<div v-if="item.uploadStatus == 2 && item.orderStatus == 2"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;提示需要上传身份证正反面和进行邮件确认的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->


                    <!--<div v-if="item.uploadStatus == 2 && item.orderStatus == 3"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;提示需要上传身份证正反面和进行邮件确认的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.uploadStatus == 3 &&  item.orderStatus == 2"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;提示需要请及时上传体检资料和进行邮件确认的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item,@fuxiangType)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.uploadStatus == 3 &&  item.orderStatus == 3"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;提示需要请及时上传体检资料和进行邮件确认的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item,@fuxiangType)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 5 &&  item.orderStatus == 2"-->
                         <!--class="send"-->
                         <!--style="display: block">-->
                        <!--&lt;!&ndash;只需要请及时上传体检资料和身份证的正反面的&ndash;&gt;-->
                        <!--<div class="upload btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item,@fuxiangType)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                        <!--<div class="upload btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 5 &&  item.orderStatus == 3"-->
                         <!--class="send"-->
                         <!--style="display: block">-->
                        <!--&lt;!&ndash;只需要请及时上传体检资料和身份证的正反面的&ndash;&gt;-->
                        <!--<div class="upload btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item,@fuxiangType)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                        <!--<div class="upload btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;<br>&ndash;&gt;-->
                    <!--<div v-if="item.uploadStatus == 6 && item.orderStatus == 2"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;只需要请及时上传体检资料的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 6 && item.orderStatus == 3"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;只需要请及时上传体检资料的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick=""-->
                             <!--:click="@uploadBodyCheck(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">上传体检资料-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 8  && item.orderStatus == 2"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;只需要请及时上传被保险人身份证正反面照片的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.uploadStatus == 8  && item.orderStatus == 3"-->
                         <!--class="send">-->
                        <!--&lt;!&ndash;只需要请及时上传被保险人身份证正反面照片的&ndash;&gt;-->
                        <!--<div class="upload2 btn red_btn" onclick="" :click="@uploadIc(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">-->
                            <!--<span>上传证件资料</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==0" class="taxt_float">-->
                        <!--<div style="color:#F66856;border: 1px solid #F66856 " class="btn red_btn" onclick=""-->
                             <!--:click="@clickEditOrder(item)">编辑-->
                        <!--</div>-->
                        <!--<div class="btn" onclick="" :click="@clickDeleteOrder(item)">-->
                            <!--删除-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.orderStatus ==2" class="taxt_float">-->

                        <!--<div class="btn " onclick=""-->
                             <!--:click="@clickEditOrder(item)">编辑-->
                        <!--</div>-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@clickDeleteOrder(item)">-->
                            <!--删除-->
                        <!--</div>-->
                        <!--<div v-if="item.insuredNewList[0].uploadHandIdcard == 0" class="btn red_btn" onclick=""-->
                             <!--style="color:#F66856;border: 1px solid #F66856 "-->
                             <!--:click="@uploadHandIc(item)">-->
                            <!--上传持证照片-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==3" class="taxt_float">-->
                        <!--<div class="btn " onclick=""-->
                             <!--:click="@clickEditOrder(item)">编辑-->
                        <!--</div>-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@clickDeleteOrder(item)">-->
                            <!--删除-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==4" class="taxt_float">-->
                        <!--<div class="btn " onclick=""-->
                             <!--:click="@clickEditOrder(item)">编辑-->
                        <!--</div>-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@clickDeleteOrder(item)">-->
                            <!--删除-->
                        <!--</div>-->
                        <!--<div class="btn red_btn" onclick="" :click="@submitOrder(item)"-->
                             <!--style="color: #F66856;border: 1px solid #F66856">提交-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==5" class="taxt_float">-->

                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@showCancelReason(item)"-->
                             <!--style="">-->
                            <!--查看撤单原因-->
                        <!--</div>-->
                        <!--<div class="btn" onclick="" :click="@clickDeleteOrder(item)">-->
                            <!--删除-->
                        <!--</div>-->
                        <!--<div class="btn red_btn" onclick="" :click="@clickEditOrder(item)"-->
                             <!--style="color:#F66856;border: 1px solid #F66856 ">编辑-->
                        <!--</div>-->

                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==6 && item.uwResult == '人工核保中'"-->
                         <!--class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==6 && item.uwResult == '拒保'"-->
                         <!--class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@showRejectReason(item)"-->
                             <!--style="">-->
                            <!--查看拒保原因-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==6 && item.uwResult == '通过'"-->
                         <!--class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@cancelUserOrders(item)">-->
                            <!--撤单-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==8 && item.uwResult == '通过'"-->
                         <!--class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" onclick="" :click="@cancelUserOrders(item)">-->
                            <!--撤单-->
                        <!--</div>-->

                    <!--</div>-->
                    <!--<div v-if="item.orderStatus ==10 && item.uwResult == '通过'"-->
                         <!--class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                        <!--<div class="btn" v-if="item.isWindowDate" onclick=""-->
                             <!--:click="@cancelUserOrders(item)">退保-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--<div v-if="item.orderStatus ==11" class="taxt_float">-->
                        <!--<div class="btn" onclick="" :click="@preview(item)">详情</div>-->
                    <!--</div>-->

                <!--</div>-->

                <!--<div style="clear: both"></div>-->
            </div>

        </li>
        <li v-if="orders.length == 0" class="orderListEmpty"> 无订单</li>
    </div>
</template>

<script>
    import filter from "../../../service/filter";
    export  default {
        name: "v-myOrder-Mobile",
        data(){return},
        props:["orderListHolder"],
        mounted(){},
        methods:{},
        filters:filter
    }
</script>
