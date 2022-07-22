<template>
  <div class="back-top">
    <img src="../../../assets/img/back-top.png">
  </div>
</template>

<script>
export default {
  name:"BackTop",
  methods:{
    backClick(){
      this.$emit('backClick')
    }
  }
}
</script>

<style>
  .back-top{
    position: fixed;
    right: 5px;
    bottom: 45px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>