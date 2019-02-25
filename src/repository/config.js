/**
 * Created by brave on 17/3/28.
 */

var urlUtil = function (url) {
    var splitedUrl = url.split("?")
    var object = {}
    if (splitedUrl[1]) {
        var splitedParams = splitedUrl[1].split("&");
        for (var i = 0; i < splitedParams.length; i++) {
            var param = splitedParams[i].split("=");
            if (param[0]) {
                object[param[0]] = param[1];
            }
        }
    }
    return object;
};
var urlParams = urlUtil(window.location.href)

var env = NODE_ENV;
var envHost = ENV_HOST;
var source = urlParams.source;
var serverUrl = '/gis_server';
var lifeTimeInsurancePeriod = 100;//终生保险起期间
var object = {
    urlParams: urlParams,
    singleProduct: false,
    project: 'xyb',
    order_type: 701,//默认个别产品代号
    source: urlParams.source,
    companyName: '招银网络科技有限公司',
    // noLoginTips: '您尚未登录，请从' + "招银网络科技有限公司" + '内部平台重新登录',
    lifeTimeInsurancePeriod: lifeTimeInsurancePeriod,
    companyShortName: '招银网络科技有限公司',
    envHost: envHost,
    env: env,
    serverUrl: serverUrl,
    host: '',//项目主机
    loginCodeUrl: serverUrl + '/' + env + '/getAuthImage',//上传文件的主机ip及相对路径
    payUrl: 'http://esales-old.test-cignacmb.com/payment-uat1/index.xhtml',//上传文件的主机ip及相对路径
    appName: serverUrl + '/' + env + '/op',//项目接口appName
    payAppName: serverUrl + '/' + env,//用于支付成功回调页获取列表appName
    uploadFileAppName: serverUrl + '/' + env + '/file/' + source,//项目接口appName
    notifyConfirmUrl: serverUrl + '/' + env + '/notifyConfirm?source=' + source,//项目下载投保确认书路径
    downLoadBodyCheckUrl: serverUrl + '/' + env + '/downLoadBodyCheckNew?source=' + source,//项目下载投保确认书路径
    downloadConfirmUrl: serverUrl + '/' + env + '/downloadConfirm?source=' + source,//项目下载投保确认书路径
    previewDownloadFileUrl: serverUrl + '/' + env + '/downLoadBodyCheckNew?source=' + source,//项目下载投保确认书路径
    notLoginRedirectUrl: serverUrl + '/' + env + '/opr/' + source + '/userIdentification',//项目下载投保确认书路径
    token: 'cmbntKeyTest',
    backendUrl: serverUrl + "/" + env + "/faceNew/",
    backendUrl2: serverUrl + "/" + env
};
if (env == 'sit' || env == 'sit2') {
    object.payUrl = 'http://esales-old.test-cignacmb.com/payment-uat2/index.xhtml';
    object.faceMatchingUrl = 'https://member-uat.test-cignacmb.com/support/validateVideo';//人脸识别url
    object.faceMatchingConfirmItemsUrlPrefix = 'http://hms-uat.test-cignacmb.com/igi/';//人脸识别url
}
if (env == 'uat' || env == 'uat2') {
    object.payUrl = 'http://esales-old.test-cignacmb.com/payment-uat2/index.xhtml';
    object.faceMatchingUrl = 'https://member-uat.test-cignacmb.com/support/validateVideo';//人脸识别url
    object.faceMatchingConfirmItemsUrlPrefix = 'http://hms-uat.test-cignacmb.com/igi/';//人脸识别url
}
if (env == 'prd') {
    object.notLoginRedirectUrl = serverUrl + '/' + env + '/opr/' + source + '/userIdentification';
    object.faceMatchingUrl = 'https://member.cignacmb.com/support/validateVideo'; //人脸识别url
    object.faceMatchingConfirmItemsUrlPrefix = 'https://igi.cignacmb.com/';//人脸识别url
}
module.exports = object;
