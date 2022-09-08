<template>
  <div id="detail-wrapper">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
    <!-- <h2>详情页：{{iid}}</h2> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "../../components/common/scorll/scroll.vue";
import GoodList from "../../components/content/goods/GoodList.vue";
// import Toast from "../../components/common/toast/Toast.vue"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
import { debouce } from "../../components/common/untils";
import { itemListenerMixin, backTopMixin } from "../../components/common/mixin";

import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
     /*  message:'',
      show:false */
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 1.获取顶部的图片轮播数据
      this.topImages = res.data.result.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        res.data.result.itemInfo,
        res.data.result.columns,
        res.data.result.shopInfo
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(res.data.result.shopInfo);

      // 4.取出店铺的信息
      this.shopInfo = res.data.result.shopInfo;

      // 5.保存商品的详情数据
      this.detailInfo = res.data.result.detailInfo;

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(
        res.data.result.itemParams.info,
        res.data.result.itemParams.rule
      );

      // 7.取出评论的信息
      if (res.data.result.rate.cRate !== 0) {
        this.commentInfo = res.data.result.rate.list[0];
      }

      /* this.$nextTick(() => {
        // 这是根据最新的数据，对应的DOM是已经被渲染出来的
        // 但是图片依然是没有加载完成的（目前offsetTop获取到的数值是不包含图片的）
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      }); */
      this.getThemeTopY();
      // console.log(this.themeTopYs);
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
      console.log(res);
    });

    // 4.给getThemeTopY赋值(对给this.themTopYs赋值的操作进行防抖)
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听scroll位置信息
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY与主题中的值进行对比
      // 当positionY在第一个到第二个值之间 index=0，index往后累加
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 500;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车里(1.promise, mapActions)
      // Actions可以返回一个Promise  mapActions的映射关系
      this.addCart(product).then(res =>{
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false,
        //   this.message = ''
        // }, 1500);
        this.$toast.show(res,2000)
        // console.log(this.$toast);
      })

      /* this.$store.dispatch("addCart", product).then(res=>{
        console.log(res);
      }) */

      // 3.添加到购物车成功

    },
  },
  mounted() {
    /*  // 请求数据列表后刷新
    this.itemImgLister = () => {
      this.$refs.scroll.refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgLister); */
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail-wrapper {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>