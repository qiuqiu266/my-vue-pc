<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
//
import { mapState, mapActions } from "vuex";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import TodayRecommend from "./TodayRecommend";
import TypeNav from "@comps/TypeNav";
export default {
  name: "Home",
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
    TypeNav,
  },
  // 计算属性
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  // 方法
  methods: {
    ...mapActions(["getfloorList"]),
  },
  // 生命周期函数
  mounted() {
    this.getfloorList();
  },
};
</script>

<style lang="less" scoped>
</style>