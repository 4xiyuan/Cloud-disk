<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
    <div  class="allbox"><el-checkbox @change="StateChange()" v-model="checkeds">全选</el-checkbox></div>
    <li style="float: left;list-style-type: none;" v-for="item,index in list" :key="index">
        <div v-if="item.belong==item.userId+'/'||item.belong==item.userId+'\\'" class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null"  :class="['Alayer-x',{'is-choice':checked[index]} ]">
            <div  v-show="boxindex==index||checked[index]"><el-checkbox  v-model="checked[index]"></el-checkbox></div>
            <div v-show="boxindex==index&&!checked[index]" class="choicebox">
              <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="item.fileType=='folder'" @click.native="open()" >打开</el-dropdown-item>
                    <el-dropdown-item v-else @click.native="down(item.fileName,item.belong)" >下载</el-dropdown-item>
                    <el-dropdown-item @click.native="Rename(item.fileName,item.belong,item.fileType)">重命名</el-dropdown-item>
                    <el-dropdown-item >移动</el-dropdown-item>
                    <el-dropdown-item >分享</el-dropdown-item>
                    <el-dropdown-item >同步本地文件</el-dropdown-item>
                    <el-dropdown-item >移动至我的隐私</el-dropdown-item>
                    <el-dropdown-item ><span style="color: rgb(255, 0, 0);">移至回收站</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-if="item.fileType=='folder'" class="tubiao" ><img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="100px" height="80px"></div>
            <div v-else class="tubiao" ><img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="80px" height="80px"></div>
            <div  class="Alayer-text">{{item.fileName}}</div>
            <div class="time">{{item.uploadTime}}</div>
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
    <!-- <a v-show="false" ref="downs" href="xxx.txt" download="xxx.txt"></a> -->

    <el-dialog
        v-if="filetype"
        title="文件重命名"
        :visible.sync="dialogVisibles"
        width="400px">
        <div class="NewFolder">
          <img v-if="filetype=='folder'"  src="../../public/photo/folder.png" width="100px" height="80px">
          <img v-else :src="require('../../public/photo/'+filetype+'.png')" width="80px" height="80px">
        </div>
        <div style="margin-top: 30px;"><el-input v-model="NewFolderNames" placeholder="文件夹名称"></el-input></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="enames()">确 定</el-button>
        </span>
      </el-dialog>
  </div> 
</template>

<script type="text/javascript">
import download from "downloadjs";
import {downloads,file,rename} from "../apis/index"
   export default {
   data() {
       return {
        //修改文件名时文件的类型
          filetype:null,
        //侧边栏状态
          sidebartypes:sessionStorage.getItem('sidebartype')=='true',
          //文件选择状态
          checked:[],
          //已选中文件
          SelectedFile:null,
          //悬浮于哪一个文件下标
          boxindex:null,
          //文件新名字
          NewFolderNames:null,
          //文件列表
          list:[],
          //全选
          checkeds:false,
          //文件重命名层
          dialogVisibles:false,
       }
   },
   created(){
    this.listnum()
    this.getuserfile()
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
    //获取用户文件信息
    getuserfile(){
      let data = {
        id:'1'
      }
      file(data).then((res=>{
        if(res.status==200){
          this.list = res.data.data  
        }
      }))
    },
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
        for(var i=0;i<this.list.length;i++){
        this.checked.push(true)
      }
      }else{
        this.listnum()
      }
      
    },
    async down(name,belong){
      //文件流
      // let data = {
      //   fileNath:"D:@bishe@file@1@大视频.mp4",
      //   id:"1",
      // }
      // download(data).then((res=>{
      //   // console.log(res)
      //   // var fileName = "xiao.mp4"
      //   // let blob = new Blob([res.request.response], {type:"application/octet-stream"});
      //   // var downloadElement = document.createElement("a");
      //   // var href = window.URL.createObjectURL(blob); //常见下载的链接
      //   // downloadElement.href = href;
      //   // downloadElement.download = fileName; //下载后文件名
      //   // document.body.appendChild(downloadElement);
      //   // downloadElement.click(); //点击下载
      //   // document.body.removeChild(downloadElement); //下载完成移除元素
      //   // window.URL.revokeObjectURL(href);  //释放blob对象
      // }))

      //url地址
      let Name = belong+name+''
      Name = Name.replace(/\\/g, '@-.@')
      let data = {
        fileName:Name,
        id:"1"
      }
      downloads(data).then(( async res=>{
        if (res.status==200) {
            // const link = document.createElement('a')
            // link.href = res.data.data
            // link.target = '_blank'
            // link.setAttribute('download', '11.mp4') 
            // document.body.appendChild(link)
            // link.click()
            const h = this.$createElement;
            let notify= this.$notify({
              title:'文件解析中',
              dangerouslyUseHTMLString: true,
              message:h('div',[h('i',{class:"el-icon-loading"},),h( 'div','文件越大,解析越耗时,请耐心等待！'),]),
              showClose: false,
              duration:0,
            });
            fetch(res.data.data).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = name;
                    // link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    notify.close()
                    link.remove();
                }).catch(() => {
                    notify.close()
                    this.$message.error('服务器出错,请稍后重试！');
                    
                });
          }
      }))
    },
    //修改文件名层弹出
    Rename(name,belong,type){
      this.NewFolderNames = name
      this.filetype = type
      this.dialogVisibles = true
      let data = {
        id:'1',
        oldFilePath:belong+name,
        newFilePath:belong
      }
      this.dat = data
    },
    enames(){
      if(!this.NewFolderNames) {
        this.$message.error('文件名不能为空！');
        return
        }
      let data = this.dat
      data.newFilePath = data.newFilePath+this.NewFolderNames
      rename(data).then((res=>{
        if(res.data.code==200){
          this.dialogVisible = false
          window.location.reload();
          this.$message.success('文件重命名成功！');

        }else{
           this.$message.error(res.data.msg);
        }
      }))
    }

    
   }
   }
</script>

<style scoped>
*{
    margin:0;
    padding:0;
  }
.el-icon-loading{
  position: absolute;
  font-size: 18px;
  font-weight: 1000;
  margin-top: -25px;
  margin-left: 85px;
  }
.NewFolder{
  margin-top: 20px;
  margin-left: 140px;
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
