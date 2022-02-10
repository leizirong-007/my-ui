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
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible1" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible2" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible3" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible4" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible5" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible6" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible7" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>
    <my-dialog title="asdfasdfsdfsadfsdfsa" :visible.sync="visible8" shift minimality>
      <div
        style="padding: 20px;"
      >shade shift height width shadow fullScreen minimality resetPostion appendToBody title touchDetection windowMonitor</div>
    </my-dialog>

    <div class="dome">
      <my-button disabled @click="visible = !visible" iconLeft="my-ui-x-iconfont icon-guding">禁用</my-button>
      <my-button type="text">
        <span class="my-ui-x-iconfont icon-guding">a</span>
      </my-button>
      <my-button
        class="btn-primary"
        @click="visible = !visible"
        iconRight="my-ui-x-iconfont icon-guding"
      >按钮</my-button>

      <my-button @click="visible1 = !visible1" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible2 = !visible2" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible3 = !visible3" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible4 = !visible4" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible5 = !visible5" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible6 = !visible6" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible7 = !visible7" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
      <my-button @click="visible8 = !visible8" iconLeft="my-ui-x-iconfont icon-guding">点击打开一个弹窗</my-button>
    </div>
    <div class="dome">
      <my-input disabled icon-right="my-ui-x-iconfont icon-guding"></my-input>
      <my-input v-model="value" type="password" iconRight="my-ui-x-iconfont icon-guding"></my-input>
      <my-input type="password" v-model="value" clearable iconLeft="my-ui-x-iconfont icon-guding"></my-input>
      <my-input
        v-model="value"
        type="password"
        show-password
        iconLeft="my-ui-x-iconfont icon-guding"
      ></my-input>
      <my-input
        v-model="value"
        @input="test"
        class="ipt-primary"
        iconLeft="my-ui-x-iconfont icon-guding"
        placeholder="请输入你的名字"
      ></my-input>
      <my-input v-model="value" class="ipt-primary" iconRight="my-ui-x-iconfont icon-guding"></my-input>
      <my-input
        type="password"
        v-model="value"
        placeholder="password"
        class="ipt-primary"
        iconRight="my-ui-x-iconfont icon-guding"
      ></my-input>
    </div>
    <div class="dome">
      <my-radio label="1" v-model="gender">男</my-radio>
      <my-radio label="0" v-model="gender">女</my-radio>
      <my-radio-group v-model="gender">
        <my-radio label="1">男</my-radio>
        <my-radio label="0">女</my-radio>
      </my-radio-group>
    </div>
    <div class="dome">
      <my-switch v-model="visible"></my-switch>
      <my-switch v-model="visible" active-color="pink" inactive-color="skyblue"></my-switch>
    </div>
    <div class="dome">
      <my-checkbox v-model="visible3">选项一</my-checkbox>
      <my-checkbox v-model="visible1">选项二</my-checkbox>
      <my-checkbox v-model="visible2">选项三</my-checkbox>
      <my-checkbox-group v-model="hobby">
        <my-checkbox label="选项一">选项一</my-checkbox>
        <my-checkbox label="选项二">选项二</my-checkbox>
        <my-checkbox label="选项三">选项三</my-checkbox>
      </my-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      value: 'sdfsd',
      gender: '1',
      hobby: []
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
    flex-wrap: wrap;
    padding: 10px 10px 20px;
    border-bottom: 1px solid #ccc;
    > * {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
  .my-button {
    height: 28px;
  }
  .my-input {
    height: 30px;
  }
  .my-checkbox-group {
    margin-left: 50px;
  }
}
</style>
.my-ui-x-iconfont{
  font-family: "my-ui-x-iconfont" !important;
  font-size: inherit;
  color: inherit;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}