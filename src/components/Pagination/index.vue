<template>
  <div class="pagination">
    <button @click="setCurrentPages(myCurrentPage - 1)">上一页</button>
    <button
      :class="{ active: myCurrentPage === 1 }"
      @click="setCurrentPages(1)"
    >
      1
    </button>
    <!-- <button>1</button> -->
    <button v-show="startEnd.start > 2">...</button>
    <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="setCurrentPages(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button>
    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button
      :class="{ active: myCurrentPage === totalPages }"
      v-show="totalPages > 1"
      @click="setCurrentPages(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button @click="setCurrentPages(myCurrentPage + 1)">下一页</button>
    <button>总数：{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 声明接受
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 显示按钮的数量
    pagerCount: {
      type: Number,
      Validator(val) {
        // 验证 验证通过才会使用
        // 大于等于5 且小于等于21 的奇数
        // 返回true 验证通过 返回false 验证失败
        return val > 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 5,
    },
    // 总数
    total: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  // 初始化数据
  data() {
    return {
      // 为了方便修改myCurrentPage ,定义data数据
      // 因为：paops数据是只读不修改
      myCurrentPage: this.currentPage,
    };
  },
  // 监视
  watch: {
    // 让每次页面发生变化 加载新数据
    myCurrentPage(currentPage) {
      this.$emit("current-change", currentPage);
    },
    // 当外面页面发生变化 里面页面也要变化
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
  // 计算属性
  computed: {
    // 总页数（显示多少页
    totalPages() {
      // 总页数 = 总条数 / 每页显示的条数
      // (如果总的有21条 那么每页显示5条 实际要显示5页 所以要使用向上取整的方法)
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算中间按钮的开始和结尾的按钮值
    startEnd() {
      // 收集所有参与的参数 (当前点击的页码数，中间显示的按钮数量，总页码数)
      const { myCurrentPage, pagerCount, totalPages } = this;
      // star-end 的按钮数量(不包含 开头和结尾)
      // pagerCount - 2
      const count = pagerCount - 2;
      // 中间的一半
      const halfCount = Math.floor(count / 2);
      // 初始化start end
      let start, end;
      // 开始计算
      // 当 当前页 大于等于 总页码 - 2 时 start = 当前页 - halfCount
      if (myCurrentPage >= totalPages - halfCount) {
        //
        start = totalPages - count;
      } else {
        start = myCurrentPage - halfCount;
      }
      if (start <= 2) {
        start = 2;
      }

      // 结尾的页码
      end = start + count - 1;
      // 判断如果结尾页码 大于等于 总页码 是不行的 就应该是 总页码减1 才是最后的结尾页码
      if (end >= totalPages) {
        end = totalPages - 1;
      }
      return {
        start,
        end,
      };
    },
    // 遍历的按钮数量
    mapBtnsCount() {
      /* startEnd.end - startEnd.start + 1 >= 1
        ? startEnd.end - startEnd.start + 1
        : 0" */
      // 解构出 start , end
      const { start, end } = this.startEnd;
      // 计算出
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  // 方法
  methods: {
    setCurrentPages(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>
