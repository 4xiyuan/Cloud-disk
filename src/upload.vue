<template>
  <div id="app">
    <el-upload ref="updata"  action :multiple="true"  :auto-upload="false" :show-file-list="false" :on-change="changeFile">
      <button ref="me"></button>
    </el-upload>
    
    <div style="width:600px">
      <li v-for="item,index in filelist" :key="index" style="list-style-type: none;">
        <div class="m2">
          <!-- <span class="m2-1">{{item.name}}</span>
          <span class="m2-2">{{item.size}}</span>
          <span v-if="item.bott&&item.jindu>0&&item.jindu<99" @click="handleBtn(index)" class="m2-3">暂停</span>
          <span v-if="!item.bott&&item.jindu>0&&item.jindu<99" @click="handleBtns(index)" class="m2-4">继续</span>
          <span class="m2-5">{{item.jindu+1}}</span> -->
        </div>
      </li>
    </div>
    
  </div>
</template>

<script>
import { fileParse } from "./assets/utils";
import axios from "axios";
import SparkMD5 from "spark-md5";

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
    //触发上传按钮事件
    shang(){
      this.$refs.me.click()
    },
    async changeFile(file) {
      if (!file) return;
      let a = {
        name:file.name,
        size:(file.size/1024/1024).toFixed(2)>1000 ? (file.size/1024/1024/1024).toFixed(2)+"GB":(file.size/1024/1024).toFixed(2)+"MB",
        jindu:0,
        bott:true,
        type:/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1]?/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1]:""
      }
      this.filelist.push(a)
      this.$emit("numdata",this.filelist)
      file = file.raw;
      // 创建100个切片
      let partList = [],
        partsize = file.size / 100,
        cur = 0;
        
      let datas = {
          data:[],
          "type":1
        }
      for (let i = 0; i < 100; i++) {
        let item = {
          chunk: file.slice(cur, cur + partsize),
          filename: file.name,
          way:0,
        };
        cur += partsize;
        datas.data.push(item)
        
      }
      partList.push(datas);

      this.partList = partList;
      this.sendRequest(file.name);
    },
    async sendRequest(name) {
      // 根据100个切片创造100个请求（集合）
      let requestList = [];
      this.partList[0].data.forEach((item, index) => {
        // 每一个函数都是发送一个切片的请求
        let fn = () => {
          let formData = new FormData();
          formData.append("MFile", item.chunk);
          formData.append("shunk", index);
          formData.append("shunks", 100);
          formData.append("belong", '1\\'+item.filename);
          formData.append("way", item.way);
          formData.append("fileName", item.filename);
          return axios
            .post("http://localhost:8089/api/upload/1", formData, {
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
              }
              if (result.code == 200) {
                // console.log("已经传送完第"+index+"片")
              }
              if (result.code == 200&&result.msg=="分片成功！") {
                      for(let x =0;x<this.filelist.length;x++){
                        if(this.filelist[x].name==item.filename){
                          this.filelist[x].jindu+=1
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