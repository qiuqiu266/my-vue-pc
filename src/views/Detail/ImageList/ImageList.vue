<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <!-- <div
        class="swiper-slide"
        v-for="(skuImg, index) in skuInfo.skuImageList"
        :key="skuImg.id"
      >
        <img
          :src="skuImg.imgUrl"
          :class="{ active: currentIndex === index }"
          
        />
        <img src="../images/s1.png">
        <img src="../images/s1.png">
      </div> -->
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" @click="updataCurrentImgIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入swiper两个文件
import Swiper, { Navigation } from "swiper";

// 要使用其他功能 需要先加载
Swiper.use([Navigation]);
// import Swiper from 'swiper'
// import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  // data() {
  //   return {
  //     currentIndex: [], // 存储某个图片的索引
  //   };
  // },
  props: {
    skuImageList: Array, // 小图轮播图数组
    updataCurrentImgIndex: Function,
  },
  // 计算属性
  // computed: {
  //   ...mapGetters(["skuInfo"]),
  // },
  watch: {
    skuImageList() {
      // 监视 一旦触发，说明值发生变化了，此时就有数据,new Siwper
      // 等数据回来，渲染完DOM
      this.$nextTick(() => {
         new Swiper(this.$refs.swiper, {
          slidesPerView:5, // 每页显示轮播图的数量
          spaceBetween:30, // 没张轮播图间距
          slidesPerGroup:5, // 每次切换轮播图数量
          navigation: {
            // swiper-button-prev
            // swiper-button-next
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          },         
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>