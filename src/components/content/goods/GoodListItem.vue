<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">⭐{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%; 
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}

.goods-info{
  font-size: 12px;
  position: absolute;
  border: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  text-align: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-higr-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
</style>