<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
    <div v-if="list==[]||list==null" class="NoText">回收站暂无文件</div>
    <div v-if="list!=[]&&list!=null" class="allbox"><el-checkbox @change="StateChange()" v-model="checkeds">全选</el-checkbox></div>
    <li style="float: left;list-style-type: none;" v-for="item,index in list" :key="index">
        <div  class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null"  :class="['Alayer-x',{'is-choice':checked[index]} ]">
            <div @click.stop v-show="boxindex==index||checked[index]"><el-checkbox   v-model="checked[index]"></el-checkbox></div>
            <div v-show="boxindex==index&&!checked[index]" @click.stop class="choicebox">
              <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="Reduction(item.fileId)">恢复</el-dropdown-item>
                    <el-dropdown-item @click.native="Deletes(item.fileId,item.deleteId,item.belongId,item.fileSize)"><span style="color: rgb(255, 0, 0);">彻底删除</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-if="item.fileType=='folder'" class="tubiao" ><img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="100px" height="80px"></div>
            <div v-else class="tubiao" ><img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="80px" height="80px"></div>
            <div  class="Alayer-text">{{item.fileName}}</div>
            <div class="time">{{item.time}}</div>
            <div style="height: 10px;"></div>
          </div>
        </div>
    </li>

    <div v-show="SelectedFile.length>0" :class="sidebartypes ? 'multi-select' :'multi-select2'">
      <div @click="Reductions()" class="selectbox" title="恢复"><img  style="margin-top: 5px;" src="../../public/photo/recovery.png" width="20px" height="20px"></div>
      <div @click="Deletes()" class="selectbox" title="彻底删除"><img style="margin-top: 5px;" src="../../public/photo/delete.png" width="20px" height="20px"></div>
      <div class="selectbox" title="取消多选" ><img @click="checkeds = false;StateChange()" style="margin-top: 5px;" src="../../public/photo/cancel.png" width="20px" height="20px"></div>
    </div>
    <!-- <a v-show="false" ref="downs" href="xxx.txt" download="xxx.txt"></a> -->  

  </div> 
</template>

<script type="text/javascript">
import download from "downloadjs";
import {file,getrecycler,reduction,deletes} from "../apis/index"
   export default {
    inject:['reload'],
   data() {
       return {
        //侧边栏状态
          sidebartypes:sessionStorage.getItem('sidebartype')=='true',
          //文件选择状态
          checked:[],
          //已选中文件
          SelectedFile:[],
          //悬浮于哪一个文件下标
          boxindex:null,
          //文件列表
          list:[],
          //全选
          checkeds:false,
       }
   },
   created(){
    this.setSessionItem('sidebarnum','4')
    this.getuserfile()
   },
   mounted(){
    window.addEventListener("setItem", () => {
      if(sessionStorage.getItem("sidebartype")=='true'){
          this.sidebartypes = true
      }else{
        this.sidebartypes = false
      }
      this.Searchbox = sessionStorage.getItem('searchtext')
    });
   },
   watch:{
    'checked'(){
      this.SelectedFile=[]
      for(var i =0;i<this.checked.length;i++){
        if(this.checked[i]==true){
          this.checkeds = true
          this.SelectedFile.push({"fileId":this.list[i].fileId,"deleteId":this.list[i].deleteId,belongId:this.list[i].belongId,'filesize':this.list[i].fileSize})
          
        }else{
          this.checkeds = false
        }
      }
    },
   },
   methods:{
    //批量还原文件
    Reductions(){
      let data = {
        userId:sessionStorage.getItem('userid'),
        fileIds:[]
      }
      this.SelectedFile.forEach(item => {
        data.fileIds.push(item.fileId)
      });
      console.log(data);
      reduction(data).then((res=>{
        this.getuserfile()
        this.$message({
          message: '文件恢复成功！',
          type: 'success'
        });
      }))
    },
    //还原文件
    Reduction(fileId){
      let data = {
        userId:sessionStorage.getItem('userid'),
        fileIds:[]
      }
      data.fileIds.push(fileId)
      console.log(data)
      reduction(data).then((res=>{
        this.getuserfile()
        this.$message({
          message: '文件恢复成功！',
          type: 'success'
        });
      }))
    },
    //获取用户文件信息
    getuserfile(){
      let data = {
        userId:sessionStorage.getItem('userid')
      }
      getrecycler(data).then((res=>{
        if(res.status==200){
          if(res.data.data){
            this.setSessionItem('listLength','false')
          }
          this.list = res.data.data  
          this.listnum()
        }
      }))
    },
    //更新文件列表长度
    listnum(){
      this.checked=[]
      if(this.list){
        for(let i=0;i<this.list.length;i++){
        this.checked.push(false)
        }
      }
      
    },
    //彻底删除
    Deletes(fileId,deleteId,belong,filesize){
      if(fileId!=null&&deleteId!=null){
        let data = {
          userId:sessionStorage.getItem('userid'),
          dlist:[deleteId],
          flist:[fileId],
          blist:[belong],
          slist:[filesize]

        }
       deletes(data).then((res=>{
        if(res.data.code ==200){
          this.$message.success(res.data.msg);
          this.getuserfile()
          this.setSessionItem('Space',"true")
        }else{
          this.$message.error(res.data.msg);
        }
       }))
      }else{
        let data = {
          userId:sessionStorage.getItem('userid'),
          dlist:[],
          flist:[],
          blist:[],
          slist:[]
        }
        this.SelectedFile.forEach(item => {
          data.dlist.push(item.deleteId)
          data.flist.push(item.fileId)
          data.blist.push(item.belongId)
          data.slist.push(item.filesize)

        });
        deletes(data).then((res=>{
        if(res.data.code ==200){
          this.$message.success(res.data.msg);
          this.setSessionItem('Space',"true")
          this.getuserfile()
        }else{
          this.$message.error(res.data.msg);
        }
       }))
      }
    },
    //更新已选中文件内容
    StateChange(){
      if(this.checkeds==true){
        this.checked=[]
        for(var i=0;i<this.list.length;i++){
        this.checked.push(true)
      }
      }else{
        this.listnum()
      }
      
    },
    beforeDestroy() {
    // 移除对 sessionStorage 的监听
    window.removeEventListener("setItem", () => {});
  },
   }
   }
</script>

<style scoped>

.NoText{
  position: absolute;
  font-size: 30px;
  width: 220px;
  margin-left: 40%;
  margin-top: 15%;
  
}

*{
    margin:0;
    padding:0;
  }




.el-dialog__wrapper >>> .el-dialog{
  border-radius: 20px;
  }
.el-dialog__wrapper >>>.el-dialog__body{
  height: 300px;
  overflow: auto;
}



body {
  margin:0;
  padding:0;
  border:0;
}

.multi-select{
  z-index: 300;
  width: 170px;
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
  width: 170px;
  position: fixed;
  left: 47%;
  bottom: 100px;
  height: 50px;
  border-radius: 15px;
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
  width: 86%;
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
