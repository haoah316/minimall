import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 利用原型创建事件总线$bus，监听事件
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
