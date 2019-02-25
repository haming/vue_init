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
            <!--<div class="col-xs-12 col-sm-12 zhenai3_content" id="start" style="display: none;">-->
                <!--<div class="center">-->
                    <!--&lt;!&ndash;投保人信息&ndash;&gt;-->
                    <!--<div class="benren">-->
                        <!--<div class="col-xs-12 col-sm-12 center-top center-top-border"-->
                             <!--v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value =='00'">-->
                            <!--<div class="titleImgForNo ">-->
                                <!--投保人信息（同被保险人）-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="col-xs-12 col-sm-12 center-top center-top-border"-->
                             <!--v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value !='00'">-->
                            <!--<div class="titleImg1 ">-->
                                <!--投保人信息-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="InputBorder">-->
                            <!--&lt;!&ndash;员工姓名&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">投保人姓名</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" maxlength="10" name="appntName" class="form-control watch"-->
                                           <!--placeholder="请输入投保人姓名"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.appntName.value | nullFilter"-->
                                           <!--readonly>-->
                                <!--</div>-->
                            <!--</div>-->

                            <!--&lt;!&ndash;职级&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list"-->
                                 <!--v-if="order_to_form_widget.form.appntNewForm.rankCode.visible">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">职级</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model='order_to_form_widget.form.appntNewForm.rankCode.selectValue'-->
                                                <!--style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">-->
                                            <!--<option v-for='(item,index) in order_to_form_widget.form.appntNewForm.rankCode.candidateArray'-->
                                                    <!--:attr="item.key" :key="index">-->
                                                <!--{{item.value | nullFilter}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="order_to_form_widget.form.appntNewForm.rankCode.visible && order_to_form_widget.form.appntNewForm.rankCode.inputVisible"-->
                                 <!--class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">职级具体描述</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" name="appntName" class="form-control watch" placeholder="职级具体描述"-->
                                           <!--maxlength="20"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.rankCode.inputValue | nullFilter">-->
                                <!--</div>-->
                            <!--</div>-->


                            <!--&lt;!&ndash;证件类型&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">证件类型</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon"-->
                                         <!--v-if="order_to_form_widget.form.appntNewForm.appntidType.visible">-->
                                        <!--<select class="input-xlarge form-control watch"-->
                                                <!--v-model='order_to_form_widget.form.appntNewForm.appntidType.value'-->
                                                <!--name="appntidType">-->
                                            <!--<option v-for='(item,index) in candidateArrays.icTypes' :attr="item.key" :key="index">-->
                                                <!--{{item.value}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->

                                    <!--<div class="cleanSelectIcon form-control" readonly-->
                                         <!--v-if="!order_to_form_widget.form.appntNewForm.appntidType.visible">-->
                                        <!--<span>身份证</span>-->
                                    <!--</div>-->

                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;证件号码&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left" for="UserIc_number">证件号码</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" id="UserIc_number" class="form-control watch" maxlength="18"-->
                                           <!--placeholder="请输入投保人证件号码" name="appntidNo"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.appntidNo.value| nullFilter | ic_numberFilter | change">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;证件有效期&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list marginForTop">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left" for="datetimepicker">证件有效期</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div :class="order_to_form_widget.form.appntNewForm.idIsLongValid.value == 1 ? 'box1' : 'box2'" @click="userInfo_ic_is_long_valid_change(1)"-->
                                         <!--style="display: inline-block;width: 25%;cursor: pointer;text-align: center;float: left;margin-right: 5px">-->
                                        <!--<div>长期</div>-->
                                    <!--</div>-->
                                    <!--<div :class="(order_to_form_widget.form.appntNewForm.idIsLongValid.value === 0 || order_to_form_widget.form.appntNewForm.idIsLongValid.value === '0')? 'box1' : 'box2'" @click="userInfo_ic_is_long_valid_change(0)"-->
                                         <!--style="position: relative;display: inline-block;width: 72%;cursor: pointer;position: relative;">-->
                                        <!--<div style="float: left;margin-left: 5px">至</div>-->
                                        <!--<div class="positionLine"></div>-->

                                        <!--&lt;!&ndash; <div class="dateinput" style="position: absolute;top: 0;right:0;width: 80%"-->
                                         <!--v-show="@order_to_form_widget.form.appntNewForm.idIsLongValid.value == 1">-->
                                        <!--<input class="form-control watch  datetimepicker" value="2000-01-01" type="text"-->
                                               <!--style="background-color: transparent;color: #FFFFFF;border: none;margin-top: 0;text-align: center;cursor: pointer"-->
                                               <!--placeholder="请选择" data-toggle="tooltip"-->
                                               <!--data-placement="top" title="请选择"-->
                                               <!--v-model="@order_to_form_widget.form.appntNewForm.idExpDate.value| dataTimeFilter |nullFilter"-->
                                               <!--readonly/>-->
                                    <!--</div> &ndash;&gt;-->
                                        <!--<div class="dateinput" style="position: absolute;top: 0;right:0;width: 80%"-->
                                             <!--v-show="(order_to_form_widget.form.appntNewForm.idIsLongValid.value === 0 || order_to_form_widget.form.appntNewForm.idIsLongValid.value === '0')">-->
                                            <!--<input class="form-control watch  datetimepicker" value="2000-01-01" type="text"-->
                                                   <!--:startDate="order_to_form_widget.form.appntNewForm.idExpDate.start"-->
                                                   <!--:endDate="order_to_form_widget.form.appntNewForm.idExpDate.end"-->
                                                   <!--style="background-color: transparent;color: #FFFFFF;border: none;margin-top: 0;text-align: center"-->
                                                   <!--id="datetimepickerxxxx" placeholder="请选择" data-toggle="tooltip"-->
                                                   <!--data-placement="top" title="请选择"-->
                                                   <!--v-model="order_to_form_widget.form.appntNewForm.idExpDate.value | dataTimeFilter | nullFilter"-->
                                                   <!--readonly/>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;出生日期&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left marginTop">出生日期</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text"-->
                                           <!--v-show="order_to_form_widget.form.appntNewForm.appntidType.value == 'I'"-->
                                           <!--class="form-control watch"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.appntBirthday.value | nullFilter"-->
                                           <!--readonly>-->
                                    <!--<input type="text"-->
                                           <!--v-show="order_to_form_widget.form.appntNewForm.appntidType.value != 'I'"-->
                                           <!--:startDate="order_to_form_widget.form.appntNewForm.appntBirthday.start"-->
                                           <!--:endDate="order_to_form_widget.form.appntNewForm.appntBirthday.end"-->
                                           <!--class="form-control watch background_white userbirthday datetimepicker"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.appntBirthday.value | nullFilter"-->
                                           <!--data-date-format="dd-mm-yyyy" readonly>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;性别&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">性别</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right"-->
                                     <!--v-show="order_to_form_widget.form.appntNewForm.appntidType.value != 'I'">-->
                                    <!--<div class="cleanSelectIcon">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model="order_to_form_widget.form.appntNewForm.appntSex.value">-->
                                            <!--<option v-for='(item,index) in candidateArrays.genders' :value="item.key" :key="index">-->
                                                <!--{{item.value}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right"-->
                                     <!--v-show="order_to_form_widget.form.appntNewForm.appntidType.value == 'I'">-->
                                    <!--<input readonly type="text" maxlength="11" placeholder="请输入员工本人手机号码"-->
                                           <!--class="form-control watch"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.appntSex.value | nullFilter | genderFilter">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;手机号码&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">手机号码</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input readonly type="text" maxlength="11" placeholder="请输入员工本人手机号码"-->
                                           <!--class="form-control watch"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.mobilePhoneNumber.value | nullFilter">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;婚姻状态&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list center-list2 marginForTop">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left" style="">婚姻状态</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="form-control watch"-->
                                         <!--:class="(order_to_form_widget.form.appntNewForm.marriage.value == '2' ? 'gendersMain2':'gendersMain')"-->
                                         <!--@click="userInfo_maritalStatusChange(2)" style="margin-right: 10%">-->
                                        <!--已婚-->
                                    <!--</div>-->

                                    <!--<div class=" form-control watch"-->
                                         <!--:class="(order_to_form_widget.form.appntNewForm.marriage.value == '7' ? 'gendersMain2':'gendersMain')"-->
                                         <!--@click="userInfo_maritalStatusChange(7)">-->
                                        <!--单身-->
                                    <!--</div>-->
                                    <!--<div style="clear: both"></div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;国籍&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list ">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left center-list-top">国籍</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon"-->
                                         <!--v-if="order_to_form_widget.form.appntNewForm.nativePlace.visible">-->
                                        <!--<select id="userInfo_country" class="input-xlarge form-control watch "-->
                                                <!--v-model="order_to_form_widget.form.appntNewForm.nativePlace.value">-->
                                            <!--<option v-for="(item, index) in candidateArrays.nationalities" :key="index" :value="item.id">-->
                                                <!--{{item.cn}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                    <!--<input readonly type="text" maxlength="11" class="form-control watch" value="中国"-->
                                           <!--v-if="!order_to_form_widget.form.appntNewForm.nativePlace.visible">-->

                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;年收入&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">个人年收入</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="tel" id="AnnualIncome_userInfo" class="form-control watch"-->
                                           <!--style="width: 80%;display: inline-block"-->
                                           <!--maxlength="5"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.personalIncome.value | nullFilter"-->
                                           <!--placeholder="请输入">-->
                                    <!--<span style="margin-left: 3%">万元</span>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;行业&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">职业类型</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model='order_to_form_widget.form.appntNewForm.occupationCode.value'-->
                                                <!--style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">-->
                                            <!--<option value="0">请选择</option>-->
                                            <!--<option v-for='(item,index) in candidateArrays.careers' :value="item.key" :key="index">-->
                                                <!--{{item.value | nullFilter}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;邮箱地址&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">邮箱地址</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" class="form-control watch" placeholder="请输入投保人邮箱地址"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.email.value | nullFilter | emailFilter"-->
                                           <!--maxlength="50">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;保险费来源&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">保险资金来源</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" maxlength="20" class="form-control watch" placeholder="请输入保险费来源"-->
                                           <!--maxlength="20"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.premSource.value | nullFilter | onlyChineseAndEnglish">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;现工作单位或现就读学校名称&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">单位或学校</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" class="form-control watch" maxlength="33" placeholder="请输入"-->
                                           <!--v-model="order_to_form_widget.form.appntNewForm.companyOrSchool.value | nullFilter">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;工作单位性质&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="col-xs-12 col-md-4 col-sm-6 center-list"&ndash;&gt;-->
                            <!--&lt;!&ndash;v-show="@appntNewForm.nativePlace.value !='CHN'">&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="col-xs-3 col-sm-4 center-list-left">工作单位性质</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="col-xs-9 col-sm-8 center-list-right">&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="cleanSelectIcon">&ndash;&gt;-->
                            <!--&lt;!&ndash;<select class="input-xlarge form-control watch "&ndash;&gt;-->
                            <!--&lt;!&ndash;v-model='appntNewForm.workDepartment.value'&ndash;&gt;-->
                            <!--&lt;!&ndash;style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">&ndash;&gt;-->
                            <!--&lt;!&ndash;<option value="0">请选择</option>&ndash;&gt;-->
                            <!--&lt;!&ndash;<option v-for='((item,index)) in @candidateArrays.work_departments'&ndash;&gt;-->
                            <!--&lt;!&ndash;:attr="{value:@item.key}">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{@item.value| nullFilter}}&ndash;&gt;-->
                            <!--&lt;!&ndash;</option>&ndash;&gt;-->
                            <!--&lt;!&ndash;</select>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->


                            <!--&lt;!&ndash;联系地址&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-sm-12 address_select ">-->
                                <!--<div class="col-xs-3 col-sm-2 center-list-left addressWidth" style="">联系地址</div>-->
                                <!--<div class="col-xs-9 col-sm-10 center-list-right center-list-right2" style="padding-left: 1.4%">-->

                                    <!--<div style="background-color: white;padding: 5px 0 0 0;overflow:hidden;">-->
                                        <!--<div class="  paddinfLeft ">-->
                                            <!--<div class="cleanSelectIcon ceshiAddress">-->
                                                <!--<select id="address1_userInfo" class="watch"-->
                                                        <!--v-model='order_to_form_widget.form.appntNewForm.contactDetailedAddress.province'-->
                                                        <!--data-toggle="tooltip" data-placement="top" title="请选择省份">-->
                                                    <!--<option value="0">请选择省份</option>-->
                                                    <!--<option v-for='(item,index) in order_to_form_widget.form.appntNewForm.contactDetailedAddress.provinces'-->
                                                            <!--:value="item.id" :key="index">-->
                                                        <!--{{item.name}}-->
                                                    <!--</option>-->
                                                <!--</select>-->
                                            <!--</div>-->
                                            <!--<div class="cleanSelectIcon ceshiAddress">-->
                                                <!--<select id="address2_userInfo" class="watch" data-toggle="tooltip"-->
                                                        <!--data-placement="top" title="请选择城市"-->
                                                        <!--v-if="order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'MAC' && order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'HKG' && order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'TWN'"-->
                                                        <!--v-model='order_to_form_widget.form.appntNewForm.contactDetailedAddress.city'>-->
                                                    <!--<option value="0">请选择城市</option>-->
                                                    <!--<option v-for='(item,index) in order_to_form_widget.form.appntNewForm.contactDetailedAddress.cities'-->
                                                            <!--:value="item.id" :key="index">-->
                                                        <!--{{item.name}}-->
                                                    <!--</option>-->
                                                <!--</select>-->
                                            <!--</div>-->
                                            <!--<div class="cleanSelectIcon ceshiAddress"-->
                                                 <!--v-if="order_to_form_widget.form.appntNewForm.contactDetailedAddress.city != '4420' && order_to_form_widget.form.appntNewForm.contactDetailedAddress.city != '4419'">-->
                                                <!--<select id="address3_userInfo" class="watch" data-toggle="tooltip"-->
                                                        <!--data-placement="top" title="请选择区县"-->
                                                        <!--v-if="order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'MAC' && order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'HKG' && order_to_form_widget.form.appntNewForm.contactDetailedAddress.province != 'TWN'"-->
                                                        <!--v-model='order_to_form_widget.form.appntNewForm.contactDetailedAddress.district'>-->
                                                    <!--<option value="0">请选择区县</option>-->
                                                    <!--<option v-for='(item,index) in order_to_form_widget.form.appntNewForm.contactDetailedAddress.districts'-->
                                                            <!--:value="item.id" :key="index">-->
                                                        <!--{{item.name}}-->
                                                    <!--</option>-->
                                                <!--</select>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="marginForTop" style="padding: 0">-->
                                            <!--<input maxlength="33" id="name_userInfo"-->
                                                   <!--v-model="order_to_form_widget.form.appntNewForm.contactDetailedAddress.detail | nullFilter"-->
                                                   <!--class="ceshiAddressDetail watch" data-toggle="tooltip" data-placement="top"-->
                                                   <!--title="请输入具体地址" placeholder="请输入具体地址"/>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div style="clear: both"></div>-->

                                <!--<div class="bottomPlugIn">-->
                                    <!--&lt;!&ndash;收益人&ndash;&gt;-->
                                    <!--<div class="col-xs-12 col-sm-12 death"-->
                                         <!--v-if="urlParams.order_type == 603 || urlParams.order_type == 605"-->
                                         <!--style="color:#595758;margin-bottom:1%;font-size: 14px;border-top: 2px dotted #ababac;padding-left: 0px">-->
                                        <!--<div class="col-xs-12 col-sm-2 center-list-left center-list-left-width">-->
                                            <!--身故保险金受益人-->
                                        <!--</div>-->
                                        <!--<div class="col-xs-9 col-sm-2 center-list-right center-list-right-icon" @click="showAlertTips">法定-->
                                        <!--</div>-->
                                    <!--</div>-->


                                    <!--&lt;!&ndash;居民身份声明&ndash;&gt;-->
                                    <!--<div class="col-xs-12 col-sm-12 death"-->
                                         <!--style="color:#595758;padding: 10px 0 0 0 ;margin-bottom:10px;font-size: 14px;border-top: 2px dotted #ababac">-->
                                        <!--<div class="center-list-right-icon2" @click="shuishouWhy">-->
                                            <!--投保人个人税收居民身份声明-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--&lt;!&ndash;选择身份&ndash;&gt;-->
                                    <!--<div class="col-xs-12 col-sm-12 residentFlagSelection" style="padding-left: 0">-->
                                        <!--<div class="col-xs-12 col-sm-2" style="padding: 0">-->
                                            <!--<input type="radio" name="insured0" id="t1" value="1" onclick=""-->
                                                   <!--v-model="order_to_form_widget.form.appntNewForm.taxIdentity.value">-->
                                            <!--<label class="i5Explain" for="t1"-->
                                                   <!--style="margin-left: 8px;cursor: pointer">仅为中国税收居民</label>-->
                                        <!--</div>-->
                                        <!--<div class="col-xs-12 col-sm-2 residetWith">-->
                                            <!--<input type="radio" name="insured0" id="t2" value="2" onclick=""-->
                                                   <!--v-model="order_to_form_widget.form.appntNewForm.taxIdentity.value">-->
                                            <!--<label class="i5Explain" for="t2"-->
                                                   <!--style="margin-left: 8px;cursor: pointer">仅为非居民</label>-->
                                        <!--</div>-->
                                        <!--<div class="col-xs-12 col-sm-6" style="padding: 0">-->
                                            <!--<input type="radio" name="insured0" id="t3" value="3" onclick=""-->
                                                   <!--v-model="order_to_form_widget.form.appntNewForm.taxIdentity.value">-->
                                            <!--<label class="i5Explain" for="t3" style="margin-left: 8px;cursor: pointer">既是中国税收居民又是其他国家（地区）税收居民</label>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div style="clear: both"></div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;被保人信息&ndash;&gt;-->
                    <!--<div class="home" v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value !='00'">-->
                        <!--&lt;!&ndash;被保险人信息&ndash;&gt;-->
                        <!--<div class="col-xs-12 col-sm-12 center-top center-top-border">-->
                            <!--<div class="titleImg1 ">-->
                                <!--被保险人信息-->
                                <!--&lt;!&ndash;<img class="" :attr="{src:@titleImg1}" alt="">&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="InputBorder">-->
                            <!--&lt;!&ndash;与投保人关系&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">与投保人关系</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="input-xlarge form-control" style="background-color: #eeeeee !important;">-->
                                    <!--<span v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value">-->
                                        <!--{{order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value | relationShipFilter}}-->
                                    <!--</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;被保险人姓名&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left name3">-->
                                    <!--<div>被保险人姓名</div>-->
                                <!--</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" maxlength="10" placeholder="请输入被保险人姓名" class="form-control watch"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].insuredName.value | nullFilter">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;证件类型&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">证件类型</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input readonly type="text" maxlength="11" class="form-control watch" value="身份证"-->
                                           <!--v-if="!order_to_form_widget.form.insuredNewListForm[0].insuredIdtype.visible">-->
                                    <!--<div class="cleanSelectIcon"-->
                                         <!--v-if="order_to_form_widget.form.insuredNewListForm[0].insuredIdtype.visible">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model="order_to_form_widget.form.insuredNewListForm[0].insuredIdtype.value">-->
                                            <!--<option v-for='(item,index) in candidateArrays.icTypes' :value="item.key" :key="index">-->
                                                <!--{{item.value}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;证件号码&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">证件号码</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" class="form-control watch" placeholder="请输入被保险人证件号码"-->
                                           <!--:id="order_to_form_widget.form.insuredNewListForm[0].insuredIdno.id+'_0'"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].insuredIdno.value | nullFilter | ic_numberFilter | change"-->
                                           <!--maxlength="18">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;证件有效期&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list marginForTop">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left" for="datetimepicker">证件有效期</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div :class="order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value == 1 ? 'box1' : 'box2'"-->
                                         <!--onclick="" @click="myOrder_ic_is_long_valid_change(1)"-->
                                         <!--style="display: inline-block;width: 25%;cursor: pointer;text-align: center;float: left;margin-right: 5px">-->
                                        <!--<div>长期</div>-->
                                    <!--</div>-->
                                    <!--<div :class="(order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value === 0 || order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value === '0') ? 'box1' : 'box2'"-->
                                         <!--@click="myOrder_ic_is_long_valid_change(0)"-->
                                         <!--style="position: relative;display: inline-block;width: 72%;cursor: pointer;position: relative;">-->
                                        <!--<div style="float: left;margin-left: 5px">至</div>-->
                                        <!--<div class="positionLine"></div>-->
                                        <!--&lt;!&ndash; <div class="dateinput" style="position: absolute;top: 0;right:0;width: 80%"-->
                                         <!--v-show="@order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value == 1">-->
                                        <!--<input class="form-control watch  datetimepicker" value="2000-01-01" type="text"-->
                                               <!--style="background-color: transparent;color: #FFFFFF;border: none;margin-top: 0;text-align: center;cursor: pointer"-->
                                               <!--placeholder="请选择" data-toggle="tooltip"-->
                                               <!--data-placement="top" title="请选择"-->
                                               <!--v-model="@order_to_form_widget.form.insuredNewListForm[0].idExpDate.value| dataTimeFilter |nullFilter"-->
                                               <!--readonly/>-->
                                    <!--</div> &ndash;&gt;-->
                                        <!--<div class="dateinput" style="position: absolute;top: 0;right:0;width: 80%"-->
                                             <!--v-show="(order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value === 0 || order_to_form_widget.form.insuredNewListForm[0].idIsLongValid.value === '0')">-->
                                            <!--<input class="form-control watch  datetimepicker" value="2000-01-01" type="text"-->
                                                   <!--:startDate="order_to_form_widget.form.insuredNewListForm[0].idExpDate.start"-->
                                                   <!--:endDate="order_to_form_widget.form.insuredNewListForm[0].idExpDate.end"-->
                                                   <!--style="background-color: transparent;color: #FFFFFF;border: none;margin-top: 0;text-align: center"-->
                                                   <!--id="datetimepicker3" placeholder="请选择" data-toggle="tooltip"-->
                                                   <!--data-placement="top"-->
                                                   <!--title="请选择"-->
                                                   <!--v-model="order_to_form_widget.form.insuredNewListForm[0].idExpDate.value| dataTimeFilter |nullFilter"-->
                                                   <!--readonly/>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;性别&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left marginTop">性别</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--&lt;!&ndash;<div class="cleanSelectIcon">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<select class="input-xlarge form-control watch " v-model="@order_to_form_widget.form.insuredNewListForm[0].insuredSex.value">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<option v-for='((item,index)) in @candidateArrays.genders' :attr="{value:@item.key}">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{@item.value}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;</option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</select>&ndash;&gt;-->


                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                    <!--<div class="form-control watch" readonly>-->
                                        <!--{{order_to_form_widget.form.insuredNewListForm[0].insuredSex.value | genderFilter}}-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;出生日期&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">出生日期</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control watch"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].insuredBirthday.value | nullFilter"-->
                                           <!--readonly>-->

                                    <!--&lt;!&ndash;<input type="text" v-show="@order_to_form_widget.form.insuredNewListForm[0].insuredIdtype.value != 'I'"&ndash;&gt;-->
                                    <!--&lt;!&ndash;class="form-control watch background_white userbirthday datetimepicker" &ndash;&gt;-->
                                    <!--&lt;!&ndash;:attr="{startDate:@order_to_form_widget.form.insuredNewListForm[0].insuredBirthday.start,endDate:@order_to_form_widget.form.insuredNewListForm[0].insuredBirthday.end}"&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-model="@order_to_form_widget.form.insuredNewListForm[0].insuredBirthday.value | nullFilter"&ndash;&gt;-->
                                    <!--&lt;!&ndash;data-date-format="dd-mm-yyyy" readonly>&ndash;&gt;-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;婚姻状态&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list center-list2 marginForTop"-->
                                 <!--v-show="order_to_form_widget.form.insuredNewListForm[0].marriage.visible">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left" style="">婚姻状态</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="form-control watch"-->
                                         <!--:class="(order_to_form_widget.form.insuredNewListForm[0].marriage.value == '2' ? 'gendersMain2':'gendersMain')"-->
                                         <!--@click="myOrder_maritalStatusChange(2)"-->
                                         <!--style="margin-right: 10%;height: 34px;padding: 6px 12px;cursor: pointer;">-->
                                        <!--已婚-->
                                    <!--</div>-->

                                    <!--<div class=" form-control watch" style="height: 34px;padding: 6px 12px;cursor: pointer;"-->
                                         <!--:class="(order_to_form_widget.form.insuredNewListForm[0].marriage.value == '7' ? 'gendersMain2':'gendersMain')"-->
                                         <!--@click="myOrder_maritalStatusChange(7)">-->
                                        <!--单身-->
                                    <!--</div>-->
                                    <!--<div style="clear: both"></div>-->
                                <!--</div>-->
                            <!--</div>-->

                            <!--&lt;!&ndash;国籍&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left center-list-top">国籍</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon"-->
                                         <!--v-if="order_to_form_widget.form.insuredNewListForm[0].nativePlace.visible">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model="order_to_form_widget.form.insuredNewListForm[0].nativePlace.value">-->
                                            <!--<option v-for="(item, index) in candidateArrays.nationalities"-->
                                                    <!--:value="item.id" :key="index">{{item.cn}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->

                                    <!--<input readonly type="text" maxlength="11" class="form-control watch" value="中国"-->
                                           <!--v-if="!order_to_form_widget.form.insuredNewListForm[0].nativePlace.visible">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;年收入&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list ">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">个人年收入</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="tel" id="AnnualIncome" class="form-control watch"-->
                                           <!--style="width: 80%;display: inline-block"-->
                                           <!--maxlength="5"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].personalIncome.value | nullFilter"-->
                                           <!--placeholder="请输入">-->
                                    <!--<span style="margin-left: 3%">万元</span>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;职业类别&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">职业类别</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<div class="cleanSelectIcon">-->
                                        <!--<select class="input-xlarge form-control watch "-->
                                                <!--v-model='order_to_form_widget.form.insuredNewListForm[0].occupationCode.value'-->
                                                <!--style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">-->
                                            <!--<option value="0">请选择</option>-->
                                            <!--<option v-for='(item,index) in candidateArrays.careers' :value="item.key" :key="index">-->
                                                <!--{{item.value | nullFilter}}-->
                                            <!--</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;被保险人手机号码&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">手机号码</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" class="form-control watch" placeholder="请输入被保险人手机号码"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].mobilePhoneNumber.value | nullFilter"-->
                                           <!--maxlength="11">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;邮箱地址&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left ">邮箱地址</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value == '00'"-->
                                           <!--type="text" class="form-control watch" placeholder="请输入家属邮箱地址"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].email.value | nullFilter | emailFilter"-->
                                           <!--maxlength="50">-->
                                    <!--<input v-if="order_to_form_widget.form.insuredNewListForm[0].relationToAppnt.value != '00'"-->
                                           <!--type="text" class="form-control watch" placeholder="请输入被保险人邮箱地址"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].email.value | nullFilter | emailFilter"-->
                                           <!--maxlength="50">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;现工作单位或现就读学校名称&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-md-4 col-sm-6 center-list"-->
                                 <!--v-if="order_to_form_widget.form.insuredNewListForm[0].companyOrSchool.visible">-->
                                <!--<div class="col-xs-3 col-sm-4 center-list-left">单位或学校</div>-->
                                <!--<div class="col-xs-9 col-sm-8 center-list-right">-->
                                    <!--<input type="text" class="form-control watch" maxlength="33" placeholder="请输入"-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].companyOrSchool.value | nullFilter">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;联系地址&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-sm-12 address_select"-->
                                 <!--v-if="order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.visible">-->
                                <!--<div class="col-xs-12 col-sm-2 center-list-left addressWidth">联系地址</div>-->
                                <!--<div class="col-xs-12 col-sm-10 center-list-right center-list-right2"-->
                                     <!--style="padding-left: 1.4%">-->
                                    <!--<div class="" style="padding: 5px 0 0 0;">-->
                                        <!--<div class="cleanSelectIcon ceshiAddress">-->
                                            <!--<select id="address1" class="watch"-->
                                                    <!--v-model='order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province'-->
                                                    <!--data-toggle="tooltip" data-placement="top" title="请选择省份">-->
                                                <!--<option value="0">请选择省份</option>-->
                                                <!--<option v-for='(item,index) in order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.provinces'-->
                                                        <!--:value="item.id" :key="index">-->
                                                    <!--{{item.name}}-->
                                                <!--</option>-->
                                            <!--</select>-->
                                        <!--</div>-->
                                        <!--<div class="cleanSelectIcon ceshiAddress">-->
                                            <!--<select id="address2" data-toggle="tooltip" data-placement="top" title="请选择城市"-->
                                                    <!--class="watch"-->
                                                    <!--v-if="order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'MAC' && order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'HKG' && order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'TWN'"-->
                                                    <!--v-model='order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.city'>-->
                                                <!--<option value="0">请选择城市</option>-->
                                                <!--<option v-for='(item,index) in order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.cities'-->
                                                        <!--:value="item.id">-->
                                                    <!--{{item.name}}-->
                                                <!--</option>-->
                                            <!--</select>-->
                                        <!--</div>-->
                                        <!--<div class="cleanSelectIcon ceshiAddress"-->
                                             <!--v-if="order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.city != 4420 && order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.city != 4419">-->
                                            <!--<select id="address3" data-toggle="tooltip" data-placement="top" title="请选择区县"-->
                                                    <!--class="watch"-->
                                                    <!--v-if="order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'MAC' && order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'HKG' && order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.province != 'TWN'"-->
                                                    <!--v-model='order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.district'>-->
                                                <!--<option value="0">请选择区县</option>-->
                                                <!--<option v-for='(item,index) in order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.districts'-->
                                                        <!--:value="item.id" :key="index">-->
                                                    <!--{{item.name}}-->
                                                <!--</option>-->
                                            <!--</select>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="" style="padding: 0">-->
                                        <!--<input maxlength="33" id="name"-->
                                               <!--v-model="order_to_form_widget.form.insuredNewListForm[0].contactDetailedAddress.detail | nullFilter"-->
                                               <!--class="ceshiAddressDetail watch" data-toggle="tooltip" data-placement="top"-->
                                               <!--title="请输入具体地址" placeholder="请输入具体地址"/>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div style="clear: both"></div>-->
                            <!--</div>-->
                            <!--<div style="clear: both"></div>-->
                        <!--</div>-->
                        <!--<div style="clear: both"></div>-->

                        <!--<div class=" bottomPlugIn1">-->


                            <!--&lt;!&ndash;收益人&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-sm-12 death"-->
                                 <!--v-if="urlParams.order_type == 603 || urlParams.order_type == 605"-->
                                 <!--style="color:#595758;margin-bottom:1%;font-size: 14px;border-top: 2px dotted #ababac;padding-left: 0px">-->
                                <!--<div class="col-xs-12 col-sm-2 center-list-left center-list-left-width">-->
                                    <!--身故保险金受益人-->
                                <!--</div>-->
                                <!--<div class="col-xs-9 col-sm-2 center-list-right center-list-right-icon" onclick=""-->
                                     <!--:click="showAlertTips">法定-->
                                <!--</div>-->
                            <!--</div>-->


                            <!--&lt;!&ndash;居民身份声明&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-sm-12 death"-->
                                 <!--style="color:#595758;padding: 10px 0 0 0 ;margin-bottom:1%;font-size: 14px;border-top: 2px dotted #ababac">-->
                                <!--<div class="center-list-right-icon2" @click="shuishouWhy">-->
                                    <!--被保险人个人税收居民身份声明-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;选择身份&ndash;&gt;-->
                            <!--<div class="col-xs-12 col-sm-12 residentFlagSelection" style="padding-left: 0">-->
                                <!--<div class="col-xs-12 col-sm-2" style="padding: 0">-->
                                    <!--<input type="radio" name="insured" id="t10" value="1" onclick=""-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].taxIdentity.value">-->
                                    <!--<label class="i5Explain" for="t10" style="margin-left: 8px;cursor: pointer">仅为中国税收居民</label>-->
                                <!--</div>-->
                                <!--<div class="col-xs-12 col-sm-2 residetWith">-->
                                    <!--<input type="radio" name="insured" id="t20" value="2" onclick=""-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].taxIdentity.value">-->
                                    <!--<label class="i5Explain" for="t20" style="margin-left: 8px;cursor: pointer">仅为非居民</label>-->
                                <!--</div>-->
                                <!--<div class="col-xs-12 col-sm-6" style="padding: 0">-->
                                    <!--<input type="radio" name="insured" id="t30" value="3" onclick=""-->
                                           <!--v-model="order_to_form_widget.form.insuredNewListForm[0].taxIdentity.value">-->
                                    <!--<label class="i5Explain" for="t30" style="margin-left: 8px;cursor: pointer">既是中国税收居民又是其他国家（地区）税收居民</label>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
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
