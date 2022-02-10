<template>
  <div class="my-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyRadioGroup',
  props: {
    value: null
  },
  provide() {
    return {
      RadioGroup: this
    }
  }
}
</script>
