<template>
  <div id="app">
      <div class="sidebar">
          
      </div>
      <transition name="fade">
          <router-view/>
      </transition>
  </div>
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        
       }
   },
   methods:{
   }
   }
</script>

<style>
*{
    margin:0;
    padding:0;
  }
body {
  margin:0;
  padding:0;
  border:0;
}
.sidebar{
  
  position: fixed;
  width: 50px;
  height: 100vh;
  transition: all .4s;
  float: left;
  overflow: hidden;
  z-index: 200;
  
}
.sidebar:hover{
  width: 240px;
}


.fade-enter-active {
  transition: all .8s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(40px);
}
</style>


