<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MainTabBar from '../src/components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>
<style>
  @import "assets/css/base.css"
</style>
