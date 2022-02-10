<template>
  <div class="my-switch" :class="value ? 'is-checked' : ''" @click="handleClick">
    <input :name="name" type="checkbox" class="my-switch__input" />
    <span class="my-switch__core" ref="core">
      <span class="my-switch__button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MySwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('input', !this.value)
    },
    setColor() {
      if (this.activeColor || this.inactiveColor) {
        let color = this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.backgroundColor = color
        this.$refs.core.style.borderColor = color
      }
    }
  },
  mounted() {
    this.setColor()
  },
  watch: {
    value() {
      this.setColor()
    }
  }
}
</script>

<style lang='less' scoped>
.my-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  .my-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .my-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 34px;
    height: 18px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .my-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 14px;
      height: 14px;
      background-color: #fff;
    }
  }
}
.is-checked {
  .my-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .my-switch__button {
      transform: translateX(16px);
    }
  }
}
</style>