<template>
  <div id="app">
      <div v-if="usert=='true'" :class="index&&usert=='true' ?'Toptaskbar':'Toptaskbar2'">
          顶部栏待定中
      </div>

      <div :class="index&&usert=='true' ? 'sidebar':'sidebar2'">
        <div class="LOGO">
          <img class="logos"  src="../public/photo/LOGO.png" width="50" height="50px">
          <span class="LOGO-text">speed云盘</span>
        </div>
       <div class="User">
          <div class="hrad">
            <i class="el-icon-user-solid"></i>
          </div>
          <span style="margin-left: 10px;font-size: 18px;">张三李四</span>
          <div class="foot">
            <el-dropdown trigger="click" placement="top-start">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >个人中心</el-dropdown-item>
                <el-dropdown-item >我的分享</el-dropdown-item>
                <el-dropdown-item >回收站</el-dropdown-item>
                <el-dropdown-item >账号管理</el-dropdown-item>
                <el-dropdown-item >退出登入</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

       </div>

       <div class="card" >
        <li style="list-style-type: none;float: left;" v-for="index in 6" :key="index">
          <div v-if="index!=sidebarnum" @mouseover="ind=index" @mouseleave="ind=null" @click="Sidebars(index)" :class="ind==index ? 'cards2':'cards'">
            <img class="che"  :src="require('../public/photo/che'+(index-1)+'.png')" >
            <span class="textr">{{title[index-1]}}</span>
          </div>
          <div v-else class="cards3">
              <img class="che"  :src="require('../public/photo/che'+(index-1)+'.png')" >
              <span class="textr">{{title[index-1]}}</span>
          </div>
        </li>
       </div>

       <div class="foots">
        <span class="foots-text">160 GB / 240 GB</span>
        <span class="foots-text2">管理容量</span>
        <el-progress style="margin-top: 10px;"  :percentage="160/240*100" :show-text="false"></el-progress>
       </div>

      </div>
      <div v-if="usert=='true'" :class="index ? 'anniu':'anniu2'">
            <i v-if="index==true" @click="types()" class="el-icon-caret-left"></i>
            <i v-else  @click="types()" class="el-icon-caret-right"></i>
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
          index:sessionStorage.getItem('sidebartype')=='true',
          usert:sessionStorage.getItem('users'),
          ind:100,
          sidebarnum:1,
          routers:['/home','/photo','/video','/file'],
          title:['全部文件','照片','音视频','我的隐私','待定1','待定2']
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
    types(){
      this.index = !this.index
      this.setSessionItem('sidebartype',this.index+'')
    },
    initData(){
      this.usert=sessionStorage.getItem('users')
      if(sessionStorage.getItem('sidebar')){
        this.sidebarnum=sessionStorage.getItem('sidebar')-0
      }
      if(sessionStorage.getItem('sidebartype')){
        if(sessionStorage.getItem('sidebartype')=='true'){
          this.index = true
        }else{
          this.index=false
        }
      }
      
    },
    Sidebars(index){
      sessionStorage.setItem('sidebar',''+index)
      this.sidebarnum = index
      this.$router.push(this.routers[index-1])
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
body::-webkit-scrollbar {
  display: none;
}
.Toptaskbar{
  position: fixed;
  z-index: 200;
  width: 100%;
  margin-left: 240px;
  height: 90px;
  transition: all .4s;
  background: rgb(200, 200, 200);
}
.Toptaskbar2{
  width: 100%;
  z-index: 200;
  position: fixed;
  background: rgb(200, 200, 200);
  height: 90px;
  transition: all .4s;
}
.LOGO{
  width: 100%;
  height: 70px;
  line-height: 90px;
}

.che{
  width: 22px;
  height: 22px;
  float: left;
  margin-top: 15px;
}

.logos{
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
.LOGO-text{
  font-size: 20px;
  margin-left: 15px;
  font-weight: 700;
}
.foots-text{
  font-size: 14px;
  color: rgb(55, 55, 55);
}
.foots-text2{
  float: right;
  font-size: 14px;
  color: rgb(21, 108, 184);
  cursor: pointer;
}
.foots-text2:hover{
  color: rgb(29, 149, 255);
}
.foots{
  position: absolute;
  bottom: 0;
  margin-bottom: 40px;
  width: 90%;
  margin-left: 5%;
  height: 40px;
}
.User{
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
  float: right;
  margin-right: 20px;
  cursor:pointer;
}
.el-dropdown{
  height: 30px;
}
.el-dropdown-link{
  font-size: 20px;
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
  float: left ;
  margin-left: 10px;
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


