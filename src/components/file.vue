<template>
  <div >
    <div class="big-box">
      
    </div>
    <div v-show="!stu"  :class="sidebartypes ? 'passwords':'passwords2'">
      <el-input class="passwordtext" v-model="input" placeholder="请输入密码"></el-input>
      <span class="text">请输入密码</span>
    </div>
    <span style="position: absolute;top:50%;left:50%" v-show="stu">加载中！！！</span>
  </div>
  
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        input:null,
        //侧边栏状态
        sidebartypes:sessionStorage.getItem('sidebartype')=='true',
        stu:true,
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
    this.shows()
   },
   methods:{
     shows(){
      let timer = setTimeout(() => {
      //需要定时执行的代码
      this.stu = false
      }, 1000)
     }
   }
   }
</script>

<style scoped>
.big-box{
  position: absolute;
  margin-top: 90px;
  
}
.passwords{
  position: absolute;
  left: 240px;
  right: 0; 
  top:0;
  bottom:0;
  margin: auto;
  width: 500px;
  height: 200px;
  border-radius: 25px;
  box-shadow: 0 8px 32px 0 rgba(46, 46, 46, 0.37);
  transition: all .4s;
  
}
.passwords2{
  position: absolute;
  left: 0;
  right: 0; 
  top:0;
  bottom:0;
  margin: auto;
  width: 500px;
  height: 200px;
  border-radius: 25px;
  box-shadow: 0 8px 32px 0 rgba(46, 46, 46, 0.37);
  transition: all .4s;
 
}
.passwordtext{
  position: absolute;
  width: 400px;
  margin-left: 50px;
  margin-top: 50px;
 
}
.passwords >>> .el-input__inner{
   height: 50px;
   font-size: 22px;

}
.passwords2 >>> .el-input__inner{
   height: 50px;
   font-size: 22px;

}
.text{
  position: absolute;
  font-size: 22px;
  bottom: 40px;
  margin-left: 190px;
}
</style>
