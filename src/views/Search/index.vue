<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- <li class="with-x">手机</li> -->
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              关键字:{{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-show="options.categoryName"
              @click="delCategory"
            >
              分类名称:{{ options.categoryName }}<i>×</i>
            </li>
            <!-- 3913:惠夫人--需要显示的是不携带id 所以需要使用split()方法 -->
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌:{{ options.trademark.split(":")[1] }}<i>×</i>
            </li>
            <!-- 品牌属性 -->
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delProp(index)"
            >
              {{ prop.split(":")[2] }}:{{ prop.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProp" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- :class="{ active: options.order.indexOf('1') > -1 }" -->
                <li :class="{ isOrder: '1' > -1 }" @click="setOrder('1')">
                  <a
                    >综合
                    <i
                      :class="{
                        iconfont: true,
                        'icon-arrow-up': !isDown,
                        'icon-arrow-down': isDown,
                      }"
                    ></i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <!-- :class="{ deactive:options.order.indexOf('2') > -1 }" -->
                <li :class="{ isOrder: '2' > -1 }" @click="setOrder('2')">
                  <a
                    >价格
                    <span>
                      <!-- <i
                        :class="{
                          iconfont: true,
                          'icon-caret-up': true,
                          deactive:
                            options.order.indexOf('2') > -1 && isPriceDown,
                        }"
                      ></i> -->
                      <i
                        :class="{
                          iconfont: true,
                          'icon-caret-up': true,
                          deactive: isOrder('2') > -1 && isPriceDown,
                        }"
                      ></i>
                      <!-- <i
                        :class="{
                          iconfont: true,
                          'icon-caret-down': true,
                          deactive:
                            options.order.indexOf('2') > -1 && !isPriceDown,
                        }"
                      ></i> -->
                      <i
                        :class="{
                          iconfont: true,
                          'icon-caret-down': true,
                          deactive: isOrder('2') > -1 && !isPriceDown,
                        }"
                      ></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :current-page="options.pageNo"
            :pager-count="7"
            :page-size="5"
            :total="total"
          />
          <!-- <el-pagination
            @size-change="handleSizeChange" // 每页条数发生变化
            @current-change="handleCurrentChange" //选择每页页码的函数
            :current-page="options.pageNo"
            :pager-count="7"
            :page-sizes="[5, 10, 15, 20]" 选择每页几条 的选项
            :page-size="5" 默认每页显示5条
            background
            layout="
              prev,
              pager, 
              next, 
              total, 
              sizes, 
              jumper"
            :total="total" 总条数
          >
          </el-pagination> -->
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :pager-count="7"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            background
            layout="
              prev,
              pager, 
              next, 
              total, 
              sizes, 
              jumper"
            :total="total"
          >
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@comps/TypeNav";
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapActions } from "vuex";
import Pagination from "@comps/Pagination";

export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "", // 一级分类
        category2Id: "", // 二级分类
        category3Id: "", // 三级分类
        categoryName: "", // 分类名称
        keyword: "", // 搜索内容(搜索关键字)
        order: "1:desc", //  排序---升降序
        pageNo: 1, // 分页的页码
        pageSize: 5, // 每页的 数量
        props: [], // 商品的属性
        trademark: "", // 品牌
      },
      isDown: true, // 综合排序图标(降序)
      isPriceDown: false, // 价格排序图标(升序)
    };
  },
  // 计算属性
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  // 监视
  watch: {
    /*
       
    */
    // 监视路由路径(地址变化)
    $route() {
      this.updataProductList();
    },
  },
  methods: {
    ...mapActions(["getProductList"]),
    /*
      发送请求会携带参数，不能确定到底携带什么参数，所以需要获取 query,params 参数
    */
    // 定义一个更新数据的方法，方便调用
    updataProductList(pageNo = 1) {
      // 获取params参数 解构
      const { searchText: keyword } = this.$route.params;
      // 获取query参数 解构
      const {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      //
      const options = {
        ...this.options, // 携带所有初始化数据
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        pageNo,
      };
      this.options = options;
      // 调用发送请求
      this.getProductList(options);
    },

    // 删除关键字
    delKeyword() {
      // 清空options.keyword
      this.options.keyword = "";
      // 清空header的 clearKeyword (触发删除的自定义事件)
      this.$bus.$emit("clearKeyword");
      // 清除路径params参数
      // this.$route上面的属性 是只读属性，不能修改
      // this.$route.params = {};
      // 重新更新路径信息
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    // 删除分类
    delCategory() {
      this.options.categoryName = "";
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    // 添加品牌并更新数据方法
    addTrademark(trademark) {
      // 判断是否已经有某个品牌
      if (this.options.trademark) return;
      // 传入需要添加的属性数据
      this.options.trademark = trademark;
      // 调用方法 更新数据
      this.updataProductList();
    },
    // 删除品牌
    delTrademark() {
      this.options.trademark = "";
      // 调用更新数据
      this.updataProductList();
    },
    // 添加品牌属性
    addProp(prop) {
      // 先判断是否已经存在某个品牌属性
      if (this.options.props.indexOf(prop) > -1) return;
      this.options.props.push(prop);
      this.updataProductList();
    },
    // 删除品牌属性
    delProp(index) {
      this.options.props.splice(index, 1);
      this.updataProductList();
    },
    // 排序点击切换高亮
    setOrder(order) {
      // 解构
      let [orderNum, orderType] = this.options.order.split(":");
      // 判断不相等 点击的就是第一次 不切换字体图标
      // 相等点击的就是第二次 切换字体图标
      if (orderNum === order) {
        // 再判断 是要改变综合爱上价格的图标
        //  order 是1 改变综合排序
        // order 是2 改变价格排序
        if (order === "1") {
          this.isDown = !this.isDown;
        } else {
          this.isPriceDown = !this.isPriceDown;
        }
        orderType = orderType == "desc" ? "asc" : "desc";
      } else {
        // 判断点击一次，如果点击的是综合，就初始化为降desc
        if (order === "1") {
          // 让价格排序为默认(升序高亮)
          // this.isPriceDown = false;
          // 点击第一次是价格 orderType就初始化为asc 升序
          // orderType = "asc";
          orderType = this.isDown ? "desc" : "asc";
        } else {
          // 否则 点击第一次的就是价格，orderType就初始化为asc 升序
          // orderType = "desc";
          this.isPriceDown = false;
          orderType = "asc";
        }
      }
      this.options.order = `${order}:${orderType}`;
      this.updataProductList();
    },
    // 当每页条数发送变化
    handleSizeChange(pageSize) {
      this.options.pageSize = pageSize;
      this.updataProductList();
    },
    // 当每页码发送变化
    handleCurrentChange(pageNo) {
      this.updataProductList(pageNo);
    },
    // 判断排序以是否以 order 开头
    isOrder(order) {
      return this.options.order.indexOf(order) > -1;
    },
  },
  mounted() {
    /*
      mounted中发送请求只会更新渲染一次，地址栏更新了，界面没有渲染
              所以需要去监视路由路径(watch监视地址栏路径变化)
    */
    this.updataProductList();
  },
  components: {
    SearchSelector,
    TypeNav,
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                justify-content: space-around;
                align-items: center;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                // font-size: 14px;
                // line-height: 8px;
                i {
                  padding-left: 5px;
                }
                span {
                  display: flex;
                  flex-direction: column;
                  line-height: 8px;
                  // height: 30px;
                  i {
                    font-size: 18px;
                    // transform: scale(0.5);
                    &.deactive {
                      color: rgba(255, 255, 255, 0.5);
                    }
                  }
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>