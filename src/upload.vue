<template>
  <div id="app">
    <el-upload ref="updata"  action :multiple="true"  :auto-upload="false" :show-file-list="false" :on-change="changeFile">
      <button ref="me"></button>
    </el-upload>
    
    <div style="width:600px">
      <li v-for="item,index in filelist" :key="index" style="list-style-type: none;">
        <div class="m2">
        </div>
      </li>
    </div>
    
  </div>
</template>

<script>
import { fileParse } from "./assets/utils";
import axios from "axios"
import SparkMD5 from "spark-md5";
import {hash,upload} from "../src/apis/index"

export default {
  name: "upload",
  data() {
    return {
      total: 0,
      video: null,
      btn: false,
      filelist:[],
      partList:[],
      requestList:[],
    };
  },
  filters: {
    btnText(btn) {
      return btn ? "继续" : "暂停";
    },
    totalText(total) {
      return total > 100 ? 100 : total;
    },
  },
  methods: {
    //获取文件哈希值
    getFileHash(file){
      return new Promise( resolve => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = ev => {
          let buffer = ev.target.result,
              spark = new SparkMD5.ArrayBuffer(),
              HASH,
              suffix;
          spark.append(buffer);
          HASH = spark.end();
          suffix = file.name.substring(file.name.lastIndexOf(".") + 1);
          resolve({
            buffer,
            HASH,
            suffix,
            filename: `${HASH}.${suffix}`
          });
        };
      });
    },
    //触发上传按钮事件
    shang(){
      this.$refs.me.click()
      

    },
    async changeFile(file) {
      // this.msg =  this.$message({
      //   type: 'warning',
      //   dangerouslyUseHTMLString:true,
      //    message: '<strong><i class:"el-icon-loading"></i>文件'+file.raw.name+'正在解析中,文件越大解析越慢,请耐心等待！</strong>',
      //   duration:0
      // })
      if (!file) return;
      let {
        HASH,
        suffix
      } = await this.getFileHash(file.raw);
      let d = {
        userId:sessionStorage.getItem('userid'),
        hash:HASH
      }
      await hash(d).then((res=>{

        if(res.data.code==200){
          let formData = new FormData();
          formData.append("MFile", "1");
          formData.append("shunk", "1");
          formData.append("shunks",1);
          formData.append("fileSize",file.size);
          formData.append("hash",HASH);
          formData.append("filePath",res.data.data[0].filePath);
          if(sessionStorage.getItem('paths')){
            formData.append("belongId", sessionStorage.getItem('paths'));
          }else{
            formData.append("belongId","");
          }
          
          formData.append("way", 1);
          formData.append("fileName", file.name);
          console.log(formData);
          return axios
            .post("http://localhost:8089/api/upload/"+sessionStorage.getItem('userid'), formData, {
              headers: { "Content-Type": "multipart/form-data" },
            }).then((res=>{
              if(res.data.code==200){
                //上传完成后刷新数据
                this.setSessionItem('Space',"true")
                if(this.getQueryString('belong')){
                  let belong = this.getQueryString('belong')
                  this.$message.success('该文件具有秒传特性,文件已上传完成！');
                  this.$bus.$emit('RefreshDatas',belong)

                }else{
                  this.$message.success('该文件具有秒传特性,文件已上传完成！');
                  this.$bus.$emit('RefreshData')
                }
              }
            }))
        }else{
          let a = {
              name:file.name,
              size:null,
              jindu:0,
              bott:true,
              type:/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1]?/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1]:""
            }
            if((file.size/1024/1024).toFixed(2)>=1000){
              a.size = (file.size/1024/1024/1024).toFixed(2)+"GB"
            }else if((file.size/1024/1024).toFixed(2)<1000&&(file.size/1024/1024).toFixed(2)>=1){
              a.size= (file.size/1024/1024).toFixed(2)+"MB"
            }else{
              a.size= (file.size/1024).toFixed(2)+"KB"
            }
            this.filelist.push(a)
            this.$emit("numdata",this.filelist)
            file = file.raw;
            if((file.size/1024/1024).toFixed(2)>1&&(file.size/1024/1024).toFixed(2)<=10){
              // 创建10个切片
            let partList = [],
              partsize = null,
              cur = 0;
            if(file.size%10!=0){
              partsize = Math.floor(file.size/10)
            }else{
              partsize = file.size/10
            }
            let datas = {
                data:[],
                "type":1
              }
            for (let i = 0; i < 10; i++) {
              let ss;
              if(i==9){
                ss=file.slice(cur, cur + partsize+file.size%10)
              }else{
                ss= file.slice(cur, cur + partsize)
              }
              let item = {
                chunk: ss,
                filename: file.name,
                way:0,
              };
              cur += partsize;
              datas.data.push(item)
            }
            partList.push(datas);

            this.partList = partList;
            this.sendRequest(file.name,HASH);
            }else if((file.size/1024/1024).toFixed(2)>10){
              // 创建100个切片
            let partList = [],
              partsize = null,
              cur = 0;
            if(file.size%100!=0){
              partsize = Math.floor(file.size/100)
            }else{
              partsize = file.size/100
            }
            let datas = {
                data:[],
                "type":1
              }
            for (let i = 0; i < 100; i++) {
              let ss;
              if(i==99){
                ss=file.slice(cur, cur + partsize+file.size%100)
              }else{
                ss= file.slice(cur, cur + partsize)
              }
              let item = {
                chunk: ss,
                filename: file.name,
                way:0,
              };
              cur += partsize;
              datas.data.push(item)
            }
            partList.push(datas);

            this.partList = partList;
            this.sendRequest(file.name,HASH);
            }else{
              // 创建1个切片
            let partList = []
            let datas = {
                data:[],
                "type":1
              }
            let item = {
                chunk: file,
                filename: file.name,
                way:0,
              }
             datas.data.push(item)

            partList.push(datas);

            this.partList = partList;
            this.sendRequest(file.name,HASH);

            }
            
        }
        
      }))
    },
    async sendRequest(name,HASH) {
      // this.msg.close()
      // 根据切片个数创造请求（集合）
      let requestList = [];
      this.partList[0].data.forEach((item, index) => {
        // 每一个函数都是发送一个切片的请求
        let fn = () => {
          let formData = new FormData();
          formData.append("MFile", item.chunk);
          formData.append("shunk", index);
          formData.append("hash", HASH);
          formData.append("shunks", this.partList[0].data.length);
          if(sessionStorage.getItem('paths')){
            formData.append("belongId", sessionStorage.getItem('paths'));
          }else{
            formData.append("belongId","");
          }
          formData.append("way", item.way);
          formData.append("fileName", item.filename);
          return axios
            .post("http://localhost:8089/api/upload/"+sessionStorage.getItem('userid'), formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((result) => {
              result = result.data;
              if(result.code == 200&&result.msg=="合并成功，数据库记录已添加 ！"){
                for(let x =0;x<this.filelist.length;x++){
                        if(this.filelist[x].name==item.filename){
                          this.filelist[x].status=1
                        }
                      }
                for(let x =0;x<this.filelist.length;x++){
                        if(this.filelist[x].name==item.filename){
                          this.filelist[x].jindu=100
                        }
                        let jindu = {
                          index:x,
                          jindu:100
                        }

                        this.$emit("uploadjindu",jindu)
                      }
                //上传完成后刷新数据
                this.$message.success('上传完成！');
                this.setSessionItem('Space',"true")
                if(this.getQueryString('belong')){
                  let belong = this.getQueryString('belong')
                  this.$bus.$emit('RefreshDatas',belong)
                }else{
                  this.$bus.$emit('RefreshData')
                }
                
              }
              if (result.code == 200) {
                // console.log("已经传送完第"+index+"片")
              }
              if (result.code == 201&&result.msg=="分片成功！") {
                      for(let x =0;x<this.filelist.length;x++){
                        if(this.filelist[x].name==item.filename){
                          this.filelist[x].jindu=(index/this.partList[0].data.length*100).toFixed(1)
                        }
                        let jindu = {
                          index:x,
                          jindu:this.filelist[x].jindu
                        }

                        this.$emit("uploadjindu",jindu)
                      }
              }
            });
        };
        requestList.push(fn);
      });
      let uname = {
          "name":name,
          "data":requestList,
          "type":1
        }
      this.requestList.push(uname)
      // 传递：并行(ajax.abort())/串行(基于标志控制不发送)
      let send = async (name) => {
        for(var b=0;b<this.requestList.length;b++){
          if(this.requestList[b].name==name&&this.requestList[b].type==1){
            if (this.requestList[b].data.length<=0) {
              // 都传完了
              return;
            }
            await this.requestList[b].data[0]();
            this.requestList[b].data.splice(0,1)
            send(name);
          }
        }
        
      };
      send(name);
    },
    handleBtn(index) {
      this.filelist[index].bott = !this.filelist[index].bott
      this.requestList[index].type=0
    },
    handleBtns(index){
      this.requestList[index].type=1
      this.filelist[index].bott = !this.filelist[index].bott
      let sends = async(index)=>{
        if(this.requestList[index].type==1){
          if (this.requestList[index].data.length<=0) {
              // 传完了
              return;
            }
            await this.requestList[index].data[0]();
            this.requestList[index].data.splice(0,1)
            sends(index);
        }else{
          return
        }
      }
      sends(index)
    },
    async deletes(index){
      this.requestList[index].type=0
      this.filelist.splice(index,1)
      this.requestList.splice(index,1)
    },
    //获取当前url地址参数
    getQueryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return decodeURIComponent(r[2]); return null;
    },
  },
};
</script>
<style>
.m2{
  border: 1px red solid;
  width: 100%;
  height: 50px;
}
.m2-1{
  float: left;
}
.m2-2{
  position: absolute;
  left: 20px;
  margin-top: 25px;
}
.m2-3{
  position: absolute;
  right: 450px;
  margin-top: 15px;
}
.m2-4{
   position: absolute;
  right: 450px;
  margin-top: 15px;
}
.m2-5{
  float: right;
  margin-right: 10px;
  margin-top: 15px;
}
</style>