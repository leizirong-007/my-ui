<template>
  <!-- 

1.给管理器添加固定和关闭所有功能

2.点击管理器内部item 可以打开对应dialog功能

3.点击管理器内部item X 可以从管理器删除对应标签 

4.给dialog弹框添加初始化位置不重叠功能  思路：每次初始化产生不同程度的偏差 使用随机数字方法实现

5.添加销毁组件方法  解决退出登录时 弹框任然存在的问题

  -->
  <transition name="my-dialog__wrap">
    <div
      class="my-dialog__wrap"
      ref="my-dialog__wrap"
      @mousedown.self="$emit('update:visible', false)"
      :class="[dynamicClass]"
      v-show="visible"
      @mousedown.stop="toStratosphere"
    >
      <transition name="my-dialog">
        <!-- dialog容器 -->
        <div
          @mousemove="whichDirection"
          @mousedown="beginResize"
          @click.stop
          class="my-dialog"
          ref="my-dialog"
          :class="[shadow ? 'my-dialog__hover__shadow' : '']"
          :style="{
            height: dialogHeight + 'px',
            width: dialogWidth + 'px',
            borderRadius: borderRadius + 'px',
            minHeight: '200px',
            minWidth: '200px',
            cursor: stretchDirection
          }"
          v-show="visible"
        >
          <!-- 管理器组件 -->
          <Manager v-if="showManager" />
          <!-- 头容器 -->
          <div
            @mousedown="beginMoveDialog"
            @dblclick.self.stop="fullScreen ? isFullScreen = !isFullScreen : null"
            class="my-dialog__header"
            :style="{ cursor: shift ? 'move' : '' }"
          >
            <span @mousedown.stop class="my-dialog__header__titile">{{ title }}</span>
            <button
              class="my-ui-x-iconfont icon-zuixiaohua"
              @click.self="minimalityHandle"
              v-show="minimality"
              @mousedown.stop="toStratosphere"
            ></button>
            <button
              :class="['my-ui-x-iconfont', isFullScreen ? 'icon-zuidahua-1' : 'icon-zuidahua']"
              @click.self="isFullScreen = !isFullScreen"
              v-show="fullScreen"
              @mousedown.stop="toStratosphere"
            ></button>
            <button
              class="my-ui-x-iconfont icon-guanbi"
              @mousedown.stop="toStratosphere"
              @click.self="$emit('update:visible', false)"
            ></button>
          </div>
          <!-- 身体容器 -->
          <div class="my-dialog__body">
            <!-- 默认插槽 -->
            <slot></slot>
          </div>
          <div
            ref="my-dialog__resize"
            class="my-dialog__resize"
            :style="{
              cursor: stretchDirection,
            }"
          ></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Manager from "./Manager.vue";

export default {
  name: "MyDialog",
  components: { Manager },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    shade: {
      type: Boolean,
      default: true
    },
    shift: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    shadow: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    minimality: {
      type: Boolean,
      default: false
    },
    resetPostion: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "标题"
    },
    touchDetection: {
      type: Boolean,
      default: false
    },
    windowMonitor: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: Number,
      default: 2,
    }
  },
  data() {
    return {
      dialogHeight: 300,
      dialogWidth: 400,
      zIndex: 9999,
      isFullScreen: false,
      isMinimality: false,
      showManager: false,
      managerData: Manager.managerData,
      toBeDeleted: Manager.toBeDeleted,
      stretchDirection: '',
    };
  },
  mounted() {
    //是否将dialog放入值body
    this.appendToBodyHandle();
    //添加dialog管理器
    this.addDialogManager();
    // 初始化弹窗大小
    this.setDialogSize()
    if (this.shift) {
      //初始化
      this.initializePosition()
      // Touch touchDetection 触碰检测
      if (this.touchDetection || this.windowMonitor) {
        //屏幕缩放检测
        this.screenSizeWatch()
      }
    }
  },
  beforeDestroy() {
    document.body.removeChild(this.$refs['my-dialog__wrap'])
    if (document.querySelector('.my-dialog__manager__wrap')) {
      document.body.removeChild(document.querySelector('.my-dialog__manager__wrap'))
      // 清空管理器中所有的缓冲对话框
      // this.managerData = []  此方法不可取 因为this.managerData是引用数据  需要按照以下方法改变原数组清空
      this.managerData.splice(0, this.managerData.length)
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.reduceTODialogManager();
        this.toStratosphere();
        if (this.resetPostion && this.shift) {
          this.initializePosition()
        }
      }
    },
    managerData(val) {
      if (!this.managerData[0]) {
        document.querySelector(".my-dialog__manager").style.display = "none"
      }

      val.forEach((item) => {
        if (item.__vId == this.toBeDeleted.__vId) {
          return
        }
      })
      if (this.$refs['my-dialog__wrap'].__vue__._uid == this.toBeDeleted.__vId) {
        this.$emit('update:visible', true)
      }
    },
  },
  computed: {
    dynamicClass() {
      // 全屏模式 只返回 全屏class
      if (this.isFullScreen) {
        return "my-dialog__fullScreen";
      }
      // 遮罩 移动 并存时 默认舍去遮罩
      if (this.shift) {
        return "my-dialog__shift";
      }
      // 只需要遮罩 其他都是默认样式
      if (this.shade) {
        return "my-dialog__shade";
      }
      // 不需要遮罩 其他都是默认样式
      if (!this.shade) {
        return "my-dialog__shade__hidden";
      }
      return 'my-dialog__shade'
    },
  },
  methods: {
    //初始化位置
    initializePosition(banOffset) {
      let wrapDiv = this.$refs['my-dialog__wrap'];
      let getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let stochasticX = getRndInteger(-20, 50), stochasticY = getRndInteger(-20, 50)
      if (banOffset) {
        stochasticX = 0
        stochasticY = 0
      }
      wrapDiv.style.top = window.innerHeight - (window.innerHeight / 2) - (this.dialogWidth / 2) + stochasticY + "px";
      wrapDiv.style.left = window.innerWidth - (window.innerWidth / 2) - (this.dialogWidth / 2) + stochasticX + "px";
      this.isFullScreen = false;
      //监听窗口缩放时自动更改位置
      // window.onresize = this.collisionDetection(this.$refs["my-dialog__wrap"])
    },
    //弹窗移动的方法
    beginMoveDialog(params) {
      let wrapDiv = this.$refs['my-dialog__wrap']
      //鼠标点选移动时 禁止过度效果 否则效果表现为卡顿
      wrapDiv.style.transitionProperty = 'none'
      wrapDiv.style.transitionDuration = 'none'
      // 鼠标距离元素的上边距和左边距
      let { offsetX, offsetY } = params;
      //是否需要移动功能
      if (!this.shift || this.isFullScreen) {
        return;
      }
      document.documentElement.onmousemove = (params2) => {
        // 鼠标所处窗口的位置
        let { clientX, clientY } = params2;
        // 由于 offsetX, offsetY 基于的元素是 my-dialog__header 但移动的元素是 my-dialog__wrap ，需要减去 两个元素之间的top和left值差
        // clientX -= 5, clientY -= 5
        // 跟随鼠标移动
        wrapDiv.style.position = "fixed";
        wrapDiv.style.left = clientX - offsetX + "px";
        wrapDiv.style.top = clientY - offsetY + "px";
        if (this.touchDetection) {
          this.collisionDetection(wrapDiv)
        }
      };
      //添加鼠标松开监听
      document.documentElement.onmouseup = () => {
        document.documentElement.onmousemove = null;
        //鼠标松开时还原  否则点下后不再有过度效果
        wrapDiv.style.transitionProperty = 'top , left'
        wrapDiv.style.transitionDuration = '0.5 , 0.5'
      };
    },
    //是否添加防碰撞
    collisionDetection(wrapDiv) {
      if (parseInt(wrapDiv.style.left) <= 0) {
        wrapDiv.style.left = '0px'
      }
      if (parseInt(wrapDiv.style.top) <= 0) {
        wrapDiv.style.top = '0px'
      }
      if (parseInt(wrapDiv.style.left) >= (window.innerWidth - this.dialogWidth)) {
        wrapDiv.style.left = window.innerWidth - this.dialogWidth + "px";
      }
      if (parseInt(wrapDiv.style.top) >= window.innerHeight - this.dialogHeight) {
        wrapDiv.style.top = window.innerHeight - this.dialogHeight + "px";
      }
    },
    //监听窗口缩放时自动更改位置
    screenSizeWatch() {
      let SL = window.innerWidth, ST = window.innerHeight
      setInterval(() => {
        let innerSL = window.innerWidth, innerST = window.innerHeight
        if (SL !== innerSL || ST !== innerST) {
          if (!this.isFullScreen) {
            this.initializePosition(true)
          }
        }
        SL = innerSL, ST = innerST
      }, 800);
    },
    //点选的dialog去到最上层
    toStratosphere() {
      let dialogArr = document.querySelectorAll(".my-dialog__wrap");
      dialogArr.forEach((item) => {
        // 使其每次打开都全部减一 从而不破坏冒泡顺序
        if (item.style.zIndex > 1) {
          item.style.zIndex -= 1;
        }
      });
      this.$refs["my-dialog__wrap"].style.zIndex = this.zIndex;
    },
    //是否将dialog插入至body
    appendToBodyHandle() {
      if (this.appendToBody) {
        document.querySelector("body").append(this.$refs["my-dialog__wrap"]);
      }
    },
    //是否最小化
    minimalityHandle() {
      this.isMinimality = true;
      this.$emit("update:visible", false);
      this.addToDialogManager();
    },
    //添加最小化窗口管理器
    addDialogManager() {
      let dialogManager = document.querySelector(".my-dialog__manager__wrap");
      //这个判断 判断是否存在管理器container
      if (dialogManager) {
        return
      }
      else { //创造管理器
        let dialogManagerWrap = document.createElement("div");
        dialogManagerWrap.className = "my-dialog__manager__wrap";
        document.body.append(dialogManagerWrap);
        this.showManager = true
        //初始化管理器位置
      }
    },
    //往最小化窗口管理器中添加一项
    addToDialogManager() {
      //重置将要删除节点为null 
      this.toBeDeleted.__vId = null
      //拿到管理器节点
      let dialogManager = document.querySelector(".my-dialog__manager");
      dialogManager.style.display = "flex";
      let exist = false
      //判断点开的dialog是否已经存在 管理器中
      this.managerData.forEach((item) => {
        if (item.__vId == this.$refs['my-dialog__wrap'].__vue__._uid) {
          return exist = true
        }
      })
      // return
      //进入此判断表示 点开的dialog不存在 管理器中 创建并插入item
      if (!exist) {
        Manager.addOne()
        this.managerData.push({
          __vId: this.$refs['my-dialog__wrap'].__vue__._uid,
          title: this.title
        })
      }
    },
    //往最小化窗口管理器中减少一项 managerData
    reduceTODialogManager() {

      this.managerData.forEach((item, index) => {
        if (item.__vId == this.$refs['my-dialog__wrap'].__vue__._uid) {
          this.managerData.splice(index, 1)
        }
      })
      //如果进入这个判断说明管理器必为空 隐藏管理器
      // if (!this.managerData[0]) {
      //   return dialogManager.style.display = "none";
      // }
    },
    // 判断拉伸方向的方法  lt, t, rt, r, br, b, lb, l
    whichDirection(params) {
      this.$refs['my-dialog__resize'].style.zIndex = 7
      // 当鼠标按下准备缩放时 取消鼠标图标样式监听监听事件
      if (this.whichDirectionFlag) return

      let { offsetX, offsetY } = params
      // 上 
      if (offsetX > 4 && offsetX < this.dialogWidth - 4 && offsetY < 4) {
        this.stretchDirection = 'n-resize'
      }
      // 下
      else if (offsetX > 4 && offsetX < this.dialogWidth - 4 && offsetY > this.dialogHeight - 4) {
        this.stretchDirection = 's-resize'
      }
      // 左 
      else if (offsetY > 4 && offsetY < this.dialogHeight - 4 && offsetX < 4) {
        this.stretchDirection = 'e-resize'
      }
      // 右
      else if (offsetY > 4 && offsetY < this.dialogHeight - 4 && offsetX > this.dialogWidth - 4) {
        this.stretchDirection = 'w-resize'
      }
      // 左上
      else if (offsetX < 4 && offsetY < 4) {
        this.stretchDirection = 'se-resize'
      }
      // 左下
      else if (offsetX < 4 && offsetY > this.dialogHeight - 4) {
        this.stretchDirection = 'sw-resize'
      }
      // 右上
      else if (offsetX > this.dialogWidth - 4 && offsetY < 4) {
        this.stretchDirection = 'ne-resize'
        console.log('右上');
      }
      // 右下
      else if (offsetX > this.dialogWidth - 4 && offsetY > this.dialogHeight - 4) {
        this.stretchDirection = 'nw-resize'
        console.log('右下');
      }
      else {
        this.stretchDirection = 'default'
        this.$refs['my-dialog__resize'].style.zIndex = -1
      }
    },
    // 处理缩放的方法 
    beginResize(params) {
      // 修改全局鼠标样式

      document.documentElement.onmouseup = () => {
        document.documentElement.onmousemove = null


      }
    },
    setDialogSize() {
      if (this.height) {
        this.dialogHeight = this.height
      }
      if (this.width) {
        this.dialogWidth = this.width
      }
    }
  }
}
</script>



<style lang='less' scoped>
//dialog shade弹出过渡动画
@keyframes dialogAnimation {
  0% {
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}
.my-dialog__wrap-enter-active {
  animation: dialogAnimation 0.5s;
}
.my-dialog__wrap-leave-active {
  animation: dialogAnimation 0.5s reverse;
}

//默认遮罩样式
.my-dialog__shade {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .my-dialog__resize {
    display: none;
  }
}
//隐藏遮罩层样式
.my-dialog__shade__hidden {
  position: fixed;
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .my-dialog__resize {
    display: none;
  }
  .my-dialog {
    position: fixed;
  }
}
//可移动时样式
.my-dialog__shift {
  width: 0;
  height: 0;
  position: fixed;
  .my-dialog {
    position: fixed;
  }
}
//全屏时的样式
.my-dialog__fullScreen {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0 !important;
  left: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  .my-dialog {
    margin: 0;
    width: 100% !important;
    height: 100% !important;
    transition-property: width, height;
    transition-duration: 0.1s, 0.1s;
    transition-timing-function: linear, linear;
    .my-dialog__header {
      cursor: default !important;
    }
  }
}
//阴影hover效果
.my-dialog__wrap .my-dialog__hover__shadow {
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(12, 20, 23, 0.4) !important;
  }
}

// 默认样式
.my-dialog__wrap {
  // transition: left 0.1s linear;
  transition: box-shadow 0.2s;
  font-size: 12px;
  //移动时禁止选中文字
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  //防碰撞动画
  transition-property: top, left;
  transition-duration: 0.5s, 0.5s;
  //dialog body弹出过渡动画
  @keyframes dialogAnimationInside {
    0% {
      transform: scale(0.4);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .my-dialog-enter-active {
    animation: dialogAnimationInside 0.3s;
  }

  .my-dialog-leave-active {
    animation: dialogAnimationInside 0.3s reverse;
  }
  //dialog body 样式
  .my-dialog {
    background-color: #fff;
    position: relative;
    //阴影效果
    box-shadow: 0 2px 12px 0 rgba(12, 20, 23, 0.15);
    .my-dialog__header {
      background-color: #ddd;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      > * {
        margin-left: 15px;
        background-color: transparent;
      }
      .my-dialog__header__titile {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        cursor: default;
      }
      > :last-child {
        margin-right: 10px;
      }
    }
    .my-dialog__body {
      padding: 15px;
      cursor: default;
    }
  }
}

.my-dialog__resize1 {
  width: calc(100% - 4px);
  height: 4px;
  position: absolute;
  top: -2px;
  left: 2px;
  background-color: pink;
  z-index: 9999;
}
.my-dialog__resize7 {
  height: calc(100% - 4px);
  width: 4px;
  position: absolute;
  left: -2px;
  top: 2px;
  background-color: pink;
  z-index: 9999;
}
.my-dialog__resize {
  height: 8px;
  width: 8px;
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: pink;
  z-index: -1;
}
</style>