<template>
  <div :class="sidebartypes ? 'information-box2' : 'information-box'">
    <div class="big-box">
      <div class="card">
        <div class="card-info">
          <div class="card-avatar">
            <div style="height: 7px"></div>
            <img src="../../public/photo/LOGO.png" width="60px" height="60px" />
          </div>
          <div v-if="list" class="card-title">{{list.nickname}}</div>
          <!-- <div class="card-subtitle">CEO &amp; Co-Founder</div> -->
        </div>
        <ul class="card-social">
          <li class="card-social__item">
            <div class="card-boxd">
              <el-tag>修改用户名</el-tag><br><br>
              <div class="input-group">
                  <input
                    class="input"
                    v-model="userName"
                    placeholder="请输入新用户名"
                    autocomplete="off"
                  />
                  <input class="button--submit" value="修改" @click="ModifyName()" type="submit"  />
              </div><br>
              <el-tag type="success">修改密码</el-tag><br><br>
              <div class="input-group">
                <input
                  type="password"
                  class="input"
                  v-model="oldUserPassword"
                  placeholder="请输入旧密码"
                  autocomplete="off"
                />
                <input class="button--submit2" @click="ModifyPassword()" value="修改" type="submit" />
              </div>
               <div class="input-group">
                <input
                  type="password"
                  class="input"
                  v-model="newUserPassword"
                  placeholder="请输入新密码"
                  autocomplete="off"
                />
              </div><br>
              <el-tag type="danger">修改我的隐私密码</el-tag><br><br>
              <input placeholder="请输入旧密码" v-model="oldpassword" type="password" name="text" class="inputee"><br><br>
              <input placeholder="请输入新密码" v-model="newpassword" type="password" name="text" class="inputee"><br><br>
              <button @click="PutUser()"><span style="font-size:20px;" >修改</span></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {getUser,Modifynickname,checkPassword,putUser} from '../apis/index'
export default {
  data() {
    return {
      //侧边栏状态
      sidebartypes: sessionStorage.getItem("sidebartype") == "true",
      userName:null,
      oldUserPassword:null,
      newUserPassword:null,
      oldpassword:null,
      newpassword:null,
      list:null,
    };
  },
  mounted() {
    window.addEventListener("setItem", () => {
      if (sessionStorage.getItem("sidebartype") == "true") {
        this.sidebartypes = true;
      } else {
        this.sidebartypes = false;
      }
      this.Searchbox = sessionStorage.getItem("searchtext");
    });
  },
  created(){
    this.User()
  },
  methods: {
    User(){
        let data = {
            userId:sessionStorage.getItem('userid')
        }
        getUser(data).then((res=>{
           if(res.data.code == 200){
            console.log(res);
            this.list = res.data.data
           }
        }))
    },
    ModifyName(){
      if(this.userName){
        if(this.userName.length>8){
          this.$message.error('用户名长度不能大于8');
        }else{
          let data = {
            userId:sessionStorage.getItem('userid'),
            nickname:this.userName,
          }
          console.log(data);
          Modifynickname(data).then((res=>{
            console.log(res);
            if(res.data.code ==200){
               this.$message.success('修改成功！');
               this.userName = null
               this.User()
            }
            this.$message.success('修改成功！');
          }))
        }
        
      }else{
        this.$message.error('用户名不能为空值！');
      }
    },
    ModifyPassword(){
    if(this.oldUserPassword&&this.newUserPassword){
      let data = {
        userId:sessionStorage.getItem('userid'),
        newPassword:this.newUserPassword,
        oldPassword:this.oldUserPassword
      }
      checkPassword(data).then((res=>{
        if(res.data.code==200){
          this.$message.success('修改成功！');
          this.newUserPassword = null
          this.oldUserPassword = null
          sessionStorage.setItem('users','false')
          sessionStorage.removeItem('belongId')
          sessionStorage.removeItem('userid')
          sessionStorage.removeItem('userNAME')
          sessionStorage.setItem('sidebartype','false')
          this.$router.push('/login')
        }else{
          this.$message.error(res.data.msg);
        }
        
      }))
    }else{
      this.$message.error('新旧密码不能为空值！');
    }
  },
  PutUser(){
    if(this.oldpassword&&this.newpassword){
      let data = {
        userId:sessionStorage.getItem('userid'),
        newPassword:this.newpassword,
        oldPassword:this.oldpassword
      }
      putUser(data).then((res=>{
        if(res.data.code==200){
          this.$message.success(res.data.msg);
          this.newpassword = null
          this.oldpassword = null
        }else{
          this.$message.error(res.data.msg);
        }
        
      }))
    }else{
      this.$message.error('新旧密码不能为空值！');
    }
  }
  },
  
};
</script>

<style scoped>


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

.inputee {
  width: 320px;
  height: 20px;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid lightgrey;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
}

.inputee:hover {
  border: 2px solid lightgrey;
  box-shadow: 0px 0px 20px -17px;
}

.inputee:active {
  transform: scale(0.95);
}

.inputee:focus {
  border: 2px solid grey;
}











.input-group {
  display: flex;
  align-items: center;
}

.input {
  min-height: 50px;
  width: 250px;
  padding: 0 1rem;
  color: rgb(0, 0, 0);
  font-size: 15px;
  border: 1px solid #5e4dcd;
  border-radius: 6px 0 0 6px;
  background-color: transparent;
}

.button--submit {
  min-height: 53px;
  padding: .5em 1em;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: #5e4dcd;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background-color .3s ease-in-out;
}
.button--submit2 {
  position: absolute;
  right: 36px;
  top: -40px;
  min-height: 105px;
  padding: .5em 1em;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: #5e4dcd;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background-color .3s ease-in-out;
}
.button--submit:hover {
  background-color: #5e5dcd;
}

.button--submit2:hover {
  background-color: #5e5dcd;
}

.input:focus, .input:focus-visible {
  border-color: #3898EC;
  outline: none;
}



.card-boxd {
  margin-top: -220px;
  width: 360px;
  height: 350px;
}
.information-box {
  background: rgb(255, 255, 255);
  z-index: 200;
  position: absolute;
  width: 100%;
  min-height: 100vh;
  transition: all 0.4s;
}
.information-box2 {
  background: rgb(255, 255, 255);
  z-index: 200;
  position: absolute;
  width: calc(100% - 240px);
  min-height: 100vh;
  transition: all 0.4s;
}
.big-box {
  width: 100%;
  min-height: 100vh;
  position: relative;
}
.card {
  box-shadow: 0 8px 50px #23232333;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  border-radius: 25px;
  height: 700px;
  background: #ffffff;
  padding: 2rem 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  transition: left 0.4s;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/*Image*/
.card-avatar {
  text-align: center;
  --size: 80px;
  /* background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%); */
  box-shadow: 0 8px 16px #00000033;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  transition: transform 0.2s ease;
  margin-bottom: 1rem;
}

/*Card footer*/
.card-social {
  transform: translateY(200%);
  display: flex;
  justify-content: space-around;
  width: 100%;
  opacity: 1;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.card-social__item {
  list-style: none;
}

.card-social__item svg {
  display: block;
  height: 18px;
  width: 18px;
  fill: #515f65;
  cursor: pointer;
  transition: fill 0.2s ease, transform 0.2s ease;
}

/*Text*/
.card-title {
  color: #333;
  font-size: 1.5em;
  font-weight: 600;
  line-height: 2rem;
}

.card-subtitle {
  color: #859ba8;
  font-size: 0.8em;
}

/*Hover*/

/* .card:hover .card-info {
  transform: translateY(-5%);
}

.card:hover .card-social {
  transform: translateY(100%);
  opacity: 1;
}

.card-social__item svg:hover {
  fill: #232323;
  transform: scale(1.1);
}

.card-avatar:hover {
  transform: scale(1.1);
} */
</style>
