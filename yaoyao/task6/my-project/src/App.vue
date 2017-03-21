<template>
  <div class="all" @mousemove="mouse_move" @mouseup="mouse_up">
    <p>
      <label>标题：</label>
      <input type="text" v-model="title" placeholder="输入标题">
    </p>
    <p>
      <label>消息：</label>
      <textarea v-model="msg" placeholder="输入消息"></textarea>
      <button type="button" @click="showConfirm">confirm</button>
    </p>
    <div id="coverLay" v-if="isShow" @click="close"></div>
    <transition name="slide-fade">
      <div class="box" v-if="isShow" ref="box" :style="boxPosition">
        <div class="head" @mousedown.prevent="mouse_down">{{title}}</div>
        <div class="body">
          {{msg}}<br>
          弹出框位置：({{boxPosition.top}}\{{boxPosition.left}})
        </div>
        <div class="foot">
          <button type="button" @click="close">确定</button>
          <button type="button" v-on:click="close">取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isShow: false,
      title: '这是一个确认框',
      msg: 'Welcome to Your Vue.js App',
      m_s_x: 0,   //鼠标拖动的起始位置
      m_s_y: 0,   //鼠标拖动的起始位置
      b_o_t: 0,   //盒子的位置
      b_o_l: 0,   //
      startMove: false,   //开始运动
      boxPosition: {
        top: '50%',
        left: '50%',
        margin: '-100px 0 0 -200px'
      }
    }
  },
  methods: {
    close:  function (){
      this.isShow = false;
    },
    showConfirm: function (){
      this.isShow = true;
    },
    mouse_down: function(e){
      this.m_s_x = e.clientX;
      this.m_s_y = e.clientY;
      this.b_o_t = this.$refs.box.offsetTop;
      this.b_o_l = this.$refs.box.offsetLeft;
      this.startMove = true;
    },
    mouse_move: function (e) {
      let x = e.clientX;
      let y = e.clientY;
      if (this.startMove) {
        this.boxPosition = {
          top: this.b_o_t + (y - this.m_s_y ) + 'px',
          left: this.b_o_l + (x - this.m_s_x ) + 'px',
          margin: '0px'
        }
      }
    },
    mouse_up: function () {
      this.startMove = false;
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.all {
  position:relative;
  width: 100%;
  height: 100%;
}
#coverLay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
}
.box {
  position: absolute;
  background: #fff;
  width: 400px;
  height: 200px;
  border: 1px solid #000;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -200px;
}

.head {
  background: #666;
  color: #fff;
  text-align: left;
  border-bottom: 1px solid #333;
  padding: 5px 0 5px 10px;

  &:hover {
    cursor: move;
  }
}

.body {
  padding: 15px 10px;
  text-align: left;
}

.foot {
  position: absolute;
  bottom: 0;
  right: 0;

  button {
    background: #666;
    color: #fff;
    border: 1px solid #333;
    margin: 0 8px 8px 0;
    padding: 5px 15px;
    cursor: pointer;
  }
}


.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(50px);
  opacity: 0;
}

</style>
