var CentralWidget = require('./CentralWidget');

var input = $.extend({}, CentralWidget, {
    type: 'input', //组件的类别，用于service层动态对比配置进行实例化
    historyValue:'',
});


module.exports = input;
