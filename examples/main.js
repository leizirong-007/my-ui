import Vue from 'vue'
import App from './App.vue'
import MyUi from '../packages/index'
import '../packages/style/iconfonts/iconfont.css'
import '../packages/style/css/base.css'
import '../packages/style/css/common.css'

Vue.config.productionTip = false
Vue.use(MyUi)
new Vue({
  render: h => h(App),
}).$mount('#app')
