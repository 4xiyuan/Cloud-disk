<template>
  <div >
  </div>
</template>

<script type="text/javascript">
   export default {
   data() {
       return {

       }
   },
   created(){
    let paths = this.$route.query.paths
    let name =this.$route.query.name
    let belong = this.$route.query.belong
    if(name+belong){
      this.$router.push({
        path: paths,
        query: {
          name: name,
          belong:belong,
        }
      })
    }else{
      this.$router.push(paths)
    }
    
   },
   methods:{
   }
   }
</script>

<style scoped>
</style>
