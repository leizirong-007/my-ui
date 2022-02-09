<template>
  <div id="app">
    <my-dialog
      title="asdfasdfsdfsadfsdfsa"
      :visible.sync="visible"
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

    <div class="dome">
      <my-button disabled @click="visible = !visible" iconLeft="my-ui-x-iconfont icon-guding">按钮</my-button>
      <my-button @click="visible = !visible" iconMiddle="my-ui-x-iconfont icon-guding"></my-button>
      <my-button
        class="btn-primary"
        @click="visible = !visible"
        iconRight="my-ui-x-iconfont icon-guding"
      >按钮</my-button>
    </div>
    <div class="dome">
      <my-input disabled iconRight="my-ui-x-iconfont icon-guding"></my-input>
      <my-input
        v-model="value"
        @input="test"
        class="ipt-primary"
        iconLeft="my-ui-x-iconfont icon-guding"
        placeholder="请输入你的名字"
      ></my-input>
      <my-input v-model="value" class="ipt-primary" iconRight="my-ui-x-iconfont icon-guding"></my-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      value: 'sdfsd'
    };
  },
  methods: {
    test(val) {
      console.log(val);
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  height: 1200px;
  /deep/ .dome {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    > * {
      margin-left: 10px;
      .my-ui-x-iconfont {
        font-size: 12px;
        color: #ccc;
      }
    }
    .btn-primary {
      border: 1px solid #2d8cf0 !important;
      background-color: #2d8cf0 !important;
      color: #fff;
    }
    .btn-primary:hover {
      border-color: red !important;
      opacity: 0.7;
      color: red;
      background-color: pink !important;
    }
    .btn-primary:focus {
      border-color: pink !important;
      opacity: 0.7;
      color: pink;
      background-color: brown !important;
    }

    .ipt-primary input {
      border: 1px solid #2d8cf0 !important;
    }
    .ipt-primary input:hover {
      border-color: pink !important;
    }
    .ipt-primary input:focus {
      border-color: brown !important;
    }
  }
}
</style>
