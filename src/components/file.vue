<template>
  <div class="big-box">
    
    <div :class="sidebartypes? 'activation2':'activation'">
      <div style="height: 300px;"></div>
      <el-result icon="info" title="激活密码箱" subTitle="点击按钮激活激活密码箱">
          <template slot="extra">
            <el-button @click="dialogVisible=true" type="primary" size="medium">激活</el-button>
          </template>
        </el-result>
    </div>

    <el-dialog
      title="请输入密码"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
      class="Safebox">
      <el-input v-model="userSafebBoxpassword" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        //密码箱状态
        dialogVisible:false,
        input:null,
        //侧边栏状态
        sidebartypes:sessionStorage.getItem('sidebartype')=='true',
        stu:false,
        userSafebBoxpassword:null,
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
   methods:{
    
   }
   }
</script>

<style scoped>
.big-box{
  width: 100%;
  position: absolute;
  margin-top: 90px;
  
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

</style>
