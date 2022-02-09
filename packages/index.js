import MyDialig from './My-dialog/index'
import MyButton from './My-button/index'
import MyInput from './My-input/index'
import './fonts/iconfont.css'
import './style/base.css'
import './style/joyfulCss.css'


const components = [
  MyDialig,
  MyButton,
  MyInput,
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