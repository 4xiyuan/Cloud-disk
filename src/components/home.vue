<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
    <div @change="StateChange()" class="allbox"><el-checkbox  v-model="checkeds">全选</el-checkbox></div>
    <li style="float: left;list-style-type: none;" v-for="index in list" :key="index">
        <div class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null"  :class="['Alayer-x',{'is-choice':checked[index-1]} ]">
            <div  v-show="boxindex==index||checked[index-1]"><el-checkbox  v-model="checked[index-1]"></el-checkbox></div>
            <div v-show="boxindex==index&&!checked[index-1]" class="choicebox">
              <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >下载</el-dropdown-item>
                    <el-dropdown-item >重命名</el-dropdown-item>
                    <el-dropdown-item >移动</el-dropdown-item>
                    <el-dropdown-item >分享</el-dropdown-item>
                    <el-dropdown-item >同步本地文件</el-dropdown-item>
                    <el-dropdown-item >移动至我的隐私</el-dropdown-item>
                    <el-dropdown-item ><span style="color: rgb(255, 0, 0);">移至回收站</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div  class="tubiao" ><img style="margin-top: 10px;" src="../../public/photo/folder.png" width="100px" height="80px"></div>
            <div v-if="index%2==0" class="Alayer-text">未必哦擦</div>
            <div v-else class="Alayer-text">年我无法就怕宋朝你们那么怕哇哦的骄傲没骄傲没骄傲没</div>
            <div class="time">2022/08/09 16:40</div>
            <div style="height: 10px;"></div>
          </div>
        </div>
    </li>

    <div v-show="SelectedFile!=null" :class="sidebartypes ? 'multi-select' :'multi-select2'">
      <div class="selectbox" title="下载"><img style="margin-top: 5px;" src="../../public/photo/download.png" width="20px" height="20px"></div>
      <div class="selectbox" title="移动至"><img style="margin-top: 5px;" src="../../public/photo/mobile.png" width="20px" height="20px"></div>
      <div class="selectbox" title="移动至我的隐私"><img style="margin-top: 5px;" src="../../public/photo/suo.png" width="20px" height="20px"></div>
      <div class="selectbox" title="放入回收站"><img style="margin-top: 5px;" src="../../public/photo/delete.png" width="20px" height="20px"></div>
      <div class="selectbox" title="取消多选"><img style="margin-top: 5px;" src="../../public/photo/cancel.png" width="20px" height="20px"></div>
    </div>
    
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
          //已选中文件
          SelectedFile:null,
          //悬浮于哪一个文件下标
          boxindex:null,
          //文件列表长度
          list:66,
          //全选
          checkeds:false,
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
   watch:{
    'checked'(){
      this.SelectedFile=null
      for(var i =0;i<this.checked.length;i++){
        if(this.checked[i]==true){
          this.SelectedFile=1
        }
      }
    }
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
    //更新已选中文件内容
    StateChange(){
      if(this.checkeds==true){
        this.checked=[]
        for(var i=0;i<this.list;i++){
        this.checked.push(true)
      }
      }else{
        this.listnum()
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

.multi-select{
  z-index: 300;
  width: 270px;
  position: fixed;
  left: 47%;
  bottom: 100px;
  height: 50px;
  border-radius: 15px;
  background: rgb(0, 0, 0);
  transition: all .4s;
}

.multi-select2{
  z-index: 300;
  width: 270px;
  position: fixed;
  left: 40%;
  bottom: 100px;
  height: 50px;
  border-radius: 20px;
  background: rgb(0, 0, 0);
  transition: all .4s;
}
.selectbox{
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-top: 9px;
  margin-left: 20px;
  float: left;
  cursor: pointer;
  border-radius: 5px;
}
.selectbox:hover{
  background: rgb(113, 113, 113);
}
.allbox{
  z-index: 300;
  width: 100%;
  height: 30px;
  background: #ffffff;
  position: fixed;
  margin-top: -20px;
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
  margin-top: 110px;
  position: absolute;
  width: 96%-240px;
  margin-left: 1%;
}
.xlayer2{
  margin-top: 110px;
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
