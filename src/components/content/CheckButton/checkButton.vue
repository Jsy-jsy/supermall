<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="../../../assets/img/detail/check_active.png" alt=""> 
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-button{
  /* background-color:red; */
  border: 2px solid #aaa;
  border-radius: 50%;
}
.check-button img{
  width: 20px;
  height: 20px;
}
.check{
  border-color: red;
  background-color: red;
}
</style>