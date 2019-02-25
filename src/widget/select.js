var CentralWidget = require('./CentralWidget');

var select = $.extend({}, CentralWidget, { //这是一个类，用 new 关键字实例化放到vm的 form 上
    type: 'select', //组件的类别，用于service层动态对比配置进行实例化
    candidateArray: [],
    setCandidateArray: function (candidateArray) { //设置候选数组。如果已选值不在候选值中，取默认值
        var that = this;
        that.candidateArray = candidateArray;
        that.fix()
    },
    fix: function () { //自动修复，防止已选项不在候选项中
        var that = this;
        var candidateArray = that.candidateArray;
        var isValueInCandidateArray = false;
        //如果已选值不在候选值中，重置选项为空
        for (var i = 0; i < candidateArray.length; i++) {
            var item = candidateArray[i];
            if (item['key'] && item.key == that.value) {
                isValueInCandidateArray = true;
            }
            if (item['id'] && item.id == that.value) {
                isValueInCandidateArray = true;
            }
            // if (that.selectValue == item.key) {
            //     if (item.value != '其他') {
            //         that.inputValue = item.value;
            //     } else {
            //         that.inputValue = ''
            //         if (that.inputValue == '其他' || that.inputValue == '请选择职级') {
            //             that.inputValue = ''
            //         }
            //     }
            // }

        }


        if (!isValueInCandidateArray) {
            if (that.defaultValue) {
                that.value = that.defaultValue;
            } else {
                that.value = ""
            }
        }
        // that.value = value;
        console.log(that.value + ':执行了fix操作')
    },
    fixNoExistInArray:function(index){
        var that = this;
        var flag = true;
        var _index = index?index:0;
        for(var x in that.candidateArray){
            if(that.value == that.candidateArray[x].key){
                flag = false;
            }
        }
        if(flag){
            that.value = that.candidateArray[_index].key;
        }
    }
});


module.exports = select;
