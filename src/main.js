import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 添加事件总线（Vue 实例可以作为事件总线）
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
