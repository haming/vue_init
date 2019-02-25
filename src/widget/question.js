var CentralWidget = require('./CentralWidget');

var question = $.extend({}, CentralWidget, {
    type: 'question', //组件的类别，用于service层动态对比配置进行实例化
    impartCode: "",
    impartResult: '',
    questionObject: [],
    insuredseqNo: '1',

    id: parseInt(Math.random() * 10000000000),
    title: '',
    content: '',

    setId: function () {

    },
    setValue: function (question) { //设置值

        console.log("setValue:", question)

        var that = this;
        var split = question.impartParammodle.split('/');
        that.questionObject = [];
        for (var i = 0; i < split.length; i++) {
            var item = split[i];
            var object = {value: item, id: parseInt(Math.random() * 10000000000)}
            that.questionObject.push(object)
        }

        that.impartCode = question.impartCode;
        that.impartResult = question.impartResult;
        // that.value = value;
    },
    getValue: function () { //获取值
        var that = this;

        var question = { //健康告知信息
            impartCode: '1',
            impartParammodle: '',
            impartResult: '0',
            insuredseqNo: that.insuredseqNo
        };

        question.impartCode = that.impartCode;
        question.impartResult = that.impartResult;
        question.impartParammodle = '';
        for (var i = 0; i < that.questionObject.length; i++) {
            var item = that.questionObject[i];
            if (i == (that.questionObject.length - 1)) {
                question.impartParammodle = question.impartParammodle + item.value
            } else {
                question.impartParammodle = question.impartParammodle + item.value + "/"
            }
        }
        return question;
    },
    fix: function () {
        var that = this;
        console.log(that.questionObject)
        for (var i = 0; i < that.questionObject.length; i++) {
            if(that.impartResult == "0"){
                that.questionObject[i].value = ""
            }
        }
    },

});


module.exports = question;
