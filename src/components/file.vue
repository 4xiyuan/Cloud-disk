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
      width="23%"
      class="Safebox">
      <el-input v-model="userSafebBoxpassword" placeholder="请输入密码" type="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>&nbsp;
        <button   @click="dialogVisible = false">确 定</button>
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

</style>
