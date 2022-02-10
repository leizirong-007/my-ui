<template>
  <!-- is-checked  -->
  <label class="my-checkbox" :class="{ 'is-checked': isChecked }">
    <span class="my-checkbox__input">
      <span class="my-checkbox__inner"></span>
      <input
        v-model="model"
        :name="name"
        :value="label"
        class="my-checkbox__original"
        type="checkbox"
      />
    </span>
    <span class="my-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'MyCheckbox',
  computed: {
    model: {
      get() {
        return this.isGroup ? this.CheckboxGroup.value : this.value
      },
      set(value) {
        this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup() {
      return !!this.CheckboxGroup
    },
    isChecked() {
      return this.isGroup ? this.model.includes(this.label) : this.model
    }
  },
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='less' scoped>
.my-checkbox + .my-checkbox {
  margin-left: 20px;
}
.my-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  .my-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .my-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:hover {
        border-color: #409eff;
      }
      &:after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .my-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .my-checkbox__label {
    font-size: inherit;
    padding-left: 10px;
  }
}
.my-checkbox.is-checked {
  .my-checkbox__input {
    .my-checkbox__inner {
      border-color: #409eff;
      background-color: #409eff;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .my-checkbox__label {
    color: #409eff;
  }
}
</style>