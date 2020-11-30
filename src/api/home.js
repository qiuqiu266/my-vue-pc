import request from '@utils/request'

// 侧边导航分类接口
export const reqCategoryList = () => {
  return request({
    method:"GET",
    url:"/product/getBaseCategoryList",   
  })
}
