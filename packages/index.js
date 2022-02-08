import MyDialig from './My-dialog/index'
import '../packages/fonts/iconfont.css'
import '../packages/style/base.css'
import '../packages/style/common.css'


const components = [
  MyDialig
]

const install = function (Vue) {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}