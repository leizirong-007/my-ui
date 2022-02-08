<template>
  <div id="app">
    <my-dialog
      title="asdfasdfsdfsadfsdfsa"
      :visible.sync="visible1"
      shift
      :height="300"
      :width="400"
      fullScreen
      minimality
      touchDetection
    >
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <div>
      <button @click="visible1 = !visible1">click and open one dialog</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
    };
  },
  methods: {

  },
}
</script>

<style>
#app {
  height: 100%;
  overflow: hidden;
}
</style>
