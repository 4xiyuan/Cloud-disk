import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios' 
import uploader from 'vue-simple-uploader'
import Contextmenu from "vue-contextmenujs"


axios.defaults.baseURL = '/api' //关键代码
Vue.config.productionTip = false


// axios.defaults.transformRequest = [function (data) {
// 	let src = ''
// 	for (let item in data) {
// 		src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
// 	}
// 	return src
// }]

// 配置一个 axios 实例
// const http = axios.create({
// 	baseURL: '/api',
// 	timeout: 30000,
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
		
// 	}
// });
Vue.prototype.$bus = new Vue();

Vue.prototype.setSessionItem = function (key, newVal) {
  // 创建 StorageEvent 事件
  let newStorageEvent = document.createEvent("StorageEvent");
  const storage = {
    setItem: function (k, val) {
      sessionStorage.setItem(k, val);

      // 初始化 StorageEvent 事件
      newStorageEvent.initStorageEvent(
        "setItem", // 事件别名
        false,
        false,
        k,
        null,
        val,
        null,
        null
      );

      // 派发事件
      window.dispatchEvent(newStorageEvent);
    },
  };
  return storage.setItem(key, newVal);
};

Vue.use(uploader)
Vue.use(ElementUI)
Vue.use(Contextmenu)
// Vue.prototype.$http = http;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
