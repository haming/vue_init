<template>
    <div>
        <div class="items" v-for="(item,key,index) in orders" style="width: 100%;">

            <div>
                <div class="list_top">
                    <div class="top-l akg_content">
                        <div class="content_title">{{item.organizationName}}</div>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>

            <table v-show="orders.length != 0" style="width: 100%" class="orderBorder"
                   cellpadding="0"
                   cellspacing="0">
                <tbody>
                <tr>
                    <td rowspan="3" style="width: 40px;" v-on:click="selectOrder(item)">
                        <div :attr="{id:item.id}" class="order_unselected" style="cursor: pointer">
                            <!--<img v-if="!item.selected" :attr="{src:@box}" alt="">-->
                            <!--<img v-if="item.selected" :attr="{src:@gou}" alt="">-->
                            <img v-if="item.selected" src="../newImgs/aki_31.png" alt="">
                            <img v-if="!item.selected" src="../newImgs/aki_31.png" alt="">
                        </div>
                    </td>
                    <td class="border_line">订单编号</td>
                    <td class="border_line">被保险人</td>
                    <td class="border_line">交费期间</td>
                    <td class="border_line">当前保费</td>
                    <td class="border_line">订单状态</td>
                    <td class="border_line">核保结果</td>
                </tr>
                <tr>
                    <td>{{item.orderNumber}}</td>
                    <td>
                        <div v-if="!item.insuredNewList || item.insuredNewList == null">--</div>
                        <div v-for="(insuredPeople,insuredKey,insuredIndex) in item.insuredNewList">
                            {{insuredPeople.insuredName}}
                        </div>
                    </td>
                    <td>{{item.riskNewList[0].payEndYear }}</td>
                    <td>{{item.currentPremium}}元</td>
                    <td>{{item.orderStatus | orderStatusFilter}}</td>
                    <td>
                        <div v-if="item.uwResult != null">{{item.uwResult}}</div>
                        <div v-if="item.uwResult == null">--</div>
                    </td>
                </tr>

                <tr>
                    <td class="tipsBlue" colspan="3" style="text-align: left;border-right: 0">
                        <div v-if="item.orderStatus == 0">※订单尚未完成填写，您可点击编辑按钮继续操作</div>


                        <div v-if="item.orderStatus == 2">

                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 3 || item.uploadStatus == 5 || item.uploadStatus == 6">
                                ※请及时上传体检资料
                            </div>

                            <div v-if="item.insuredNewList[0].uploadHandIdcard == 0">
                                ※被保险人的人脸识别已达到次数限制，请及时上传被保险人的持证照片
                            </div>

                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 5 || item.uploadStatus == 8">
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
                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 3 || item.uploadStatus == 4">
                                ※请被保险人通过短信中的链接完成参保确认（如已确认，请刷新订单页）
                            </div>
                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 3 || item.uploadStatus == 4"
                                 style="cursor: pointer">
                                <div v-if="!item.smsSend">※如有需要可重发短信 <span v-on:click="sendFaceMessage(item)">【点我发送】</span>
                                </div>
                                <div style="" v-if="item.smsSend">
                                    ※请等待{{item.seconds}}秒后才能重新发送
                                </div>
                            </div>
                        </div>


                        <div v-if="item.orderStatus == 3">
                            <div style=" ">※请提醒被保险人完成参保确认（如已确认，请刷新页面）</div>
                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 3 || item.uploadStatus == 5 || item.uploadStatus == 6">
                                ※请及时上传体检资料
                            </div>
                            <div v-if="item.uploadStatus == 1 || item.uploadStatus == 2 || item.uploadStatus == 5 || item.uploadStatus == 8">
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
                            <div style=" " v-if="!item.smsSend">※如有需要可重发短信
                                <span v-on:click="sendFaceMessage(item)">【点我发送】</span>
                            </div>
                            <div v-if="item.smsSend">
                                ※请等待{{item.seconds}}秒后才能重新发送
                            </div>
                        </div>
                        <div v-if="item.orderStatus == 4">※请点击提交按钮，将您的订单提交核保</div>

                        <div v-if="item.orderStatus ==8">※请您在{{item.lastPayDay}}前完成支付，到期订单将自动撤销</div>
                        <div v-if="item.orderStatus ==10">※恭喜您参保成功，保单已生效</div>
                        <div v-if="item.insuredNewList[0].uploadBodyCheckTips== -1 && (item.orderStatus == 2 || item.orderStatus == 3 || item.orderStatus == 4)">
                            由于您的累计保额降低，无需上传体检资料
                        </div>
                        <div v-if="item.insuredNewList[0].uploadIdcardTips== -1 && (item.orderStatus == 2 || item.orderStatus == 3 || item.orderStatus == 4)">
                            由于您的累计保费减少至20万元以内，无需上传证件资料
                        </div>
                        <div v-if="item.orderStatus == 11">
                            ※您已申请退保，退费时效说明：Q米支付金额24小时内退回Q米账户，其他金额5个工作日内退回银行卡。
                        </div>
                    </td>
                    <td colspan="3" style="border-left: 0px">
                        <div class="order-btn-ctrl">
                            <!-- <div v-if="item.insuredNewList[0].uploadIdcard == 1 &&  item.appntNew.uploadIdcard == 0"
                            class="send"
                            style="display: block">
                            <div class=" btn red_btn" v-on:click="uploadIc(item)"
                            style="color:#F66856;border: 1px solid #F66856 ">
                            <span>上传证件资料</span>
                            </div>
                            </div> -->
                            <div v-if="item.uploadStatus == 1 &&  item.orderStatus == 2" class="send"
                                 style="display: block">
                                <!--提示需要上传被保险人需要上传体检报告和身份证正反面的和邮件确认的-->
                                <div class=" btn red_btn" v-on:click="uploadBodyCheck(item)"
                                     style="color:#F66856 ;border: 1px solid #F66856">上传体检资料
                                </div>
                                <div class=" btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>

                            </div>
                            <div v-if="item.uploadStatus == 1 &&  item.orderStatus == 3" class="send"
                                 style="display: block">
                                <!--提示需要上传被保险人需要上传体检报告和身份证正反面的和邮件确认的-->
                                <div class=" btn red_btn" v-on:click="uploadBodyCheck(item)"
                                     style="color:#F66856 ;border: 1px solid #F66856">上传体检资料
                                </div>
                                <div class=" btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <!--<br>-->
                            <div v-if="item.uploadStatus == 2 && item.orderStatus == 2" class="send">
                                <!--提示需要上传身份证正反面和进行邮件确认的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 2 && item.orderStatus == 3" class="send">
                                <!--提示需要上传身份证正反面和进行邮件确认的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 3 &&  item.orderStatus == 2" class="send">

                                <!--提示需要请及时上传体检资料和进行邮件确认的-->
                                <div class="upload2 btn red_btn"
                                     v-on:click="uploadBodyCheck(item,1)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>

                                <div v-if="item.insuredNewList[0].uploadIdcard == 1 &&  item.appntNew.uploadIdcard == 0"
                                     class="upload btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 3 &&  item.orderStatus == 3" class="send">
                                <!--提示需要请及时上传体检资料和进行邮件确认的-->
                                <div class="upload2 btn red_btn"
                                     v-on:click="uploadBodyCheck(item,1)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 5 &&  item.orderStatus == 2" class="send"
                                 style="display: block">
                                <!--只需要请及时上传体检资料和身份证的正反面的-->
                                <div class="upload btn red_btn" v-on:click="uploadBodyCheck(item,1)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>
                                <div class="upload btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 5 &&  item.orderStatus == 3" class="send"
                                 style="display: block">
                                <!--只需要请及时上传体检资料和身份证的正反面的-->
                                <div class="upload btn red_btn" v-on:click="uploadBodyCheck(item,1)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>
                                <div class="upload btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <!--<br>-->
                            <div v-if="item.uploadStatus == 6 && item.orderStatus == 2" class="send">
                                <!--只需要请及时上传体检资料的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadBodyCheck(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 6 && item.orderStatus == 3" class="send">
                                <!--只需要请及时上传体检资料的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadBodyCheck(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">上传体检资料
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 8  && item.orderStatus == 2" class="send">
                                <!--只需要请及时上传被保险人身份证正反面照片的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.uploadStatus == 8  && item.orderStatus == 3" class="send">
                                <!--只需要请及时上传被保险人身份证正反面照片的-->
                                <div class="upload2 btn red_btn" v-on:click="uploadIc(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传证件资料</span>
                                </div>
                            </div>
                            <div v-if="item.orderStatus ==0">
                                <div style="color:#F66856;border: 1px solid #F66856 " class="btn red_btn" onclick=""
                                     :click="clickEditOrder(item)">编辑
                                </div>
                                <div class="btn" v-on:click="clickDeleteOrder(item)">
                                    删除
                                </div>
                            </div>
                            <div v-if="item.orderStatus ==2">

                                <div class="btn " v-on:click="clickEditOrder(item)">编辑
                                </div>
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="clickDeleteOrder(item)">
                                    删除
                                </div>
                                <div v-if="item.insuredNewList[0].uploadHandIdcard == 0" class=" btn red_btn"
                                     v-on:click="uploadHandIc(item)" style="color:#F66856;border: 1px solid #F66856 ">
                                    <span>上传持证照片</span>
                                </div>
                            </div>
                            <div v-if="item.orderStatus ==3">
                                <div class="btn " v-on:click="clickEditOrder(item)">编辑
                                </div>
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="clickDeleteOrder(item)">
                                    删除
                                </div>
                            </div>

                            <div v-if="item.orderStatus ==4">
                                <div class="btn " v-on:click="clickEditOrder(item)">编辑
                                </div>
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="clickDeleteOrder(item)">
                                    删除
                                </div>
                                <div class="btn red_btn" v-on:click="submitOrder(item)"
                                     style="color: #F66856;border: 1px solid #F66856">提交
                                </div>
                            </div>

                            <div v-if="item.orderStatus ==5">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="showCancelReason(item)" style="">
                                    查看撤单原因
                                </div>
                                <div class="btn" v-on:click="clickDeleteOrder(item)">
                                    删除
                                </div>
                                <div class="btn red_btn" v-on:click="clickEditOrder(item)"
                                     style="color:#F66856;border: 1px solid #F66856 ">编辑
                                </div>
                            </div>

                            <div v-if="item.orderStatus == 6 && item.uwResult == '人工核保中'">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                            </div>

                            <div v-if="item.orderStatus ==6 && item.uwResult == '拒保'">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="showRejectReason(item)" style="">
                                    查看拒保原因
                                </div>
                            </div>

                            <div v-if="item.orderStatus ==6 && item.uwResult == '通过'">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="cancelUserOrders(item)">
                                    撤单
                                </div>
                            </div>

                            <div v-if="item.orderStatus ==8 && item.uwResult == '通过'">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <div class="btn" v-on:click="cancelUserOrders(item)">
                                    撤单
                                </div>

                            </div>
                            <div v-if="item.orderStatus ==10 && item.uwResult == '通过'">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                                <!--<div class="btn" v-if="item.isWindowDate" onclick=""-->
                                <!--:click="cancelUserOrders(item)">退保-->
                                <!--</div>-->
                            </div>

                            <div v-if="item.orderStatus ==11">
                                <div class="btn" v-on:click="preview(item)">详情</div>
                            </div>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>

        </div>
        <div v-show="orders.length == 0" class="items orderListEmpty" style="width: 100%;">
            无订单
        </div>
    </div>
</template>
<script>

    import filter from "../../../service/filter";

    export default {
        name: "v-myOrder-pc",
        props: [
            "orders",
            "mobile",
            "selectOrder",
            "sendFaceMessage",
            "uploadHandIc",
            "uploadIc",
            "uploadBodyCheck",
            "clickEditOrder",
            "clickDeleteOrder",
            "preview",
            "submitOrder",
            "showCancelReason",
            "showRejectReason",
            "cancelUserOrders",
        ],
        filters: filter
    }
</script>