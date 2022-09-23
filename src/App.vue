<template>
  <div id="app">
      <transition name="fade">
          <router-view/>
      </transition>
  </div>
</template>

<script type="text/javascript">
   export default {
   data() {
       return {
        show:true,
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

.fade-enter-active {
  transition: all .8s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(40px);
}
</style>


