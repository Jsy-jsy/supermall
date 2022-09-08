<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./CartList.vue";
import CartBottomBar from "./CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 两种语法 数组和对象都表示一一对应的关系，但是对象可以修改名字
    // ...mapGetters(['cartLength','cartList'])
    // 方法二
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-text);
  color: #fff;
}
</style>