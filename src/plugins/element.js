import Vue from "vue";
import { Button, Pagination, InputNumber, Message } from "element-ui";
// 声明使用按钮插件
Vue.use(Button);
// 使用分页器插件
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.prototype.$message = Message;
