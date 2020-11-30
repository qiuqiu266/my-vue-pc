<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div
      class="container"
      @mouseenter="isSearchShow = true"
      @mouseleave="isSearchShow = false"
    >
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="search">
        <div class="sort" v-show="isHomeShow || isSearchShow">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="category in categoryList"
              :key="category.categpryId"
            >
              <h3>
                <!-- 一级分类 -->
                <!-- <a href="">{{ category.categoryName }}</a> -->
                <!-- 第一种方式 使用<router-link>跳转 导致组件产生太多，页面性能不好 -->
                <!-- <router-link
                :to="`/search?categoryName=${category.categoryName}&category1Id=${category.categoryId}`"
                >{{ category.categoryName }}</router-link
              > -->
                <!-- 第二种方式 编程式导航 性能好 但是事件太多了-->
                <!-- <a
                  @click.prevent="
                    $router.push({
                      name: 'search',
                      query: {
                        categoryName: category.categoryName,
                        categoryId: category.categoryId,
                      },
                    })
                  "
                  >{{ category.categoryName }}</a
                > -->
                <!-- 第三种方式  事件委托：事件冒泡机制  元素自定义属性-->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dt>
                      <!-- 二级分类 -->
                      <!-- <a href="">{{ child.categoryName }}</a> -->
                      <!-- <router-link
                      :to="`/search?categoryName=${child.categoryName}&category2Id=${child.categoryId}`"
                      >{{ child.categoryName }}</router-link
                    > -->
                      <!--  -->
                      <!-- <a
                        @click.prevent="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: child.categoryName,
                              categoryId: child.categoryId,
                            },
                          })
                        "
                        >{{ child.categoryName }}</a
                      > -->
                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        >{{ child.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="grandChild in child.categoryChild"
                        :key="grandChild.categoryId"
                      >
                        <!-- 三级分类 -->
                        <!-- <a href="">{{ grandChild.categoryName }}</a> -->
                        <!-- <router-link
                        :to="`/search?categoryName=${grandChild.categoryName}&category3Id=${grandChild.categoryId}`"
                        >{{ grandChild.categoryName }}</router-link
                      > -->
                        <!-- <a
                          @click.prevent="
                            $router.push({
                              name: 'search',
                              query: {
                                categoryName: grandChild.categoryName,
                                categoryId: grandChild.categoryId,
                              },
                            })
                          "
                          >{{ grandChild.categoryName }}</a
                        > -->
                        <a
                          :data-categoryName="grandChild.categoryName"
                          :data-categoryId="grandChild.categoryId"
                          :data-categoryType="3"
                          >{{ grandChild.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { reqCategoryList } from "@api/home";
import { mapState, mapActions } from "vuex";
export default {
  name: "TypeNav",
  // 初始化响应数据
  data() {
    return {
      // categoryList: [],
      isHomeShow: this.$route.path === "/",
      isSearchShow: false,
    };
  },
  // 计算属性
  computed: {
    // 将初始化状态数据映射进来
    // 当使用Vuex 模块化时，此方式就不行了
    // ...mapState(["categoryList"]),

    ...mapState({
      //使用对象的方式 对象中的数据，就会传递给组件
      // categoryList是组件能 接受到所有数据
      // 它的值是一个函数，内部会调用得到值，调用时会将所有数据传递过去，就是state
      categoryList: (state) => state.home.categoryList,
    }),
  },
  // 方法
  methods: {
    // 将获取三级分类信息列表的方法映射进来
    ...mapActions(["getCategoryList"]),

    // 跳转到Search 函数
    goSearch(e) {
      // console.log(e.target.dataset); // dataset自定义属性对象
      // 解构出所需数据
      const { categoryname, categoryid, categorytype } = e.target.dataset;
      // 判断是否是点击的a标签 不是就不跳转
      if (!categoryname) return;
      // 否则就跳转
      // this.$router.push({
      //   name: "search",
      //   query: {
      //     categoryName: categoryname,
      //     [`category${categorytype}Id`]: categoryid,
      //   },
      // });

      // 隐藏分类列表
      this.isSearchShow = false;

      const location = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      const {searchText} = this.$route.params
      // 判断是否有params参数 有就加上
      if(searchText){
        location.params={
          searchText
        }
      }
      this.$router.push(location);
    },
  },
  mounted() {
    // 调用Vuexactions函数
    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // 控制显示隐藏过渡效果
      &.search-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }
      &.search-enter {
        height: 0;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
