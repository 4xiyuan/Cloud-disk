<template>
  <div id="app">
      <div :class="index&&usert=='true' ? 'sidebar':'sidebar2'">

       <div class="User">
          <div class="hrad">
            <i class="el-icon-user-solid"></i>
          </div>
          <span style="margin-left: 10px;font-size: 18px;">张三李四</span>
          <div class="foot"><i class="el-icon-more"></i></div>
       </div>

       <div class="card" >
        <li style="list-style-type: none;float: left;" v-for="index in 6" :key="index">
          <div v-if="index!=sidebarnum" @mouseover="ind=index" @mouseleave="ind=null" @click="Sidebars(index)" :class="ind==index ? 'cards2':'cards'">
            <i class="el-icon-eleme"></i>
            <span class="textr">分支{{index}}</span>
          </div>
          <div v-else class="cards3">
              <i class="el-icon-eleme"></i>
              <span class="textr">分支{{index}}</span>
          </div>
        </li>
       </div>

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
          ind:100,
          sidebarnum:1,
       }
   },

   watch: {
    '$route' () {
      //判断是否登录
      this.initData();
    }
  },
  created(){
    this.initData();
  },
   methods:{
    initData(){
      this.usert=sessionStorage.getItem('users')
      if(sessionStorage.getItem('sidebar')){
        this.sidebarnum=sessionStorage.getItem('sidebar')-0
      }
      
    },
    Sidebars(index){
      sessionStorage.setItem('sidebar',''+index)
      this.sidebarnum = index
    }
   }
   }
</script>

<style >



*{
    margin:0;
    padding:0;
  }
body {
  margin:0;
  padding:0;
  border:0;
}
.User{
  margin-top: 70px;
  width: 100%;
  height: 70px;
  line-height: 70px;
}
.hrad{
  font-size: 30px;
  float: left;
  margin-left: 20px;
}
.foot{
  font-size: 20px;
  float: right;
  margin-right: 20px;
  cursor:pointer;
}
.card{
  margin-left: 10px;
}
.cards{
  padding-left: 10px;
  font-size: 25px;
  width: 210px;
  height: 50px;
  line-height: 50px;
  cursor:pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.cards2{
  padding-left: 10px;
  background: rgb(230, 230, 230);
  border-radius: 15px;
  font-size: 25px;
  width: 210px;
  height: 50px;
  line-height: 50px;
  cursor:pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.cards3{
  padding-left: 10px;
  background: rgb(208, 208, 208);
  border-radius: 15px;
  font-size: 25px;
  width: 210px;
  height: 50px;
  line-height: 50px;
  cursor:pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

.textr{
  font-size: 16px;
  float: right;
  margin-right: 120px;
}

.sidebar{
  background: rgb(243, 243, 243);
  position: fixed;
  width: 240px;
  height: 100vh;
  transition: all .4s;
  float: left;
  z-index: 100;
  
}
.sidebar2{
  position: fixed;
  margin-left: -240px;
  width: 240px;
  height: 100vh;
  transition: all .4s;
  float: left;
  z-index: 100;
  overflow: hidden;
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
  margin-left: 235px;
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


