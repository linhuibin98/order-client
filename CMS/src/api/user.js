import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/store/login',
    method: 'post',
    data
  })
}

// 校验token,获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取店铺基本信息
export function getBaseInfo(id) {
  return request({
    url: `/store/info/${id}`,
    method: 'get'
  })
}

// 修改店铺基本信息
export function updateBaseInfo({ id, data }) {
  return request({
    url: `/store/info/${id}`,
    method: 'post',
    data
  })
}

export function getGoods(id) {
  return request({
    url: `/store/goods/${id}`,
    method: 'get'
  })
}

// 更新商品信息
export function updateGoodsInfo({ id, data }) {
  return request({
    url: `/store/goods/${id}`,
    method: 'post',
    data
  })
}

// 删除商品
export function deleteGoods({ id, data }) {
  return request({
    url: `/store/goods/${id}`,
    method: 'delete',
    data
  })
}

// 添加商品
export function addGoods({ id, data }) {
  return request({
    url: `/store/goods/add/${id}`,
    method: 'post',
    data
  })
}

// 获取订单
export function getOrders({ id, page, limit }) {
  return request({
    url: `/store/order/${id}`,
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
