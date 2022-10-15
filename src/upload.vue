<template>
  <div id="app">
    <el-upload  action :multiple="true" :auto-upload="false" :show-file-list="true" :on-change="changeFile" :before-upload="before">
      <button ref="me">点击上传</button>
    </el-upload>
  </div>
</template>

<script>
import { fileParse } from "../src/assets/utils";
import axios from "axios";
import SparkMD5 from "spark-md5";

export default {
  name: "App",
  data() {
    return {
      //进度条
      total: 0,
      //暂停或继续的按钮操作
      btn: false,
      filelist:[],
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
    before(file){
        console.log(1)
        
    },
    shang(){
        this.$refs.me.click();
    },
    async changeFile(file) {
      if (!file) return;
      //传送待上传的的文件给父组件
      this.filelist=[]
      let b = {
        filename:file.name,
        filesize:(file.size/1024/1024).toFixed(2)+"MB",
        type:/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1] ? /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1].toLowerCase():"",
        jindu:-1,

      }
      this.filelist.push(b)
      this.$emit("numdata",this.filelist)
      
      file = file.raw;
      // 解析为BUFFER数据
      // 我们会把文件切片处理：把一个文件分割成为好几个部分（固定数量/固定大小）
      // 每一个切片有自己的部分数据和自己的名字
      // HASH_1.mp4
      // HASH_2.mp4
      // ...
      let buffer = await fileParse(file, "buffer"),
        spark = new SparkMD5.ArrayBuffer(),
        hash,
        suffix;
      spark.append(buffer);
      hash = spark.end();
      suffix = /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];

      // 创建100个切片
      let partList = [],
        partsize = file.size / 100,
        cur = 0;
      for (let i = 0; i < 100; i++) {
        let item = {
          chunk: file.slice(cur, cur + partsize),
          filename: file.name,
          filesiez:file.size
        };
        cur += partsize;
        partList.push(item);
      }

      this.partList = partList;
      this.hash = hash;
      this.sendRequest();
    },
    async sendRequest() {
      // 根据100个切片创造100个请求（集合）
      let requestList = [];
      this.partList.forEach((item, index) => {
        // 每一个函数都是发送一个切片的请求
        let fn = () => {
          let formData = new FormData();
          
          formData.append("MFile", item.chunk);
          formData.append("chunk", index);
          formData.append("chunks", 100);
          formData.append("originName",item.filename);
          return axios
            .post("http://localhost:8089/api/upload/1", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((result) => {
              result = result.data;
              this.filelist=[]
              if(result.code==200){
                let a = {
                    filename:item.filename,
                    jindu:index
                }
                this.filelist.push(a)
                this.$emit("jindu",this.filelist)
              }
              if (result.code == 200&&result.msg=="分片成功！") {
                // 传完的切片我们把它移除掉
                // this.partList.splice(index, 1);
              }
            });
        };
        requestList.push(fn);
        
      });
      
      // 传递：并行(ajax.abort())/串行(基于标志控制不发送)
      let i = 0;
      let send = async () => {
        // 已经中断则不再上传
        if (this.abort) return;
        //从上次暂停那部分开始
        // if(this.total!=0&&i<=this.total){
        //   i = this.total
        // }
        if (i >= requestList.length) {
          // 都传完了
          return;
        }
        await requestList[i]()
        i++;
        
        send();
      };
      send();
    },
    handleBtn() {
      if (this.btn) {
        //断点续传
        this.abort = false;
        this.btn = false;
        this.sendRequest();
        return;
      }
      //暂停上传
      this.btn = true;
      this.abort = true;
    },
  },
};
</script>