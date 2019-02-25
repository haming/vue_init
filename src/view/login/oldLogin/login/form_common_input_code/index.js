require('./index.css');

avalon.component('ms-form-common-input-code', {
    template: require('./index.html'),
    defaults: {
        codeUrl: '',
        maxlength: '',
        type: 'tel',
        placeholder: '',
        code: '',
        inputValue: '',
        changeCode: function () {
            // this.codeUrl = this.codeUrl + '?token=' + parseInt(Math.random() * 100000);
        },
        onInputChanged: function (v) {
            console.log("数据加载中");

        },
        verificationCode: function () {
            console.log("数据加完成");
        },
        onReady: function () {
            console.log('WIDGET:login:onReady()');

            this.$watch("code", function observe(newV, oldV) {
                this.onInputChanged(newV);
            });

        }
    }
});



