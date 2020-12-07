<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button
              @click="updateCount(cart.skuId, -1, cart.skuNum)"
              class="mins"
            >
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @blur="update(cart.skuId, cart.skuNum, $event)"
              @input="formatSkuNum"
            />
            <!-- :disabled="cart.skuNum === 10"  限制数量 -->
            <button
              @click="updateCount(cart.skuId, 1, cart.skuNum)"
              class="plus"
            >
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ShopCart",
  // 计算属性
  computed: {
    ...mapState({
      cartList: (state) => state.shopcart.cartList,
    }),
    //商品总数
    total() {
      return (
        this.cartList
          // 过滤掉 保留isChecked 为1的 已勾选的 然后进行数量累加
          .filter((cart) => cart.isChecked === 1)
          .reduce((p, c) => p + c.skuNum, 0)
      );
    },
    // 商品总价
    totalPrice() {
      return this.cartList
        .filter((cart) => cart.isChecked === 1)
        .reduce((p, c) => p + c.skuNum * c.skuPrice, 0);
    },
  },

  // 方法
  methods: {
    ...mapActions(["getCartList", "updateCartCount"]),
    // 格式化数据 (输入数量数字排除非法数字)
    formatSkuNum(e) {
      //   使用replace 方法 替换掉非法数字 并重新赋值给 skuNum
      let skuNum = +e.target.value.replace(/\D+/g, "");
      // 判断 数量不能小于1
      if (skuNum < 1) {
        skuNum = 1;
        //  判断 数量不能大于库存数量 10
      } else if (skuNum > 10) {
        skuNum = 10;
      }
      // 更新输入的数量
      e.target.value = skuNum;
    },

    // 更新 增加 减少数量
    //     参数e  必须 放在后面
    update(skuId, skuNum, e) {
      // value 当前用户输入的数量    当用户输入的数量小于当前存在的数量 就减少 反则增加
      // value ---6   已存在数量3   value - skuNum 就是需要减少的数量
      // e.target.value 是 字符串 skuNum 是number类型，做计算操作是没有问题的
      // console.log(e.target.value);
      this.updateCartCount({ skuId, skuNum: e.target.value - skuNum });
    },
    //
    //  (方式一 在标签中添加 :disabled="cart.skuNum === 10"  限制数量)
    // // 商品 加，减 数量
    // async updateCount(skuId, skuNum) {
    //   // 更新商品数据  是先更新商品数据 再刷新页面，所有添加await
    //   await this.updateCartCount({ skuId, skuNum });
    //   // 刷新页面，重新获取所有数据
    //   // this.getCartList();
    // },
    /*
      更新商品数量
      @params skuId 商品的id
      @params skuNum 商品的增加，减少
      @params count 商品数量
    */
    //  方式二：
    // 商品 加，减 数量
    async updateCount(skuId, skuNum, count) {
      // 判断 商品数量小于等于1 减少
      if (count <= 1 && skuNum === -1) {
        // 满足条件 说明用户想删除商品
        if (window.confirm("您是否要删除当前商品?")) {
          // 是 就删除
        }
        return;
      }
      // 当商品数量大于库存 并且 还要增加时
      if (count >= 10 && skuNum === 1) {
        // 给出提示 超出库存 不能再加了
        alert("超出库存了");
        return;
      }
      // 更新商品数据  是先更新商品数据 再刷新页面，所有添加await
      await this.updateCartCount({ skuId, skuNum });
      // 刷新页面，重新获取所有数据
      this.getCartList();
    },
  },

  // 生命周期
  mounted() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 20%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 15%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>