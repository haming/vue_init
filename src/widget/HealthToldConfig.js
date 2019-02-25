var config = require('./config'); //引入config，
var HealthToldConfig = {
    "HealthQuestion" : {  //问题配置

    }
};

HealthToldConfig = $.extend({}, config, HealthToldConfig); //继承config
module.exports = HealthToldConfig;

