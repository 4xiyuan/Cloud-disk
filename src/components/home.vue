<template>
  <div @contextmenu.prevent="onContextmenu" :class="sidebartypes ? 'xlayer' :'xlayer2'" >
    <div v-if="list!=[]&&list!=null" class="allbox"><el-checkbox @change="StateChange()" v-model="checkeds">全选</el-checkbox></div>
    <li v-if="shuaxin" style="float: left;list-style-type: none;" v-for="item,index in list" :key="index">
        <div v-if="isshow||item.belongId=='' " class="Alayer " >
          <div @mouseover="boxindex=index" @mouseleave="boxindex=null" @click="opens(item.filePath,item.fileType,item.fileName,item.cbelong)" :class="['Alayer-x',{'is-choice':checked[index]} ]">
            <div @click.stop v-show="boxindex==index||checked[index]"><el-checkbox   v-model="checked[index]"></el-checkbox></div>
            <div v-show="boxindex==index&&!checked[index]" @click.stop class="choicebox">
              <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="item.fileType!='folder'"  @click.native="prev(item.filePath,item.fileType)" >预览</el-dropdown-item>
                    <el-dropdown-item v-if="item.fileType=='folder'"  @click.native="open(item.cbelong)" >打开</el-dropdown-item>
                    <el-dropdown-item v-else @click.native="down(item.filePath,item.fileName,item.fileType)" >下载</el-dropdown-item>
                    <el-dropdown-item @click.native="Rename(item.fileName,item.belongId,item.fileType,item.fileId,item.folderBelongId)">重命名</el-dropdown-item>
                    <el-dropdown-item @click.native="Move(item.fileId,item.belongId,item.folderBelongId,item.fileType)">移动</el-dropdown-item>
                    <el-dropdown-item @click.native="Share(item.fileType,item.fileName)">分享</el-dropdown-item>
                    <el-dropdown-item @click.native="AddMylist(item.fileType,item.fileId,item.cbelong)" v-if="item.fileType!='folder'" >移动至我的隐私</el-dropdown-item>
                    <el-dropdown-item @click.native="Recycler(item.fileId,item.fileType,item.cbelong)" ><span style="color: rgb(255, 0, 0);">移至回收站</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-if="item.fileType=='folder'" class="tubiao" ><img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="100px" height="80px"></div>
            <div v-else-if="'7zrardocdocxepubjpgpngmp4mp3pdfzipxlsxlsx'.indexOf(item.fileType)!=-1" class="tubiao" >
              <img style="margin-top: 10px;" :src="require('../../public/photo/'+item.fileType+'.png')" width="80px" height="80px">
            </div>
            <div v-else  class="tubiao">
              <img style="margin-top: 10px;" :src="require('../../public/photo/unknown.png')" width="80px" height="80px">
            </div>
            <div  class="Alayer-text">{{item.fileName}}</div>
            <div class="time">{{item.uploadTime}}</div>
            <div style="height: 10px;"></div>
          </div>
        </div>
    </li>
    <div v-show="SelectedFile.length>0" :class="sidebartypes ? 'multi-select' :'multi-select2'">
      <div @click="downs()" class="selectbox" title="下载"><img  style="margin-top: 5px;" src="../../public/photo/download.png" width="20px" height="20px"></div>
      <div @click="Moves()" class="selectbox" title="移动至"><img style="margin-top: 5px;" src="../../public/photo/mobile.png" width="20px" height="20px"></div>
      <div @click="AddMylists()" class="selectbox" title="移动至我的隐私"><img style="margin-top: 5px;" src="../../public/photo/suo.png" width="20px" height="20px"></div>
      <div @click="Recyclers()" class="selectbox" title="放入回收站"><img style="margin-top: 5px;" src="../../public/photo/delete.png" width="20px" height="20px"></div>
      <div @click="checkeds = false;StateChange()" class="selectbox" title="取消多选"><img  style="margin-top: 5px;" src="../../public/photo/cancel.png" width="20px" height="20px"></div>
    </div>
    <!-- <a v-show="false" ref="downs" href="xxx.txt" download="xxx.txt"></a> -->

    <!-- 文件重命名 -->
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

      <!-- 移动文件 -->
      <el-dialog
        class="a1"
        :visible.sync="movetype"
        width="450px">
        <div slot="title" class="move-title">
          移动至
          <div v-if="record.length<=1" class="move-title-back" >
            <i class="el-icon-back"></i>
          </div>
          <div v-else class="move-title-back2" >
            <i class="el-icon-back" @click="belongback()"></i>
          </div>
          </div>
        <div class="move-box">
          <li style="list-style-type: none;" v-for="item,index in movelist" :key="index">
            <div v-if="item.fileType=='folder'" @click="Refresh(item.cbelong,item.fileName)" class="move-min-box">
              <div class="move-img"><img src="../../public/photo/folder.png" width="40px" height="32px"></div>
              <div class="move-text">{{item.fileName}}</div>
            </div>
          </li>
        </div>
        <span slot="footer" class="dialog-footer">
          <span style="float:left;color: rgb(58, 140, 255);font-size:14px;float: left;">移动至：</span>
            <li v-if="record.length<=5" style="list-style-type: none;float: left;font-size:14px;" v-for="item,index in record">
              <span v-if="index!=record.length-1" style="color: rgb(177, 176, 176);">{{item.name}}\</span>
              <span v-else style="color: rgb(0, 0, 0);">{{item.name}}\</span>
            </li>
            <li v-if="record.length>5" style="list-style-type: none;float: left;font-size:14px;" v-for="item,index in record">
              <span v-if="index==0" style="color: rgb(177, 176, 176);">{{item.name}}\</span>
              <span v-if="index==record.length-4" style="color: rgb(177, 176, 176);">...\</span>
              <span v-if="index==record.length-3" style="color: rgb(177, 176, 176);">{{item.name}}\</span>
              <span v-if="index==record.length-2" style="color: rgb(177, 176, 176);">{{item.name}}\</span>
              <span v-if="index==record.length-1" style="color: rgb(0, 0, 0);">{{item.name}}\</span>
            </li>
          <!-- <el-button type="primary" @click="Movement()">移动到此处</el-button> -->
          <button @click="Movement()">移动到此处</button>
        </span>
      </el-dialog>

      <!--分享文件 -->
      <el-dialog :visible.sync="sharetype"  width="500px" class="shares">
        <div class="share-box">
          <div slot="title" class="share-text">分享文件</div>
          <div v-if="FileType" class="share-img">
            <img v-if="FileType=='folder'" style="margin-top: 10px;margin-left:-10px;" :src="require('../../public/photo/'+FileType+'.png')" width="100px" height="80px">
            <img v-else style="margin-top: 10px;" :src="require('../../public/photo/'+FileType+'.png')" width="80px" height="80px">
          </div>
          <div class="share-name">{{FileName}}</div>
          <div class="share-choice1">
            选择有效期
            <el-select v-model="value1"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="share-choice2">
            <el-select v-model="value2"  placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="share-button"><button>创建分享</button></div>
          



        </div>
      </el-dialog>


      <!-- 预览文件 -->
      <el-drawer
        size="100%"
        :visible.sync="drawer"
        direction="btt">
        <div class="big-box">
          <div v-if="filestatus=='mp4'" class="video-box">
            <video
              ref="myVideo"
              :src="src"
              :controls="controls"xlayer
              controlslist="nodownload"
              class="video-boxs"
            ></video>
          </div>

          <div v-if="filestatus=='jpg'||filestatus=='png'" class="img-box">
              <el-image :src="src"></el-image>
          </div>

          <div>
              <iframe
                v-if="filestatus=='pdf'"
                :src="src"
                frameborder="0"
                width="100%"
                height="500px"
              ></iframe>
          </div>
        </div>
      </el-drawer>

      <el-dialog
        title="新建文件夹"
        :visible.sync="dialogVisible"
        width="400px">
        <div class="NewFolder"><img  src="../../public/photo/folder.png" width="100px" height="80px"></div>
        <div style="margin-top: 30px;"><el-input v-model="NewFolderName" placeholder="文件夹名称"></el-input></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addFolder()">确 定</el-button>
        </span>
      </el-dialog>
    

    
      
      

  </div> 
</template>

<script type="text/javascript">
import download from "downloadjs";
import {downloads,file,rename,getfile,recycler,movement,addfolder,Downs,addMylist} from "../apis/index"
   export default {
    inject:['reload'],
   data() {
       return {
        //是否为批量移动
        ismoves:false,
        //新建文件夹层是否渲染变量
          dialogVisible:false,
          //新建文件夹名称
          NewFolderName:null,
        //是否显示文件
        shuaxin:true,
        //分享文件形式
        value2:'0',
        //分享文件形式选项
        options1: [{
          value: '0',
          label: '创建公开链接，不需要密码即可访问分享的文件！'
        }, {
          value: '1',
          label: '创建私密链接，需要输入密码才能访问分享文件！'
        },],
        //分享文件时效
        value1:'1',
        //分享文件时效选项
        options: [{
          value: '0',
          label: '7天内有效'
        }, {
          value: '1',
          label: '30天内有效'
        }, {
          value: '2',
          label: '永久有效'
        },],
        //分享文件时选中文件的名字
        FileName:"",
        //分享文件时选中文件的类型
        FileType:null,
        //分享文件层是否渲染
        sharetype:false,
        //总查询记录
        record:[],
        //保存文件的路径
        preservation:null,
        //文件预览的类型
        filestatus:null,
        //文件预览的地址
        src:null,
        controls: {
          type: Boolean,
          required: false,
          default: true
        },
        //文件预览层是否渲染
        drawer:false,
        //搜索框是否有内容
        isshow:false,
        //移动位置信息
        moveValue:null,
        //移动文件选择框是否显示
        movetype:false,
        //搜索框内容
        Searchbox:null,
        //修改文件名时文件的类型
          filetype:null,
        //侧边栏状态
          sidebartypes:sessionStorage.getItem('sidebartype')=='true',
          //文件选择状态
          checked:[],
          //已选中文件
          SelectedFile:[],
          //悬浮于哪一个文件下标
          boxindex:null,
          //文件新名字
          NewFolderNames:null,
          //文件列表
          list:[],
          //移动至文件列表
          movelist:[],
          //全选
          checkeds:false,
          //文件重命名层
          dialogVisibles:false,
       }
   },
   created(){
    this.$bus.$on('RefreshData',() =>{
        this.getuserfile()
      })
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
      this.checkeds = true
      for(var i =0;i<this.checked.length;i++){
        if(this.checked[i]==true){
            this.SelectedFile.push(
                                  {
                                    'path':this.list[i].filePath,
                                    'name':this.list[i].fileName,
                                    'type':this.list[i].fileType,
                                    'cBelongId':this.list[i].cbelong,
                                    'fileId':this.list[i].fileId,
                                    'belongId':this.list[i].belongId,
                                    'folderBelongId':this.list[i].folderBelongId,
                                    }
                                  )
        }else{
          this.checkeds = false
        }
      }
    },
    'Searchbox'(){
      if(this.Searchbox!=null&&this.Searchbox!=""&&this.Searchbox!='null'){
        this.isshow = true
        this.list = []
        let data = {
            id:sessionStorage.getItem('userid')
          }
          file(data).then((res=>{
            if(res.status==200){
              for(let i =0;i<res.data.data.length;i++){
                if(res.data.data[i].fileName.indexOf(this.Searchbox)!=-1){
                  this.list.push(res.data.data[i])
                }else{
                }
              }
            }
          }))
        
      }else{
        this.getuserfile()
        this.isshow = false
      }
    }
   },
   methods:{
    //移动至我的隐私
    AddMylist(type,fileId,cbelong){
      let data = {
        collectList:[
          {
            "cbelongId": cbelong,
            "fileId": fileId,
            "fileType": type
          }
        ]
      }
      addMylist(data).then((res=>{
        if(res.data.code==200){
          this.getuserfile()
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        }else{
          this.$message.error(res.data.msg)
        }
      }))
    },
    //批量移动至我的隐私
    AddMylists(){
      let data = {
        collectList:[]
      }
      this.SelectedFile.forEach(item => {
        let dat = {
        "cbelongId": item.cBelongId,
        "fileId": item.fileId,
        "fileType": item.type
        }
        data.collectList.push(dat)
        
      })
      addMylist(data).then((res=>{
        if(res.data.code==200){
          this.getuserfile()
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        }else{
          this.$message.error(res.data.msg)
        }
      }))
    },
    //批量放入回收站
    Recyclers(){
      let data = {
        recyclerList:[],
      }
      for(let a = 0;a<this.SelectedFile.length;a++){
        let dat = {
          userId:sessionStorage.getItem('userid'),
          fileId:this.SelectedFile[a].fileId,
          type:this.SelectedFile[a].type,
          cbelongId:this.SelectedFile[a].cBelongId
        }
        data.recyclerList.push(dat)
      }
      recycler(data).then((res=>{
        
        this.getuserfile()
        this.$message({
          message: '文件已加入回收站！',
          type: 'success'
        });
      }))
      

    },

    //批量下载
    downs(){
      let data = {
        id:sessionStorage.getItem('userid'),
        pathList:[]
      }
      for(let i = 0;i<this.SelectedFile.length;i++){
        if(this.SelectedFile[i].path!=null){
          let linshi = []
          linshi.push(this.SelectedFile[i].path)
          linshi.push(this.SelectedFile[i].type)
          linshi.push(this.SelectedFile[i].name)
          data.pathList.push(linshi)
        }
      }
      Downs(data).then((res=>{
        if(res.data.code==200){
          for(let a = 0;a<res.data.data.length;a++){
                  if(res.data.data[a].filetype=='mp4'||res.data.data[a].filetype=='jpg'||res.data.data[a].filetype=='png'||res.data.data[a].filetype=='txt'){
                  const h = this.$createElement;
                              let notify= this.$notify({
                                title:'文件解析中',
                                dangerouslyUseHTMLString: true,
                                message:h('div',[h('i',{class:"el-icon-loading"},),h( 'div','文件越大,解析越耗时,请耐心等待！'),]),
                                showClose: false,
                                duration:0,
                              });

                              fetch(res.data.data[a].url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
                                      const link = document.createElement('a');
                                      link.href = URL.createObjectURL(blob);
                                      link.download = res.data.data[a].fileName;
                                      // link.target = '_blank';
                                      document.body.appendChild(link);
                                      link.click();
                                      notify.close()
                                      link.remove();
                                  }).catch(() => {
                                      notify.close()
                                      this.$message.error('服务器出错,请稍后重试！');
                                      
                                  });
                }else{
                  const link = document.createElement('a')
                  link.href = res.data.data[a].url
                  // link.target = '_blank'
                  link.setAttribute('download', res.data.data[a].fileName) 
                  document.body.appendChild(link)
                  link.click()
                }
          }
        }
      }))
    },
    //右键菜单
       onContextmenu(event) {
      event.preventDefault()
      if(this.boxindex!=null){
        let fileindex  =this.boxindex
        if(this.list[fileindex].fileType!='folder'){
          this.$contextmenu({
            items: [
          {
            icon: "el-icon-edit",
            label: "重命名",
            onClick: () => {
              this.Rename(this.list[fileindex].fileName,this.list[fileindex].belongId,this.list[fileindex].fileType,this.list[fileindex].fileId,this.list[fileindex].folderBelongId)
            }
          },
          {
            icon: "el-icon-bottom",
            label: "下载",
            onClick: () => {
              this.down(this.list[fileindex].filePath,this.list[fileindex].fileName,this.list[fileindex].fileType)
            }
          },
           {
            icon: "el-icon-document-copy",
            label: "移动",
            onClick: () => {
              this.Move(this.list[fileindex].fileId,this.list[fileindex].belongId,this.list[fileindex].folderBelongId,this.list[fileindex].fileType)
            }
          },
          {
            icon: "el-icon-folder-opened",
            label: "移动至我的隐私",
            onClick: () => {
               this.AddMylist(this.list[fileindex].fileType,this.list[fileindex].fileId,this.list[fileindex].cbelong)
            }
          },
           {
            icon: "el-icon-s-promotion",
            label: "分享",
            onClick: () => {
              this.Share(this.list[fileindex].fileType,this.list[fileindex].fileName)
            }
          },
           {
            icon: "el-icon-delete",
            label: "移至回收站",
            onClick: () => {
              this.Recycler(this.list[fileindex].fileId,this.list[fileindex].fileType,this.list[fileindex].cbelong)
            }
          },
          
        ],
        event,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 100
      })
        }else{
        this.$contextmenu({
        items: [
          {
            icon: "el-icon-edit",
            label: "重命名",
            onClick: () => {
              this.Rename(this.list[fileindex].fileName,this.list[fileindex].belongId,this.list[fileindex].fileType,this.list[fileindex].fileId,this.list[fileindex].folderBelongId)
            }
          },
           {
            icon: "el-icon-document-copy",
            label: "移动",
            onClick: () => {
              this.Move(this.list[fileindex].fileId,this.list[fileindex].belongId,this.list[fileindex].folderBelongId,this.list[fileindex].fileType)
            }
          },
          {
            icon: "el-icon-folder-opened",
            label: "移动至我的隐私",
            onClick: () => {
              this.AddMylist(this.list[fileindex].fileType,this.list[fileindex].fileId,this.list[fileindex].cbelong)
            }
          },
           {
            icon: "el-icon-s-promotion",
            label: "分享",
            onClick: () => {
              this.Share(this.list[fileindex].fileType,this.list[fileindex].fileName)
            }
          },
           {
            icon: "el-icon-delete",
            label: "移至回收站",
            onClick: () => {
              this.Recycler(this.list[fileindex].fileId,this.list[fileindex].fileType,this.list[fileindex].cbelong)
            }
          },
          
        ],
        event,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 100
      })
      }
      }else{
        this.$contextmenu({
        items: [
          {
            icon: "el-icon-refresh",
            label: "刷新",
            onClick: () => {
              this.shuaxin = false
              this.getuserfile()
              let timer = setTimeout(() => {
              this.shuaxin = true
              }, 200)
            }
          },
          {
            icon: "el-icon-top",
            label: "上传文件",
            onClick: () => {
              this.setSessionItem('shang','true')
            }
          },
          {
            icon: "el-icon-folder-add",
            label: "新建文件夹",
            onClick: () => {
              this.dialogVisible = true
            }
          },
        ],
        event,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 100
      });
      }
      
      return false;
    },
    //新建文件夹
    addFolder(){
      if(!this.NewFolderName){
        this.$message.error('文件名不能为空！');
        return
      }
      let data = {
        id:sessionStorage.getItem('userid'),
        belongId:null,
        fileName:this.NewFolderName
      }
      if(sessionStorage.getItem('paths')){
            data.belongId=sessionStorage.getItem('paths')
      }else{
            data.belongId=""
      }
      addfolder(data).then(res=>{
        console.log(res)
        if(res.data.code==200){
          this.dialogVisible = false
          window.location.reload()
          this.setSessionItem('success','新建文件夹成功！')
          // this.$message.success('新建文件夹成功！')

          this.NewFolderName = null
        }else{
           this.$message.error(res.data.msg);
        }
        
      })
    },

    //分享文件层渲染
    Share(type,name){
      this.sharetype = true
      this.FileType = type
      this.FileName = name
    },

    //确定移动文件
    Movement(){
      if(this.ismoves){
        let data = {
        movementList:[

        ],
        newBelongId:this.preservation
      }
      for(let o = 0;o<this.SelectedFile.length;o++){
         let dat = {
        userId:sessionStorage.getItem('userid'),
        fileId:this.SelectedFile[o].fileId,
        oldBelongId:this.SelectedFile[o].belongId,
        folderBelongId:this.SelectedFile[o].folderBelongId,
        type:this.SelectedFile[o].type,
      }
      data.movementList.push(dat)
      }
      console.log(data);
      movement(data).then((res=>{
        this.ismoves = false
        this.getuserfile()
        this.movetype = false
        this.$message({
          message: '文件移动完成！',
          type: 'success'
        });
      }))

      }else{
        let data = {
        movementList:[

        ],
        newBelongId:this.preservation
      }
      let dat = {
        userId:sessionStorage.getItem('userid'),
        fileId:this.userFileId[0],
        oldBelongId:this.belongId,
        folderBelongId:this.folderBelongId,
        type:this.fileTypes,
      }
      data.movementList.push(dat)
      movement(data).then((res=>{
        this.getuserfile()
        this.movetype = false
        this.$message({
          message: '文件移动完成！',
          type: 'success'
        });
      }))
      }
      
    },
    //保存列表后退
    belongback(){
      if(this.record.length==2){
        this.record.splice(this.record.length-1,1)
        let data = {
          id:sessionStorage.getItem('userid')
        }
        file(data).then((res=>{
        this.movelist=[]
        console.log(res);
        for(let a = 0;a<res.data.data.length;a++){
          let nums = 0
          for(let b=0;b<this.userFileId.length;b++){
            if(res.data.data[a].belongId==""&&res.data.data[a].fileId!=this.userFileId[b]){
             
            }else{
              nums = nums +1
            }
          }
          if(nums==0){
            this.movelist.push(res.data.data[a])
          }
        }
        if(this.movelist){
          this.preservation = this.movelist[0].belongId
        }
        
      }))
      }else{
        this.record.splice(this.record.length-1,1)
      let data = {
        userId:sessionStorage.getItem('userid'),
        belong:this.record[this.record.length-1].belong,
      }
      getfile(data).then((res=>{
        this.movelist = res.data.data
        this.preservation = this.movelist[0].belongId
      }))
      
      }
      
    },
    //加入回收站
    Recycler(id,type,cbelong){
      let data = {
        recyclerList:[],
      }
      let dat = {
        userId:sessionStorage.getItem('userid'),
        fileId:id,
        type:type,
        cbelongId:cbelong
      }
      data.recyclerList.push(dat)
      recycler(data).then((res=>{
        this.getuserfile()
        this.$message({
          message: '文件已加入回收站！',
          type: 'success'
        });
      }))
    },
    //刷新文件保存列表
    Refresh(belong,name){
      let data = {
        userId:sessionStorage.getItem('userid'),
        belong:belong,
      }
      this.record.push({belong:belong,name:name})
      getfile(data).then((res=>{
        console.log(res)
        if(res.data.code==200){
          this.movelist= []
          res.data.data.forEach(item => {
            let nums = 0
            for(let b=0;b<this.userFileId.length;b++){
            if(item.fileId!=this.userFileId[b]){
             
            }else{
              nums = nums +1
            }
          }
          if(nums==0){
            this.movelist.push(item)
          }
          });

          this.preservation = this.movelist[0].belongId
        }else if(res.data.code==201){
          this.movelist = res.data.data
          this.preservation = res.data.data
        }
        
      }))
    },
    //批量文件移动
    Moves(){
      this.ismoves = true
      this.movelist = []
      this.userFileId = []
      for(let x = 0;x<this.SelectedFile.length;x++){
        this.userFileId.push(this.SelectedFile[x].fileId)
      }
      this.record = []
      let data = {
        id:sessionStorage.getItem('userid'),
      }
      this.record.push({belong:sessionStorage.getItem('userid')+'@-.@',name:"全部文件"})
      console.log(data);
      file(data).then((res=>{
        console.log(res)
        for(let a = 0;a<res.data.data.length;a++){
          let nums = 0
          for(let b=0;b<this.userFileId.length;b++){
            if(res.data.data[a].belongId==""&&res.data.data[a].fileId!=this.userFileId[b]){
             
            }else{
              nums = nums +1
            }
          }
          if(nums==0){
            this.movelist.push(res.data.data[a])
          }
          
        }
        if(this.movelist){
          this.preservation = this.movelist[0].belongId
        }
        
        this.movetype = true
      }))
    },
    //文件移动
    Move(id,belongId,folderBelongId,typee){
      this.fileTypes = typee
      this.folderBelongId = folderBelongId
      this.belongId= belongId
      this.movelist = []
      this.userFileId = []
      this.userFileId.push(id)
      this.record = []
      let data = {
        id:sessionStorage.getItem('userid'),
      }
      this.record.push({belong:sessionStorage.getItem('userid')+'@-.@',name:"全部文件"})
      console.log(data);
      file(data).then((res=>{
        console.log(res)
        for(let a = 0;a<res.data.data.length;a++){
          let nums = 0
          for(let b=0;b<this.userFileId.length;b++){
            if(res.data.data[a].belongId==""&&res.data.data[a].fileId!=this.userFileId[b]){
             
            }else{
              if(res.data.data[a].belongId==""){
                this.preservation = res.data.data[a].belongId
              }
              nums = nums +1
            }
          }
          if(nums==0){
            this.movelist.push(res.data.data[a])
          }
          
        }
        if(this.movelist.length>0){
          this.preservation = this.movelist[0].belongId
        }
        this.movetype = true
      }))
  
    },
    //文件预览
    prev(filePath,type){
      this.filestatus = type
      let data = {
        filePath:filePath,
        userId:sessionStorage.getItem('userid')
      }
      console.log(data)
      downloads(data).then((res=>{
        if(res.data.code==200){
          this.src = res.data.data.url
          this.drawer = true
        }
      }))
      
    },
    //获取用户文件信息
    getuserfile(){
      let data = {
        id:sessionStorage.getItem('userid')
      }
      file(data).then((res=>{
        console.log(res);
        if(res.data.code==200){
          this.list = []
          if(res.data.data){
            this.setSessionItem('listLength','false')
          }else{ 
            this.setSessionItem('listLength','true')
          }
          for(let b = 0;b<res.data.data.length;b++){
            if(res.data.data[b].belongId ==""){
              this.list.push(res.data.data[b])
            }
          }
          this.listnum()
          if(this.list){
            sessionStorage.setItem('outsideBelongId',this.list[0].belongId)
          }
          
        }else{
          this.list = []
          this.setSessionItem('listLength','true')
        }
      }))
    },
    gto(){
      this.$router.push('/folder')
    },
    //更新文件列表长度
    listnum(){
      this.checked=[]
      if(this.list){
        for(var i=0;i<this.list.length;i++){
          this.checked.push(false)
        }
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
    async down(filepath,name,type){
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
                                this.$message.error('服务器出错,请稍后重试！');
                                
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
    //修改文件名层弹出
    Rename(name,belong,type,id,form){
      this.NewFolderNames = name
      this.filetype = type
      this.dialogVisibles = true
      let data = {
        id:sessionStorage.getItem('userid'),
        belongId:belong,
        newName:this.NewFolderNames,
        oldName:name,
        type:type,
        fileId:id,
        folderBelongId:form
      }
      this.dat = data
      console.log(this.dat);
    },
    //文件重命名
    enames(){
      if(!this.NewFolderNames) {
        this.$message.error('文件名不能为空！');
        return
        }
      let data = this.dat
      data.newName = this.NewFolderNames
      console.log(data)
      rename(data).then((res=>{
        console.log(res)
        if(res.data.code==200){
          this.dialogVisibles = false
          window.location.reload();
          this.$message.success('文件重命名成功！');
          this.getuserfile()

        }else{
           this.$message.error(res.data.msg);
        }
      }))
    },
    //打开文件夹
    open(belong){
      this.$router.push({
        path: '/folder',
        query: {
          belong:belong,
        }
      })
    },
    //点击文件
    opens(filePath,type,name,belong){
      if(type=="folder"){
        this.open(belong)
      }else{
        this.prev(filePath,type)
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

*{
    margin:0;
    padding:0;
  }



.share-button{
  width: 150px;
  height: 50px;
  float: right;
  margin-top: 20px;
}
.share-choice2{
    margin-top: 10px;    
  }
.share-choice2 >>> .el-input__inner{
  background: rgb(239, 239, 239);
  border-radius: 10px;
  width: 460px;
  border: none;
}

.share-choice1 >>> .el-input__inner{
  border-radius: 10px;
  width: 120px;
  border: none;
}
.share-choice1 >>> .el-input__inner:hover{
  background: rgb(239, 239, 239);
}
.share-choice1{
  margin-top: 40px;
  font-size: 16px;
}
.share-name{
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
.share-img{
  margin-top: 50px;
  margin-left: 190px;
  width: 100px;
  height: 80px;
}
.share-text{
  font-weight: 700;
  font-size: 20px;
  margin-top: -40px;
}

.shares>>>.el-dialog__body{
  height: 400px;
}

button {
  margin-top: 30px;
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


.move-title-back{
  color: rgb(183, 183, 183);
  cursor:no-drop;
  font-size: 25px;
  position: absolute;
}
.move-title-back2{
  color: rgb(0, 0, 0);
  cursor: pointer;
  font-size: 25px;
  position: absolute;
}
.move-title{
  text-align: center;
  font-size: 18px;
}
.move-text{
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width: 280px;
  font-size: 18px;
  height: 30px;
  margin-top: 10px;
  line-height: 30px;
  float: left;
  margin-left: 10px;
}
.move-img{
  float: left;
  margin-top: 9px;
  margin-left: 20px;
  }
.move-min-box{
  cursor: pointer;
  border-radius: 15px;
  height: 50px;
}
.move-min-box:hover{
  background: rgb(224, 224, 224);
}
.el-dialog__wrapper >>> .el-dialog{
  border-radius: 20px;
  }
.a1 >>>.el-dialog__body{
  height: 300px;
  overflow: auto;
}
.move-box{
  min-height: 300px;

}
.big-box{
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 80%;
  height: 80%;
  }
.img-box{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  }
.video-box{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.video-boxs{
  width: 100%;
  height: 100%;
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
  width: 87%;
  min-height: 100vh;
  margin-left: 1%;
}
.xlayer2{

  min-height: 100vh;
  margin-top: 110px;
  position: absolute;
  width: 98%;
  margin-left: 1%;
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
