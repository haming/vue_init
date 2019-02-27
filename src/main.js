// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';

require('./bower_components/deferred');

Vue.config.productionTip = false;
Vue.prototype.$ajax=axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
})

