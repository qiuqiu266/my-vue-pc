<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入swiper两个文件
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
// 引入swiper样式
import "swiper/swiper-bundle.min.css";
// 要使用其他功能 需要先加载
Swiper.use([Navigation, Pagination, Autoplay]);
export default {
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    carouselList() {
      this.$nextTick(() => {
        // 判断是否有数据，确保swiper 不会new多次
        if(this.swiper) return
        // new Swiper() 第一个参数为 轮播图的容器，第二个参数 式一个对象
        this.swiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // // 自动播放时间
          // autoplay: true,
          // // 播放速度
          // speed: 1000,
          // 自动播放
          autoplay: {
            // 自动播放速度(间隔时间)
            delay: 2000,
            // 当用户点击下一页时，仍会开启自动轮播
            disableOnInteraction: false,
          },
          // 分页器
          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            // swiper-button-prev
            // swiper-button-next
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          },
          autoplayDisableOnInteraction: false,
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>
