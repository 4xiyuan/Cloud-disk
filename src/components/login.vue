<template>
  <div class="head">
    <!-- <video autoplay loop muted="" preload>
      <source src="../../public/video/tropicalflow.mp4">
    </video> -->
    <div class="bodys">
      <el-carousel ref="setActiveItem" width="400px" height="500px" :interval="0" arrow="never">
        <el-carousel-item >
          <div class="text">
              登录
          </div>

          <div class="tou">
            <img class="touxiang" src="../../public/photo/user.png" width="50px" height="50px">
          </div>

          <div >
              <input ref="Username" class="username" @focus="ups(1)" @blur="downs(0)"  v-model="username" type="text">
              <span @click="userju('Username')" :class="[{'up':Stylevariable==1},{'down':Stylevariable==0}]">账号</span>
          </div>

          <div >
              <input ref="Password"  class="password" @focus="ups(3)" @blur="downs(2)"  v-model="password" type="password">
              <span @click="userju('Password')" :class="[{'up1':Stylevariable1==3},{'down1':Stylevariable1==2}]">密码</span>
          </div>
              <button @click="logins()" class="button-x">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
              <span class="text1" @click="next()">没有账号？点我注册！</span>
        </el-carousel-item>

        <el-carousel-item >
          <div class="text">
              注册
          </div>

          <div class="tou">
            <img class="touxiang" src="../../public/photo/user1.png" width="50px" height="50px">
          </div>

          <div >
              <input ref="Usernames" class="username" @focus="ups(1)" @blur="downs(0)"  v-model="username" type="text">
              <span @click="userju('Usernames')" :class="[{'up':Stylevariable==1},{'down':Stylevariable==0}]">输入账号</span>
          </div>

          <div >
              <input ref="Passwords" class="password" @focus="ups(3)" @blur="downs(2)"  v-model="password" type="password">
              <span @click="userju('Passwords')" :class="[{'up1':Stylevariable1==3},{'down1':Stylevariable1==2}]">输入密码</span>
          </div>
              <button @click="register()" class="button-x">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
              <span class="text1" @click="next()">已有账号？点我登录！</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { userlogin,userregister } from '../apis/index.js'
   export default {
   data() {
       return {
        username:null,
        password:null,
        Stylevariable:0,
        Stylevariable1:2,
        
       }
   },
   created(){
    if(sessionStorage.getItem('ekey')){
    }else{
      sessionStorage.setItem('ekey','true')
      this.$router.go(0)
    }
      var users = 'false'
      sessionStorage.setItem('users',users)
   },
   methods:{
    logins(){
      if(this.username&&this.password){
          var data = {
          username:this.username,
          password:this.password
          
        }
         userlogin(data).then(( res=>{
          console.log(res);
          if(res.data.code==200){
            sessionStorage.setItem('users','true')
            sessionStorage.setItem('belongId',res.data.data.belongId)
            sessionStorage.setItem('userid',res.data.data.userId)
            sessionStorage.setItem('sidebartype','true')
            this.$message.success('登录成功！');
            this.$router.push('/home')
          }else{
            this.$message.error('账号或密码错误！');
          }
        }))
      }else{
          this.$message.error('请输入账号或密码！');
      }
      
    },
    userju(na){
      var names = na
      this.$refs[names].focus()

    },
    ups(num){
      if(num>=2){
        this.Stylevariable1 = num
      }else{
        this.Stylevariable = num
      }
      
    },
    downs(num){
      if(num==0||num==1){
        if(!this.username){
          this.Stylevariable = num
        }
      }else if(num==2||num==3){
        if(!this.password){
          this.Stylevariable1 = num
        }
      }
      
    },
    next(){
      this.username = null
      this.password = null
      this.Stylevariable=0
      this.Stylevariable1=2
      this.$refs.setActiveItem.next()
    },
    register(){
      if(this.username&&this.password){
          var data = {
          userName:this.username,
          password:this.password
        }
        userregister(data).then((res=>{
          if(res.data.code==200){
            this.$message.success('注册成功！');
            this.next()

          }else{
            this.$message.error(res.data.msg);
          }
        }))
      }else{
          this.$message.error('请输入账号或密码！');
      }
    },
  
   }
   }
</script>

<style scoped>
*{
    margin:0; 
    padding: 0;
  }

.button-x {
  width: 150px;
  margin-top: 320px;
  margin-left: 125px;
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

.button-x:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.button-x:active {
  transform: translateY(-1px);
}



body {
  margin:0;
  padding:0;
  border:0;

}
.head{
  background-image: url('../../public/photo/login1.webp');
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.bodys{
  width: 400px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: rgba( 255, 255, 255, 0.3 );
  box-shadow: 0 4px 32px 0 rgba(155, 155, 155, 0.37);
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 20px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.text{
  color: #000000;
  font-size: 30px;
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  

}
.username{
  width: 300px;
  height: 40px;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  padding-left:10px ;
  margin-top: 150px;
  outline:none;
  background: rgba( 255, 255, 255, 0.1 );
  box-shadow: 0 4px 32px 0 rgba(155, 155, 155, 0.37);
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 20px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  
}

.password{
  width: 300px;
  height: 40px;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  padding-left:10px ;
  margin-top: 230px;
  outline:none;
  background: rgba( 255, 255, 255, 0.1 );
  box-shadow: 0 4px 32px 0 rgba(155, 155, 155, 0.37);
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 20px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}


.down{
  position: absolute;
  margin-top: 160px;
  margin-left: 60px;
  color: rgb(124, 124, 124);
  transition: all 0.3s;
}
.up{
  position: absolute;
  margin-top: 120px;
  margin-left: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  transition: all 0.3s;
}

.down1{
  position: absolute;
  margin-top: 240px;
  margin-left: 60px;
  color: rgb(124, 124, 124);
  transition: all 0.3s;
}
.up1{
  position: absolute;
  margin-top: 200px;
  margin-left: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  transition: all 0.3s;
}



.tou{
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 30px;
  text-align: center;
  height: 80px;
  width: 80px;
  background: rgba( 255, 255, 255, 0.1 );
  box-shadow: 0 4px 32px 0 rgba(155, 155, 155, 0.37);
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 50px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.touxiang{
  margin-top: 15px;
}

.login{
  width: 150px;
  height: 40px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  margin-top: 320px;
  font-size: 20px;
  line-height: 10px;
}
.text1{
  position: absolute;
  right: 20px;
  bottom: 30px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  color: rgb(0, 0, 0);
}
.text1:hover{
  cursor:pointer;
  color: #000;
}
.el-carousel >>> .el-carousel__indicators{
  display: none;
}



</style>
