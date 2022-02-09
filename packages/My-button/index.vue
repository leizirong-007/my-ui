<template>
  <button :class="['my-button', disabled ? 'is--disabled' : '']" @click="handleClick">
    <!-- iconfont icon-guding -->
    <span v-if="iconLeft" :class="[iconLeft, 'my-button--icon']"></span>
    <span :class="[iconMiddle, 'my-button--icon', 'my-button--icon--middle']">
      <slot></slot>
    </span>
    <span v-if="iconRight" :class="[iconRight, 'my-button--icon']"></span>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    iconLeft: {
      type: String,
      default: ''
    },
    iconMiddle: {
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
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return
      this.$emit('click', e)
    }
  },
}
</script>

<style lang='less' scoped>
.my-button {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #dcdee2;
  background-color: #fff;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 32px;
  transition: opacity 0.2s linear, border 0.2s linear,
    background-color 0.2s linear, color 0.2s linear;
  padding: 0 10px;
  border-radius: 4px;
  &--icon {
    vertical-align: middle;
  }
  &--icon--middle {
    margin: 5px;
  }
}
.is--disabled {
  cursor: not-allowed;
  color: #c5c8ce;
  background-color: #f7f7f7;
  border-color: #dcdee2;
}
</style>