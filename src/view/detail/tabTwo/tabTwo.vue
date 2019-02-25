<template>
    <div style="width: 100%;overflow: hidden">
        <div class="tab2">
            <div class="tab2_tab">
                <div>
                    <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 20px">
                        <div class="col-sm-10 col-xs-10 tab2_title1 cleanPadding">
                            01 承保对象及保险利益
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 tab2_list mobileNoPaing">
                        <div class="col-xs-12 col-sm-2 topText mobileNoPaing point">
                            <i></i>产品名称：
                        </div>
                        <div class="col-xs-12 col-sm-10 " style="line-height: 25px;padding-left: 0">
                            主险 <a target="_blank"
                                  style="border-bottom: 1px solid #3aaaf8;color:#3aaaf8;text-decoration: none">《招商信诺自在人生养老年金保险A款》</a>【保监会报备文号：招商信诺[2017]养老年金保险045号】<br><span>附加险《招商信诺年金保险（万能型）》（可选）【保监会报备文号：招商信诺[2017]年金保险042号】<br></span>

                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 tab2_list mobileNoPaing">
                        <div class="col-xs-12 col-sm-2 topText mobileNoPaing point">
                            <i></i>投保人：
                        </div>
                        <div class="col-xs-12 col-sm-10 " style="padding-left: 0">必须是年满18周岁、具有完全民事行为能力的自然人</div>
                    </div>
                    <div class="col-xs-12 col-sm-12 tab2_list mobileNoPaing">
                        <div class="col-xs-12 col-sm-2 topText mobileNoPaing point">
                            <i></i>被保险人：
                        </div>
                        <!--<div class="col-xs-12 col-sm-10 " style="padding-left: 0">{{@auxProperties.relationshipsTips}}</div>-->
                        <div class="col-xs-12 col-sm-10 " style="padding-left: 0">投保人本人、配偶、子女、父母、配偶父母</div>
                    </div>
                    <div class="col-xs-12 col-sm-12 tab2_list mobileNoPaing">
                        <div class="col-xs-12 col-sm-2 topText mobileNoPaing point">
                            <i></i>投保年龄：
                        </div>
                        <div class="col-xs-12 col-sm-10" style="padding-left: 0">出生满28天至55周岁</div>
                    </div>
                    <div class="col-xs-12 col-sm-12 tab2_list mobileNoPaing">
                        <div class="col-xs-12 col-sm-2 topText mobileNoPaing point">
                            <i></i>受益人：
                        </div>
                        <div class="col-xs-12 col-sm-10 mobileNoPaing" style="padding-left: 0">
                            身故保险金受益人为法定，生存保险金的受益人为被保险人本人
                        </div>
                    </div>

                </div>
            </div>
            <div class="tab2_tab tab2_tab_margin">
                <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 20px">
                    <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 20px">
                        <div class="col-sm-9 col-xs-9 tab2_title1 cleanPadding">
                            02 保险期间、交费期间、年金领取年龄及保费要求：
                        </div>
                    </div>
                    <div style="overflow: hidden;border-radius: 10px;border: 1px solid #f04869">
                        <table class="tab2table" style="" cellspacing="0" cellpadding="0">
                            <tbody style="width: 100%">
                            <tr style="background-color: #f04869">
                                <td class="tdColor"
                                    style="border-left: none;border-top: none;border-right: 1px solid #ffffff">险种名称
                                </td>
                                <td class="tdColor" style="border-top: none;border-right: 1px solid #ffffff">被保险人年龄</td>
                                <td class="tdColor" style="border-top: none;border-right: 1px solid #ffffff">
                                    交费期间（趸交、年交、月交）
                                </td>
                                <td class="tdColor" style="border-top: none;border-right: 1px solid #ffffff">
                                    年金领取起始年龄（年领、月领）
                                </td>
                                <td class="tdColor" style="border-top: none;border-right: 1px solid #ffffff">保险期间</td>
                                <td class="tdColor" style="border-top: none;border-right: none">保险费</td>
                            </tr>
                            <tr>
                                <td rowspan="10" style="border-left: none;border-bottom: none">招商信诺自在人生养老年金保险A款</td>
                                <td>出生满28天至30周岁</td>
                                <td>5年、10年、15年、20年</td>
                                <td>55岁、60岁、65岁</td>
                                <td rowspan="10">终身</td>
                                <td rowspan="10">须为1000元的整数倍，每张保单最低为10000元</td>
                            </tr>
                            <tr>
                                <td>31周岁至35周岁</td>
                                <td>5年、10年、15年、20年</td>
                                <td>55岁、60岁、65岁</td>
                            </tr>
                            <tr>
                                <td rowspan="2">36周岁至40周岁</td>
                                <td>5年、10年、15年</td>
                                <td>55岁、60岁、65岁</td>
                            </tr>
                            <tr>
                                <td>20年</td>
                                <td>60岁、65岁</td>
                            </tr>
                            <tr>
                                <td rowspan="3">41周岁至45周岁</td>
                                <td>5年、10年</td>
                                <td>55岁、60岁、65岁</td>
                            </tr>
                            <tr>
                                <td>15年</td>
                                <td>60岁、65岁</td>
                            </tr>
                            <tr>
                                <td>20年</td>
                                <td>65岁</td>
                            </tr>
                            <tr>
                                <td rowspan="2">46周岁至50周岁</td>
                                <td>5年、10年</td>
                                <td>60岁、65岁</td>
                            </tr>
                            <tr>
                                <td>15年</td>
                                <td>65岁</td>
                            </tr>
                            <tr>
                                <td>51周岁至55周岁</td>
                                <td>5年、10年</td>
                                <td>65岁</td>
                            </tr>
                            <tr>
                                <td style="border-left: none;border-bottom: none">招商信诺年金保险万能型</td>
                                <td style="border-bottom: none"> 出生满28天至55周岁</td>
                                <td style="border-bottom: none">趸交</td>
                                <td style="border-bottom: none">--</td>
                                <td style="border-bottom: none">终身</td>
                                <td style="border-bottom: none;border-right: none">首期保险费为零</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style="clear: both"></div>
                <div class="tab2footercenter">
                    <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 10px">
                        <div class="col-sm-9 col-xs-10 tab2_title1 cleanPadding" style="padding-left: 5px">
                            03 阅读条款
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <div style="font-size: 14px !important;">
                            请您仔细阅读保险条款中的保险责任、责任免除、等待期、免赔额或免赔率、退保等规定，了解保险利益及您所拥有的保障范围
                        </div>
                    </div>
                </div>


                <div class="tab2footercenter">
                    <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 10px">
                        <div class="col-sm-9 col-xs-10 tab2_title1 cleanPadding" style="padding-left: 5px">
                            04 保单形式
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <div style="font-size: 14px !important;">
                            由于电子保单及投保成功信息将发送到投保信息中所填的邮箱和手机中，请务必准确填写。如果您在1个工作日后仍然没有收到电子保单，请及时拨打我公司客服电话95362咨询。
                        </div>
                    </div>
                </div>
                <div class="tab2footercenter">
                    <div class="col-sm-12 col-xs-12 cleanPadding" style="margin-bottom: 10px">
                        <div class="col-sm-9 col-xs-10 tab2_title1 cleanPadding" style="padding-left: 5px">
                            05 温馨提示
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                        <div style="font-size: 14px !important;">
                            <li style="float: left;width: 10px;float: left"></li>
                            <div style="width: 98%;display: inline-block;overflow: hidden;float: left">
                                招商信诺年金保险（万能型）为万能保险，结算利率超过最低保证利率的部分是不确定的。
                            </div>

                        </div>

                        <div style="font-size: 14px !important;">
                            <li style="float: left;width: 10px;float: left"></li>
                            <div style="width: 98%;display: inline-block;overflow: hidden;float: left">
                                保险公司不得违规销售非保险金融产品，请勿参加非法集资。如需了解我司分支机构信息，请登录网站<a
                                    href="http://www.cignacmb.com/lianxi/gongsiwangdian.html">http://www.cignacmb.com/lianxi/gongsiwangdian.html</a>查询。
                            </div>
                        </div>
                        <div style="font-size: 14px !important;">
                            <li style="float: left;width: 10px;float: left"></li>
                            <div style="width: 98%;display: inline-block;overflow: hidden;float: left">
                                本网页仅供参考，不构成保险合同组成部分，保险责任、责任免除、等待期、理赔要求等重点内容，以保险合同为准。
                            </div>
                        </div>
                        <div style="font-size: 14px !important;">
                            <li style="float: left;width: 10px;float: left"></li>
                            <div style="width: 98%;display: inline-block;overflow: hidden;float: left">
                                我公司未委托或者授权任何人士销售非保险金融产品，如有保险从业人员向您推荐非保险金融产品或唆使您退保、保单贷款购买非保险金融产品，请提高警惕，认真甄别。
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import '../../../common/common';

    export default {
        name: 'tabTwo',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'//数据的接收格式
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="sass">
    @import "tabTwo"
</style>
