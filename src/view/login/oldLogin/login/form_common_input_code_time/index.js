require('./index.css');

avalon.component('ms-form-common-input-code-time', {
    template: require('./index.html'),
    defaults: {
        codeUrl: '',
        maxlength: '',
        type: 'tel',
        placeholder: '',
        code: '',
        inputValue: '',
        code_times:0,
        code_time:false,
        changeCode: function () {
            // this.codeUrl = this.codeUrl + '?token=' + parseInt(Math.random() * 100000);
        },
        onInputChanged: function (v) {
            console.log("数据加载中");
        },
        verificationCode: function () {
            console.log("数据加完成");
        },
        code_timechange:function () {
            if(this.code_times > 0){
                console.log(this.code_times);
                this.code_times --;
                setTimeout(this.code_timechange(),1000)
            }
        },
        onReady: function () {
            console.log('WIDGET:login:onReady()');
            this.$watch("code", function observe(newV, oldV) {
                this.onInputChanged(newV);
            });

        }
    }
});



