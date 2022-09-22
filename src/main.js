import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios' 

axios.defaults.baseURL = '/api' //关键代码
Vue.config.productionTip = false


axios.defaults.transformRequest = [function (data) {
	let src = ''
	for (let item in data) {
		src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
	}
	return src
}]

// 配置一个 axios 实例
const http = axios.create({
	baseURL: '/api',
	timeout: 30000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		
	}
});
Vue.use(ElementUI);

Vue.prototype.$http = http;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
