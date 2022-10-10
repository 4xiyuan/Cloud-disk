<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
    <li style="float: left;list-style-type: none;" v-for="index in list" :key="index">
        <div class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null"  :class="['Alayer-x',{'is-choice':checked[index]} ]">
            <div  v-show="boxindex==index||checked[index]"><el-checkbox v-model="checked[index]"></el-checkbox></div>
            <div v-show="boxindex==index" class="choicebox">
              <el-dropdown trigger="click" placement="top-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >下载</el-dropdown-item>
                    <el-dropdown-item >移至回收站</el-dropdown-item>
                    <el-dropdown-item >分享</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div  class="tubiao" ><img style="margin-top: 10px;" src="../../public/photo/video.png" width="80px" height="80px"></div>
            <div v-if="index%2==0" class="Alayer-text">米兰的小铁匠.mp4</div>
            <div v-else class="Alayer-text">发如雪.mp4</div>
            <div class="time">2022/08/09 16:40</div>
            <div style="height: 10px;"></div>
          </div>
        </div>
    </li>
    
  </div> 
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        //侧边栏状态
          sidebartypes:sessionStorage.getItem('sidebartype')=='true',
          //文件选择状态
          checked:[],
          //悬浮于哪一个文件下标
          boxindex:null,
          //文件列表长度
          list:16,
       }
   },
   created(){
    this.listnum()
   },
   mounted(){
    window.addEventListener("setItem", () => {
      if(sessionStorage.getItem("sidebartype")=='true'){
          this.sidebartypes = true
      }else{
        this.sidebartypes = false
      }
    });
   },
   methods:{
    gto(){
      this.$router.push('/folder')
    },
    //更新文件列表长度
    listnum(){
      this.checked=[]
      for(var i=0;i<this.list;i++){
        this.checked.push(false)
      }
    },
   }
   }
</script>

<style scoped>
*{
    margin:0;
    padding:0;
  }
body {
  margin:0;
  padding:0;
  border:0;
}
.el-dropdown{
  height: 10px;
}
.el-dropdown-link{
  font-size: 15px;
}
.choicebox{
  border-radius: 15px;
  text-align: center;
  line-height: 15px;
  background: #ffffff;
  position: absolute;
  width: 30px;
  height: 15px;
  margin-left: 80px;
  margin-top: 5px;
}
.el-checkbox {
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
}
.el-checkbox >>> .el-checkbox__input{
  width: 20px;
  height: 20px;
}
.el-checkbox >>> .el-checkbox__inner{
  width: 20px;
  height: 20px;
  border-radius: 50px;
  
}
.el-checkbox >>> .el-checkbox__inner::after{
  margin-top: 2px;
  margin-left: 2px;
}

.xlayer{
  margin-top: 90px;
  position: absolute;
  width: 96%-240px;
  margin-left: 1%;
}
.xlayer2{
  margin-top: 90px;
  position: absolute;
  width: 96%;
  margin-left: 3%;
}
.Alayer{
  width: 120px;
  height: 180px;
  margin-top: 20px;
  margin-left: 43px;
}
.Alayer-x{
  border-radius: 10px;
  width: 120px;
  max-height: 180px;
  cursor: pointer;
}
.is-choice{
  background: rgb(241, 241, 241);
}
.Alayer-x:hover{
  background: rgb(241, 241, 241);
}
.tubiao{
  width: 120px;
  height: 100px;
  text-align: center;
}
.Alayer-text{
  
  width: 120px;
  max-height: 40px;
  
  text-align: center;
  font-size: 14px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow-wrap: break-word;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
}
.time{
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: rgb(161, 160, 160);
}
</style>
