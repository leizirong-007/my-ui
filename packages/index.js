import './style/base.css'
import './fonts/iconfont.css'
import MyDialig from './My-dialog/index'
import MyButton from './My-button/index'
import MyInput from './My-input/index'
import MyRadio from './My-radio/index'
import MyRadioGroup from './My-radio-group/index'
import MySwitch from './My-switch/index'
import MyCheckbox from './My-checkbox/index'
import MyCheckboxGroup from './My-checkbox-group/index'



const components = [
  MyDialig,
  MyButton,
  MyInput,
  MyRadio,
  MyRadioGroup,
  MySwitch,
  MyCheckbox,
  MyCheckboxGroup,
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