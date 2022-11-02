<template>
  <div id="app">
      <div v-if="usert=='true'" :class="index&&usert=='true' ?'Toptaskbar':'Toptaskbar2'">
          <el-breadcrumb  separator=">">
              <el-breadcrumb-item v-for="(item,index) in 1" :to="{ path: '/' }" :replace ="true">{{routeTitle}}</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="searchbox">
             <el-input
              placeholder="搜索内容"
              prefix-icon="el-icon-search"
              v-model="searchText">
            </el-input>
          </div>
          <div class="expandbox">
            <el-dropdown trigger="click" placement="top-start">
              <span class="el-dropdown-link">
                <i class="el-icon-circle-plus-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="upload()" >上传文件</el-dropdown-item>
                <el-dropdown-item @click.native="dialogVisible = true">新建文件夹</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div @click="uploadlist=!uploadlist"  class="transmission" title="上传列表">
            <i class="el-icon-upload2"></i>
          </div>
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
                <el-dropdown-item >待定</el-dropdown-item>
                <el-dropdown-item >待定</el-dropdown-item>
                <el-dropdown-item >退出登入</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

       </div>

       <div class="card" >
        <li style="list-style-type: none;float: left;" v-for="index in 5" :key="index">
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
            <router-view v-if="isRouterAlive" />
        </transition>
      </div>



      <el-dialog
        title="新建文件夹"
        :visible.sync="dialogVisible"
        width="400px">
        <div class="NewFolder"><img  src="../public/photo/folder.png" width="100px" height="80px"></div>
        <div style="margin-top: 30px;"><el-input v-model="NewFolderName" placeholder="文件夹名称"></el-input></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addFolder()">确 定</el-button>
        </span>
      </el-dialog>

      
      <!-- 上传列表 -->
      <div  :class="uploadlist?'uploadbox2':'uploadbox'">
        <div class="uploadtext">上传列表</div>
        <div class="xuanfu"></div>
        <div class="upload-box">
          <li v-if="filelist" v-for="item,index in filelist[0]" :key="index" style="list-style-type: none;">
            <div class="bottombox" :style="'width:'+(item.jindu+1)+'%;'"></div>
            <div class="n-uploadbox" >
              <div style="height:10px;"></div>
              <div class="imgs">
                <img :src="require('../public/photo/'+item.type+'.png')" width="60px" height="60px">
              </div>
              <div style="margin-left: 95px;margin-top: -60px;font-size:18px;width:190px;-webkit-box-orient: vertical;display: -webkit-box;overflow-wrap: break-word;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;">{{item.name}}</div>
              <div style="margin-left: 95px;margin-top: 15px;font-size:14px;">{{item.size}}</div>
              <div v-if="(item.jindu+1)>0&&(item.jindu+1)<100" style="margin-left: 340px;margin-top: -10px;font-size:16px;">{{item.jindu+1}}%</div>
              <div v-if="(item.jindu+1)<=0" style="margin-left: 320px;margin-top: -40px;font-size:18px;">解析中</div>
              <div v-if="(item.jindu+1)==100" style="margin-left: 300px;margin-top: -40px;font-size:18px;">上传完成</div>
              <div v-if="(item.jindu+1)>0&&(item.jindu+1)<100"  style="margin-left: 300px;margin-top: -60px;font-size:30px;cursor: pointer;position: absolute;">
                <div v-if="(item.bott)" @click="zan(index)"><i class="el-icon-video-pause"></i></div>
                <div v-else @click="ji(index)"><i class="el-icon-caret-right"></i></div>
              </div>
              <div v-if="(item.jindu+1)>0&&(item.jindu+1)<100"  style="margin-left: 360px;margin-top: -80px;font-size:22px;cursor: pointer;position: absolute;">
                <i @click="guanbi(index)" class="el-icon-close"></i>
              </div>
            </div>
            <div v-if="index==filelist[0].length-1" style="height:30px"></div>
          </li>
        </div>
      </div>
      <uploads v-show="false" ref="uploads" v-on:numdata="uploaddata" v-on:jindu="uploadjindu"></uploads></uploads>
      </div>
      
  </div>
</template>

<script type="text/javascript">
import home from '../src/components/home.vue'
import SparkMD5 from 'spark-md5'
import upload from '../src/upload.vue'
import {endUpload,addfolder} from '../src/apis/index'
   export default {
    components: {
    'uploads': upload,
  },
  provide(){
    return {
      reload:this.reload
    }
  },
   data() {
       return {
          //当前路由标签
          routeTitle:sessionStorage.getItem('zhutitle'),
          isRouterAlive:true,
          uploadlist:false,
          index:sessionStorage.getItem('sidebartype')=='true',
          usert:sessionStorage.getItem('users'),
          ind:100,
          sidebarnum:1,
          routers:['/home','/photo','/video','/file','/recycle'],
          title:['全部文件','照片','音视频','我的隐私','回收站'],
          //搜索框内容
          searchText:null,
          //新建文件夹层是否渲染变量
          dialogVisible:false,
          //新建文件夹名称
          NewFolderName:null,
          //上传文件列表
          filelist:[
            // {
            //   0:{jindu:68,
            //   type:'mp4',
            //   bott:false,
            //   name:"测试文件阿斯顿耨爱无能到位.mp4",
            //   size:"597.6MB"},
            // }
          ],
          //默认上传文件列表长度
          num:0,
          //暂停或继续
          stops:true,

       }
   },

   watch: {
    '$route' () {
      //判断是否登录
      if(this.getQueryString('belong')+this.getQueryString('name')){
        sessionStorage.setItem('paths',this.getQueryString('belong')+this.getQueryString('name')+'\\')
      }else{
        sessionStorage.removeItem('paths')
      }
      this.initData();
      //路由跳转时清空搜索框内容
      this.searchText = null
      //路由跳转时获得当前路由的标签
      if(this.$route.meta.title){
        sessionStorage.setItem('zhutitle',this.$route.meta.title)
        this.routeTitle = sessionStorage.getItem('zhutitle')
      }
      
      //路由跳转时重置滚动条顶部
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      
    },
    'searchText'(){
        this.setSessionItem('searchtext',this.searchText)
    },
  },
  created(){
    this.initData();
    
  },
  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      // console.log(this.$route.fullPath);
      return this.$route.fullPath
    }
  },
  mounted(){
    
    
     // 监听返回事件,点击系统返回时
    if(window.history && window.history.pushState){
      window.addEventListener('popstate',this.reload,false)
    }
  },
   methods:{
    //获取当前url地址参数
    getQueryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return decodeURIComponent(r[2]); return null;
            },
    //刷新数据
    reload(){
      // window.location.reload();
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
    //新建文件夹
    addFolder(){
      if(!this.NewFolderName){
        this.$message.error('文件名不能为空！');
        return
      }
      let data = {
        id:'1',
        filePath:null,
        fileName:this.NewFolderName
      }
      if(sessionStorage.getItem('paths')&&sessionStorage.getItem('paths')!=''){
            data.filePath=sessionStorage.getItem('paths')+this.NewFolderName
      }else{
            data.filePath='1\\'+this.NewFolderName
      }
      console.log(data)
      addfolder(data).then(res=>{
        if(res.data.code==200){
          this.dialogVisible = false
          window.location.reload();
          this.$message.success('新建文件夹成功！');
          this.NewFolderName = null
        }else{
           this.$message.error(res.data.msg);
        }
        
      })
    },
    //根据下标关闭文件下上传
    async guanbi(index){
      await endUpload()
      
      this.$refs.uploads.deletes(index)
    },
    //更新文件的上传进度
    async uploadjindu(data){
      if(data.jindu>99){
        this.filelist[data.index].jindu=99
      }else{
        this.filelist[data.index].jindu = data.jindu
      }
    },
    //获取待上传的文件信息
    uploaddata(data){
      this.filelist.push(data)
      this.uploadlist = true
      const map = new Map()
      const newArr = this.filelist.filter(key => !map.has(key.filename) && map.set(key.filename, 1))
      this.filelist = newArr
    },
    //选择好上传文件后触发函数
    //点击上传文件
    upload(){
        this.$refs.uploads.shang()
    },
    //暂停
    zan(index){
      this.$refs.uploads.handleBtn(index)
    },
    //继续
    ji(index){
      this.$refs.uploads.handleBtns(index)
    },
    //点击上传文件夹s
    uploads(){
        this.$refs.uploadBtns.$el.click()
    },
    
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
    },
    gto(name){
      this.$router.push("/"+name)
    }
   }
   }
</script>

<style >
.xuanfu{
  position: fixed;
  bottom: 10px;
  height: 30px;
  border-radius: 0px 0px 20px 20px;
  z-index: 999;
  background: rgb(255, 255, 255);
  width: 400px;
}
.upload-box{
  margin-top: 30px;
}
.imgs{
  width: 60px;
  height: 60px;
  margin-left: 20px;
  
}
.bottombox{
  background: rgb(138, 255, 199);
  height: 80px;
  
}
.n-uploadbox{
  width: 100%;
  position: absolute;
  margin-top: -80px;
  border-bottom: 1px rgb(210, 210, 210) solid;
  height: 80px;
}
.uploadtext{
  width: 400px;
  height: 30px;
  border-radius: 20px 20px 0px 0px;
  background: rgb(255, 255, 255);
  position: fixed;
  z-index: 2;
  text-align: center;
  font-size: 18px;
}
.uploadbox2{
  transition: all .3s;
  right: 10px;
  box-shadow: 0 8px 32px 0 rgba(47, 47, 47, 0.37);
  overflow: auto;
  width: 400px;
  height:500px ;
  max-height:600px ;
  position: fixed;
  z-index: 2000;
  border-radius: 20px;
  background: #ffffff;
  bottom: 10px;
}

.uploadbox{
  transition: all .3s;
  right: -450px;
  box-shadow: 0 8px 32px 0 rgba(47, 47, 47, 0.37);
  overflow: auto;
  width: 400px;
  height:500px ;
  max-height:600px ;
  position: fixed;
  z-index: 2000;
  border-radius: 20px;
  background: #ffffff;
  bottom: 10px;
}
.uploadbox::-webkit-scrollbar {
  display: none;
}


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
.NewFolder{
  margin-top: 20px;
  margin-left: 140px;
}
.el-dialog{
  position: absolute;
}
.el-dialog__body{
  height: 150px;
}
.expandbox{
  top: 25px;
  position: fixed;
  width: 240px;
  right: -80px;
  cursor: pointer;
}
.transmission{
  font-size: 30px;
  position: fixed;
  right: 180px;
  top: 25px;
  cursor: pointer;
}
.transmission:hover{
  color: rgb(33, 155, 254);
}
.searchbox{
  top: 25px;
  position: fixed;
  width: 240px;
  right: 230px;
}

.el-breadcrumb{
  margin-top: 33px;
  margin-left: 20px;
  
}
.el-breadcrumb__item{
  font-size: 22px;
}
.Toptaskbar{
  position: fixed;
  z-index: 200;
  width: 100%;
  margin-left: 240px;
  height: 90px;
  transition: all .4s;
  background: rgb(255, 255, 255);
}
.Toptaskbar2{
  
  width: 100%;
  z-index: 200;
  position: fixed;
  background: rgb(255, 255, 255);
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
  font-size: 30px;
  
}
.el-dropdown-link:hover{
  color: rgb(33, 155, 254);
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
  transition: all .2s;
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


