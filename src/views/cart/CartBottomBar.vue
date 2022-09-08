<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import { itemListenerMixin } from "../../components/common/mixin";
import CheckButton from "../../components/content/CheckButton/checkButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((itemInfo) => {
            return itemInfo.checked;
          })
          .reduce((preValue, itemInfo) => {
            return preValue + itemInfo.price * itemInfo.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((itemInfo) => itemInfo.checked)
        .length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      // 方法一： 使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 方法二： 使用find
      // return !this.$store.state.cartList.find(item =>!item.checked)
      // 方法三： 进行遍历
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods:{
    checkClick(){
      // 方法一： 判断并进行循环
      if(this.isSelectAll){  //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else{ //部分或者全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }

      // 会相互影响 不能简化
      // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  bottom: 43px;
  position: relative;
  line-height: 40px;
  background-color: #eee;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 70px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 10px;
}
.calculate {
  width: 130px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
