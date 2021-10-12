import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Photoshop } from 'vue-color'
// import BaiduMap from 'vue-baidu-map'
import AMap from 'vue-amap'

Vue.use(ElementUI)
Vue.config.productionTip = false

// Vue.use(BaiduMap, {
//  // ak: 'a1tl83G4u8bRdzoR3ZsDtvOLqUuELfmd' //  在此输入你自己的百度地图ak
//  ak: 'jwsn9UCQ9I4AyKeF7rM0pyphQlpZhteE'
// }) // 引入echarts

Vue.use(AMap);

AMap.initAMapApiLoader({
  // 高德key
  key: 'a345d6e1947011601f4f68d17de7b0e4',
});

new Vue({
  axios,
  components: {
    'photoshop-picker': Photoshop
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
