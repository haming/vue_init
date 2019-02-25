/**
 * Created by brave on 17/3/28.
 */

var config = require('./config');

// require('../res_component/loading/index');
//
// function showLoading() {
//     if (window.loading) {
//         window.loading.open();
//     }
// }
//
// function hideLoading() {
//     if (window.loading) {
//         window.loading.close();
//     }
// }

var object = {
    post: function (interfaceName, data) {
        var deferred = $.Deferred();
        // showLoading();
        $.ajax({
            url: config.host + config.appName + "/" + interfaceName,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                // hideLoading();
                deferred.resolve(data);
            },
            error: function (res, error) {
                // hideLoading();
                // alertModal.open('网络请求失败，请刷新重试');
                deferred.reject('网络请求失败，请刷新重试');
            }
        });
        return deferred
    },
    postFile: function (interfaceName, data) {
        var deferred = $.Deferred();
        showLoading();
        // var url = config.backendUrl + interfaceName;
        var url = config.host + config.appName + "/" + interfaceName;
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            timeout: 5000,
            complete: function () {
                $('#loading').hide();
            }
        }).done(function (data) {
            alert("success")
        }).fail(function (data) {
            alert("error")
        });
        return deferred
    },
    postFile2: function (interfaceName, data) {
        var deferred = $.Deferred();
        showLoading();
        var url = config.backendUrl + interfaceName;
        // var url = config.host + config.appName + "/" + interfaceName;
        console.log(url)
        $.ajax({
            url: url,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                hideLoading();
                console.log(data)
                deferred.resolve(data);
            },
            error: function (res, error) {
                hideLoading();
                deferred.reject(res);
            }
        });
        return deferred
    },
    postToNoLoading: function (interfaceName, data) {
        var deferred = $.Deferred();
        $.ajax({
            url: config.host + config.appName + "/" + interfaceName,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (res, error) {
                alertModal.open('系统请求超时');
                deferred.reject(res);
            }
        });
        return deferred
    }
};


module.exports = object;
