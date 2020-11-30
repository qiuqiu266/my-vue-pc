// 使用 Mock
var Mock = require("mockjs");
Mock.Random.ctitle()
Mock.Random.image()
Mock.Random.color()
Mock.Random.first()
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  // "list|1-10": [
  //   {
  //     // 生成1-10个随机对象
  //     // 属性 id 是一个自增数，起始值为 1，每次增 1
  //     "id|+1": 1,
  //   },
  // ],
  // @ctitle 随机中文标题 长度4位
  title:"@ctitle(4)",
  // subTitle|3-10 属性subTitle的值为数组，随机生成长度3-10位
  // @ctitle(1,5) 随机生成长度1-5位的中文标题，
  "subTitle|3-10":["@ctitle(1,5)"],
  // caroucelList|4 属性caroucelList的值为数组，长度为4位
  "caroucelList|4":[
    // @image(大小，颜色，图片格式，图片内容)
    "@image('200x100', '@color',  'png', '@first')"
  ]
});
// 输出结果
console.log(JSON.stringify(data));
