<template>
  <div class="my-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  provide() {
    return {
      CheckboxGroup: this
    }
  }
}
</script>