<template>
  <div v-if="!isPassword" class="big-box">
    <div :class="sidebartypes? 'activation2':'activation'">
      <div style="height: 300px;"></div>
      <el-result icon="info" :title=" isfilt? '尚未设置二级密码' :'激活密码箱'" :subTitle=" isfilt? '点击按钮设置二级密码' :'点击按钮激活激活密码箱'">
          <template slot="extra">
            <el-button v-if="!isfilt" @click="dialogVisible=true" type="primary" size="medium">激活</el-button>
            <el-button v-else @click="dialogVisible=true" type="primary" size="medium">设置</el-button>
          </template>
        </el-result>
    </div>

    <el-dialog
      title="请输入密码"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      width="23%"
      class="Safebox">
      <el-input v-model="userSafebBoxpassword" placeholder="请输入密码" type="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>&nbsp;
        <button   @click="setpassword()">确 定</button>
      </span>
    </el-dialog>
  </div>

  <div v-else  :class="sidebartypes ? 'xlayer' :'xlayer2'">
    <div v-if="list==[]||list==null||list.length<=0" class="NoText">我的隐私暂无文件</div>
    <!-- <div v-if="list!=[]&&list!=null" class="allbox"><el-checkbox @change="StateChange()" v-model="checkeds">全选</el-checkbox></div> -->
    <li style="float: left;list-style-type: none;" v-for="item,index in list" :key="index">
        <div  class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null"  :class="['Alayer-x',{'is-choice':checked[index]} ]">
            <!-- <div @click.stop v-show="boxindex==index||checked[index]"><el-checkbox   v-model="checked[index]"></el-checkbox></div> -->
            <div v-show="boxindex==index&&!checked[index]" @click.stop class="choicebox">
              <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="PutMylist(item.fileId,item.duYou)">还原出我的隐私</el-dropdown-item>
                    <el-dropdown-item @click.native="down(item.filePath,item.fileName,item.fileType)">下载</el-dropdown-item>
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

    <!-- <div v-show="SelectedFile.length>0" :class="sidebartypes ? 'multi-select' :'multi-select2'">
      <div @click="Reductions()" class="selectbox" title="恢复"><img  style="margin-top: 5px;" src="../../public/photo/recovery.png" width="20px" height="20px"></div>
      <div @click="Deletes()" class="selectbox" title="彻底删除"><img style="margin-top: 5px;" src="../../public/photo/delete.png" width="20px" height="20px"></div>
      <div class="selectbox" title="取消多选" ><img @click="checkeds = false;StateChange()" style="margin-top: 5px;" src="../../public/photo/cancel.png" width="20px" height="20px"></div>
    </div> -->
    <!-- <a v-show="false" ref="downs" href="xxx.txt" download="xxx.txt"></a> -->  

  </div> 
  
</template>

<script type="text/javascript">
import { triggerRef } from 'vue';
import {checkUser,getUser,setUserPassword,getMylist,putMylist,downloads} from '../apis/index'
   export default {
   data() {
       return {
        //是否激活密码状态
        isPassword:false,
        //密码箱状态
        dialogVisible:false,
        input:null,
        //侧边栏状态
        sidebartypes:sessionStorage.getItem('sidebartype')=='true',
        stu:false,
        userSafebBoxpassword:null,
        isfilt:false,
        list:[],
        checkeds:false,
        checked:[],
        SelectedFile:[],
        boxindex:null
       }
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
   created(){
    this.setSessionItem('sidebarnum','3')
    this.GetUser()
    this.getmylist()
   },
   methods:{
    down(filepath,name,type){
      //文件流
      // let data = {
      //   fileNath:"D:@bishe@file@1@大视频.mp4",
      //   id:"1",
      // }
      // download(data).then((res=>{
      //   // console.log(res)xia
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
      let data = {
        filePath:filepath,
        userId:sessionStorage.getItem('userid')
      }
      downloads(data).then(( async res=>{
        if (res.data.code==200) {
          // if(type=='mp4'||type=='jpg'||type=='png'||type=='txt'){
          if(true){
            const h = this.$createElement;
                        let notify= this.$notify({
                          title:'文件解析中',
                          dangerouslyUseHTMLString: true,
                          message:h('div',[h('i',{class:"el-icon-loading"},),h( 'div','文件越大,解析越耗时,请耐心等待！'),]),
                          showClose: false,
                          duration:0,
                        });

                        fetch(res.data.data.url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = name;
                                // link.target = '_blank';
                                document.body.appendChild(link);
                                link.click();
                                notify.close()
                                link.remove()
                            }).catch(() => {
                                notify.close()
                                
                                
                            });
          }else{
            const link = document.createElement('a')
            link.href = res.data.data.url
            // link.target = '_blank'
            link.setAttribute('download', name) 
            document.body.appendChild(link)
            link.click()
          }

            
          }else{
            this.$message.error(res.data.msg);
          }
      }))
    },
    PutMylist(fileId,collectId){
      let data = {
        userId:sessionStorage.getItem('userid'),
        collectIdList:[collectId+""],
        fileIdList:[fileId]
      }
      putMylist(data).then((res=>{
        if(res.data.code==200){
          this.getmylist()
          this.$message.success(res.data.msg)
        }else{
          this.$message.error(res.data.msg)
        }
      }))
    },
    GetUser(){
      let data = {
        userId:sessionStorage.getItem('userid'),
      }
      getUser(data).then((res=>{
        console.log(res);
        if(res.data.data.secondPassword==""){
          this.isfilt = true
        }else{
          this.isfilt = false
        }
      }))
    },
    getmylist(){
      let data = {
        userId:sessionStorage.getItem('userid')
      }
      getMylist(data).then((res=>{
        console.log(res);
        if(res.data.code ==200){
          console.log(res);
          this.list = res.data.data
        }else{
          this.list = res.data.data
        }
        this.listnum()
      }))
    },
    listnum(){
      this.checked=[]
      if(this.list){
        for(let i=0;i<this.list.length;i++){
        this.checked.push(false)
        }
      }
      
    },
    setpassword(){
      if(this.isfilt){
        if(this.userSafebBoxpassword){
        let data = {
          userId:sessionStorage.getItem('userid'),
          sePassword:this.userSafebBoxpassword
        }
        setUserPassword(data).then((res=>{
          console.log(res.data.code ==200);
          if(res.data.code ==200){
            this.$message.success(res.data.msg)
            this.GetUser()
            this.dialogVisible = false
            this.userSafebBoxpassword =null
          }else{
            this.$message.error(res.data.msg)
          }
          
        }))
      }else{
        this.$message.error('二级密码不能为空！');
      }
      }else{
        if(this.userSafebBoxpassword){
        let data = {
          userId:sessionStorage.getItem('userid'),
          sePassword:this.userSafebBoxpassword
        }
        checkUser(data).then((res=>{
          if(res.data.code ==200){
            this.$message.success(res.data.msg)
            this.isPassword = true
            this.dialogVisible = false
            this.userSafebBoxpassword =null
          }else{
            this.$message.error(res.data.msg)
          }
        }))
      }else{
        this.$message.error('二级密码不能为空！')
      }
      }

    },

    
   }
   }
</script>

<style scoped>
.big-box{
  width: 100%;
  position: absolute;
  margin-top: 90px;
  
}

button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}
.Safebox{
  margin-top: 10%;
}
.Safebox>>>.el-dialog{
  border-radius: 15px;
}
.Safebox>>>.el-dialog__body{
  height: 50px;
}
.activation{
  top: 0;
  left: 0;
  right: 0;
  margin:  auto;
  width: 300px;
  position: absolute;
  transform: all .4s;
}
.activation2{
  top: 0;
  left: -240px;
  right: 0;
  margin:  auto;
  width: 300px;
  position: absolute;
  transition: all .4s;
}


.NoText{
  position: absolute;
  font-size: 30px;
  width: 240px;
  margin-left: 40%;
  margin-top: 15%;
  
}

*{
    margin:0;
    padding:0;
  }




/* .el-dialog__wrapper >>> .el-dialog{
  border-radius: 20px;
  }
.el-dialog__wrapper >>>.el-dialog__body{
  height: 300px;
  overflow: auto;
} */



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
