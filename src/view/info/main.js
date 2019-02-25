// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import info from './info'
import common from '../../common/common'
// import filter from '../../service/filter'
Vue.config.productionTip = false
Vue.use(common)
/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    components: {info},
    template: '<info/>'
});
