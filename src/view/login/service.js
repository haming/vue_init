import '../../common/common';
import Warehouse from './Warehouse';



var service = {


    userLogin: function () {
        var deferred = Deferred();
        var interfaceName = 'userLogin';
        var data = Warehouse.data.userInfo;
        $.ajax({
            url: '/gis_server/uat/service/pension/' + interfaceName,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log('success');
                deferred.resolve(data)
            },
            error: function (res, error) {
                console.log('error');
                deferred.reject(error)
            }
        });
        return deferred.promise
    },
    getProductInfo: function () {
        var deferred = Deferred();
        var interfaceName = 'getProductInfo';
        var data = {
            organization_id: "zzrs",
            order_type: "801",
            source: "pension"
        };
        $.ajax({
            url: '/gis_server/uat/service/pension/' + interfaceName,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log('success');
                deferred.resolve(data)
            },
            error: function (res, error) {
                console.log('error');
                deferred.reject(error)
            }
        });
    },
    demoInput: function () {
        var deferred = Deferred();
        setTimeout(function () {
            console.log(1);
            deferred.resolve()
        }, 1000);
        return deferred.promise;
    },
    demoInput01: function () {
        var deferred = Deferred();
        console.log(2);
        deferred.resolve();
        return deferred.promise;
    },
    change_input: function () {
        service.demoInput()
            .then(function () {
                return service.demoInput01();
            })
    }
};

module.exports = service;
