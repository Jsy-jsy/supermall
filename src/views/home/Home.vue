<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    >
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "../../views/home/childComps/homeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodList from "../../components/content/goods/GoodList.vue";
import Scroll from "../../components/common/scorll/scroll.vue";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { itemListenerMixin,backTopMixin } from "../../components/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
  },
  mixins: [itemListenerMixin,backTopMixin],
  // 保存请求过来的data数据
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 切换页面时 销毁首页
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0.1);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // console.log('mounted');
  },
  methods: {
    /* 事件监听相关方法 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
      // console.log(this.$refs.scroll.message);
      // console.log('回到顶部');
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定Topbar是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 获取tabControl的offsetTop
    // 所有组件都有$el 这是用于获取组件中的元素的
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    /* 网络请求相关方法 */
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    // 2.请求商品数据
    getHomeGoods(type) {
      // 获取页数
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 将获取的list追加到res数组中
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 完成下拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style  scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-high-text);
  color: white;
  /*   position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 5;
}
.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>