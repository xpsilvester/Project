import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import Mint from 'mint-ui';

import 'mint-ui/lib/style.css';

Vue.use(VueRouter);
Vue.use(Mint);


// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});

/* eslint-disable no-new */
new Vue({
    router
}).$mount('#app');