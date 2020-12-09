<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselList"
        :key="carousel.id"
      >
        <img v-lazy="carousel.imgUrl" />
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
  // 监视
  watch: {
    // 监视carouselList 是否有数据(渲染出来)
    carouselList() {
      /*
        carouselList数组 最终数据--数据发生变化才会触发
        轮播图实现需要满足
        轮播图DOM元素要渲染完成-->轮播图数据
        this.$nextTick为了确保轮播图数据已经渲染成DOM元素
      */
      // 判断--->确保swiper不能new 多次
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      // new Swiper() 第一个参数为 轮播图的容器，第二个参数 式一个对象
      //  this.$refs.swiper 取代.swiper-container
      // 使用this.$refs.swiper 才能确保轮播图组件使用的是自己的swiper
      this.swiper = new Swiper(this.$refs.swiper, {
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
    },
  },
  // 生命周期
  mounted() {
    /*
     要有轮播图数据 且 轮播图DOM元素要渲染完成 才能new swiper

      ListContainer 
      一上来是没有数据的 ---> 触发watch
      floorList
      一上来有数据---触发mounted
    */
    // 判断carouselList是否有数据
    if (!this.carouselList.length) return;
    this.initSwiper();
  },
};
</script>
<style lang="less" scoped>
</style>
