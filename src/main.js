// Created by Zhu Jie 2017302580305

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
