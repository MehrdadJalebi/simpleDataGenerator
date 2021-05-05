import Vue from 'vue'
import App from './App.vue'
import globalMixin from './mixins/global'
import router from './router'


Vue.config.productionTip = false
Vue.mixin(globalMixin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
