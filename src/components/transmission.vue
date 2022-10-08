<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
      <li style="list-style-type: none;" v-for="index in 6" :key="index">
        <div class="uploadbox">
            <div class="uploadlist">123</div>
            <div class="uploadlist1">456</div>
        </div>
      </li>
  </div> 
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        //侧边栏状态
          sidebartypes:sessionStorage.getItem('sidebartype')=='true',
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
*{
    margin:0;
    padding:0;
  }
body {
  margin:0;
  padding:0;
  border:0;
}
.xlayer{
  margin-top: 90px;
  position: absolute;
  width: 100%;
}
.xlayer2{
  margin-top: 90px;
  position: absolute;
  width: 100%;
}

.uploadbox{
    width: 100%;
    overflow: hidden;
    
}
.uploadlist{
    width: 88.6%;
    float: left;
    border: 1px red solid;
    height: 100px;
    border-right: none;
}
.uploadlist1{
    width: 11.2%;
    float: left;
    border: 1px red solid;
    height: 100px;
}
</style>
