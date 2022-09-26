<template>
  <div id="app">
      <div :class="index ? 'sidebar':'sidebar2'">
      </div>
      <div :class="index ? 'anniu':'anniu2'">
            <i v-if="index==true" @click="index=!index" class="el-icon-caret-left"></i>
            <i v-else @click="index=!index" class="el-icon-caret-right"></i>
      </div>
      <div :class="index ? 'bodu':'bodu2'">
        <transition name="fade">
            <router-view/>
        </transition>
      </div>
  </div>
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
          index:true
       }
   },
   methods:{
   }
   }
</script>

<style>
*{
    margin:0;
    padding:0;
  }
body {
  margin:0;
  padding:0;
  border:0;
}
.sidebar{
  background: #000;
  position: fixed;
  width: 240px;
  height: 100vh;
  transition: all .4s;
  float: left;
  overflow: hidden;
  z-index: 200;
  
}
.sidebar2{
  background: #000;
  position: fixed;
  width: 0px;
  height: 100vh;
  transition: all .4s;
  float: left;
  overflow: hidden;
  z-index: 200;
}


.fade-enter-active {
  transition: all .8s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(40px);
}
.bodu{
  margin-left: 240px;
  transition: all .4s;
}
.bodu2{
  margin-left: 0px;
  transition: all .4s;
}
.anniu{
  position: fixed;
  z-index: 990;
  float: left;
  margin-left: 230px;
  font-size: 40px;
  line-height: 100vh;
  transition: all .4s;
}
.anniu2{
  position: fixed;
  z-index: 990;
  float: left;
  margin-left: -10px;
  font-size: 40px;
  line-height: 100vh;
  transition: all .4s;
}
.el-icon-caret-left,.el-icon-caret-right{
  color: rgb(209, 209, 209);
}
.el-icon-caret-left:hover{
  color: rgb(28, 183, 255);
  cursor:pointer;
}
.el-icon-caret-right:hover{
  color: rgb(28, 183, 255);
  cursor:pointer;
}
</style>


