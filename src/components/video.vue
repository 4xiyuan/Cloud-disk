<template>
  <div  :class="sidebartypes ? 'xlayer' :'xlayer2'">
      <li style="float: left;list-style-type: none;" v-for="index in 66" :key="index">
          <div class="Alayer">
            <div class="Alayer-x">
              <div class="tubiao" >
                <img v-if="index%2!=0" style="margin-top: 10px;" src="../../public/photo/music.png" width="80px" height="80px">
                <img v-else style="margin-top: 10px;" src="../../public/photo/video.png" width="80px" height="80px"> 
              </div>
              <div v-if="index%2==0" class="Alayer-text">等你哦啊.mp4</div>
              <div v-else class="Alayer-text">等你哦啊阿.mp3</div>
              <div class="time">2022/08/09 16:40</div>
              <div style="height: 10px;"></div>
            </div>
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
  width: 96%-240px;
  margin-left: 1%;
}
.xlayer2{
  margin-top: 90px;
  position: absolute;
  width: 96%;
  margin-left: 3%;
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
