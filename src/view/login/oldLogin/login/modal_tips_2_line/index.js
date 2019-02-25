/**
 * Created by brave on 17/3/28.
 */

require('./index.css');

avalon.component('ms-modal-tips-2-line', {
    defaults: {
        title: '系统提示',
        content1: '默认值',
        content2: '默认值',
        cancel: '',
        confirm: '确认',
        isShowModal: false,
        closeCallback: function () {
            console.log('关闭回调带没有绑定');
        },
        modal_confirm: function () {
            this.isShowModal = false;
            this.closeCallback();
        },
        modal_cancel: function () {
            this.isShowModal = false;
        },
        open: function (text1, text2, callback) {
            this.content1 = text1;
            this.content2 = text2;
            this.isShowModal = true;
            if (callback) {
                this.closeCallback = callback;
            }
        },
        onInit: function () {
            this.modalWidth = document.documentElement.clientWidth;
            this.modalHeight = document.documentElement.clientHeight;
        },
        onReady: function () {
            console.log('WIDGET:alert:onReady()');
            window.alertModal_2line = this;
        }

    },
    template: require('./index.html')
});

