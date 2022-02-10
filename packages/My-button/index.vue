<template>
  <button
    :class="[
      'my-button', disabled ? 'is--disabled' : '',
      type == 'text' ? 'my-button__text' : '',
      disabled || type == 'text' ? '' : 'my-button__default'
    ]"
    @click="handleClick"
  >
    <!-- iconfont icon-guding -->
    <span v-if="iconLeft" :class="[iconLeft, 'my-button__icon__left']"></span>
    <slot></slot>
    <span v-if="iconRight" :class="[iconRight, 'my-button__icon__right']"></span>
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
    iconRight: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
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
  &__icon__left {
    vertical-align: middle;
    color: inherit;
    margin-right: 5px;
  }
  &__icon__right {
    vertical-align: middle;
    color: inherit;
    margin-left: 5px;
  }
}
.my-button__text {
  border: none;
  color: #3779e7;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
}
.my-button__default {
  &:focus {
    color: #3779e7;
    border-color: #c3d7f8;
    background-color: #ebf2fd;
  }
  &:hover {
    color: #3779e7;
    border-color: #c3d7f8;
    background-color: #ebf2fd;
  }
  &:active {
    border-color: #2d8cf0 !important;
  }
}
.is--disabled {
  cursor: not-allowed;
  color: #c5c8ce;
  background-color: #f7f7f7;
  border-color: #dcdee2;
}
</style>