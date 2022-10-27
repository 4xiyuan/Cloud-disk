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
    let name =this.$route.query.name
    let belong = this.$route.query.belong
    this.$router.push({
        path: '/folder',
        query: {
          name: name,
          belong:belong,
        }
      })
   },
   methods:{
   }
   }
</script>

<style scoped>
</style>
