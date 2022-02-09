<template>
  <div class="my-input">
    <!-- iconfont icon-guding -->
    <span v-if="iconLeft" :class="[iconLeft, 'my-input--icon', 'my-input--icon--left']"></span>
    <input
      @input="handleInput"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="['my-input--inner', disabled ? 'is--disabled' : '']"
      :style="{ paddingLeft: iconLeft ? '30px' : '8px', paddingRight: iconRight ? '30px' : '8px' }"
      :value="value"
    />
    <span v-if="iconRight" :class="[iconRight, 'my-input--icon', 'my-input--icon--right']"></span>
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
    }
  },
  methods: {
    handleInput(e) {
      if (this.disabled) return
      this.$emit('input', e.target.value)
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
  &--inner {
    height: 100%;
    width: 100%;
    border: 1px solid #dcdee2;
    transition: opacity 0.2s linear, border 0.2s linear,
      background-color 0.2s linear, color 0.2s linear;
    border-radius: 4px;
  }
  &--icon {
    position: absolute;
    top: 0;
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  &--icon--left {
    left: 0;
  }
  &--icon--right {
    right: 0;
  }
}
</style>