<template>
  <div>
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
      <div class="box" v-if="isShow">
        <div class="head">{{title}}</div>
        <div class="body">
          {{msg}}
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    close:  function (){
      this.isShow = false;
    },
    showConfirm: function (){
      this.isShow = true;
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  position: fixed;
  background: #fff;
  width: 400px;
  height: 200px;
  border: 1px solid #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.head {
  background: #666;
  color: #fff;
  text-align: left;
  border-bottom: 1px solid #333;
  padding: 5px 0 5px 10px;
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
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translate(-30%, -50%);
  opacity: 0;
}

</style>
