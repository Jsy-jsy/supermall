import {debouce} from "../common/untils";
import BackTop from '../../components/common/backtop/BackTop.vue';


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debouce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入中的内容');
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
    isShowBackTop:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}
