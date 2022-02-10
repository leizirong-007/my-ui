<template>
  <div class="my-input">
    <!-- iconfont icon-guding -->
    <span v-if="iconLeft" :class="[iconLeft, 'my-input__icon', 'my-input__icon__left']"></span>
    <input
      @input="handleInput"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="['my-input__inner', disabled ? 'is--disabled' : 'my-input__inner__default']"
      :style="{ paddingLeft: iconLeft ? '30px' : '8px', paddingRight: iconRight || clearable || showPassword ? '30px' : '8px' }"
      :value="value"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
    />
    <span v-if="iconRight" :class="[iconRight, 'my-input__icon', 'my-input__icon__right']"></span>
    <span v-if="clearable && value" class="my-input__suffix">
      <i @click="clear" class="my-ui-x-iconfont icon-act_qingchu"></i>
    </span>
    <span v-if="showPassword" class="my-input__suffix">
      <i @click="passwordVisible = !passwordVisible" class="my-ui-x-iconfont icon-kejian"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordVisible: false
    }
  },
  methods: {
    handleInput(e) {
      if (this.disabled) return
      this.$emit('input', e.target.value)
    },
    clear() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang='less' scoped>
.my-input {
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  height: 32px;
  position: relative;
  .is--disabled {
    background-color: #f3f3f3;
    opacity: 1;
    cursor: not-allowed;
    color: #fff;
  }
  &__suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    cursor: pointer;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      padding: 2px;
      &:hover {
        color: #888;
      }
    }
  }
  &__inner {
    height: 100%;
    width: 100%;
    border: 1px solid #dcdee2;
    transition: opacity 0.2s linear, border 0.2s linear,
      background-color 0.2s linear, color 0.2s linear;
    border-radius: 4px;
  }
  &__inner__default:focus {
    border: 1px solid #3779e7;
  }
  &__icon {
    position: absolute;
    top: 0;
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #aaa;
  }

  &__icon__left {
    left: 0;
  }
  &__icon__right {
    right: 0;
  }
}
</style>