<template>
  <div id="app">
      <div :class="index&&usert=='true' ? 'sidebar':'sidebar2'">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
      </div>
      <div v-if="usert=='true'" :class="index ? 'anniu':'anniu2'">
            <i v-if="index==true" @click="index=!index" class="el-icon-caret-left"></i>
            <i v-else @click="index=!index" class="el-icon-caret-right"></i>
      </div>
      <div :class="index&&usert=='true' ? 'bodu':'bodu2'">
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
          index:true,
          usert:sessionStorage.getItem('users'),
       }
   },

   watch: {
    '$route' () {
      //判断是否登录
      this.initData();
    }
  },
   methods:{
    initData(){
      this.usert=sessionStorage.getItem('users')
    },
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
.el-menu-vertical-demo{
  height: 100vh;
}
.sidebar{
  position: fixed;
  width: 240px;
  height: 100vh;
  transition: all .4s;
  float: left;
  overflow: hidden;
  z-index: 200;
  
}
.sidebar2{
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


