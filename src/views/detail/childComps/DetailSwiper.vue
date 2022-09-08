<template>
  <div class="detail-swiper">
    <swiper class="swiper-bar">
      <swiper-item  v-for="item in topImages" :key="item.acm">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'

export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem,
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swiper-bar{
    height: 300px;
    overflow: hidden;
  }
</style>