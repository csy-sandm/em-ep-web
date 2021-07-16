import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Photoshop } from 'vue-color'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  axios,
  components: {
    'photoshop-picker': Photoshop
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
