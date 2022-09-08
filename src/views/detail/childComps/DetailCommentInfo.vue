<template>
  <div class="comment-info-wrap" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title flex">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div v-for="item in commentInfo" :key="item.acm">
      <div class="comment-user-info">
        <span><img :src="commentInfo.user.avatar" alt="" class="avatar" /></span>
        <span>{{ commentInfo.user.uname}}</span>
      </div>
      <div class="comment-text">{{ commentInfo.content }}</div>
      <div class="comment-goods-info">
        <span class="comment-time">{{ commentInfo.created | showDate}}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="flex">
        <div
          class="comment-info-images"
          v-for="(item,index) in commentInfo.images"
          :key="index"
        >
          <img :src="item"  alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../components/common/untils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      //将时间戳转换成date对象
      const date = new Date(value * 1000);
      //将date进行格式化
      return formatDate(date, "yyyy/MM/dd hh:mm");
    },
  },
};
</script>

<style scoped>
.comment-info-wrap {
  padding: 0 8px;
  font-size: 14px;
  border-bottom: 4px solid #ececec;
}
.comment-title {
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
}
.comment-user-info {
  padding: 10px 0;
}
.comment-user-info .avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: middle;
}
.comment-text {
  line-height: 20px;
}
.comment-goods-info {
  color: #999;
  margin: 4px 0;
}
.comment-goods-info .comment-time {
  margin-right: 10px;
}
.comment-info-images img{
  width: 60px;
  height: 60px;
  margin-right: 6px;
}
</style>
