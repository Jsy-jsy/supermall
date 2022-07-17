<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "../../views/home/childComps/homeSwiper.vue"
import RecommendView from './childComps/RecommendView.vue';
import { getHomeMultidata } from "../../network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  // 保存请求过来的data数据
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-high-text);
  color: white;
}
</style>