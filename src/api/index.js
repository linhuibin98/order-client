import axios from 'axios'
import { getStorage } from '../util/storage'
import Loading from '../components/loading'
import Toast from '../components/toast'

// http://www.linhuibin.com/api/public/v1
// http://127.0.0.1:8080/api/public/v1
// let env = process.env.NODE_ENV
axios.defaults.baseURL = 'http://www.linhuibin.com/api/public/v1'
// 请求队列
let queueNum = 0

axios.interceptors.request.use(
  config => {
    Loading.show()
    queueNum++

    // 请求头添加token
    config.headers.Authorization = `${getStorage('token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    queueNum--
    
    if (queueNum === 0) {
      setTimeout(() => {
        Loading.close()
      }, 0)
    }
    

    if (response.status === 401) {
      Toast.error('登录失效, 请重新登录...')
    }

    if (response.status === 400) {
      Toast.error('参数错误...')
    }

    return response
  },
  error => {
    // Do something with response error
    // 请求失败也要关闭loading
    queueNum--
    
    if (queueNum === 0) {
      setTimeout(() => {
        Loading.close()
      }, 0)
    }
    return Promise.reject(error)
  }
)

// 获取店铺列表
export function getStoreList() {
  return axios.get('/stores')
}

// 获取首页店铺、轮播图数据
export function reqHomeData() {
  return axios.all([getStoreList(), reqCarousel()])
}

// 轮播图
export function reqCarousel() {
  return axios.get('/carousel')
}

// 通过店铺Id 获取详细信息->food
export function getShopDetail(id) {
  return axios.get(`/store/detail/${id}`)
}

// 注册
export function userRegister(opts) {
  return axios.post('/user/register', {
    data: {
      ...opts
    }
  })
}

// 登录
export function requestUserLogin(opts) {
  return axios.post('/user/login', {
    data: {
      ...opts
    }
  })
}

// token校验
export function validateToken() {
  return axios.get('/validate/token')
}

// 支付成功，生成订单
export function generateOrder(data) {
  return axios.post('/order', {
    data
  })
}

// 获取订单
export function requestGetOrders() {
  return axios.get('/order')
}

// 订单详情
export function reqOrderDetail(orderNum) {
  return axios.get(`/order/detail/${orderNum}`)
}

//添加收货地址
export function reqAddAddress(data) {
  return axios.post('/address/add', {
    data
  })
}

//获取收货地址
export function reqGetAddress() {
  return axios.get('/address')
}

// 获取指定收货地址
export function reqGetTargetAddress(id) {
  return axios.get(`/address/one/${id}`)
}

// 删除地址
export function reqDeleteAddress(id) {
  return axios.delete(`/address/delete/${id}`)
}

// 修改收货地址
export function reqUpdateAddress(id, data) {
  return axios.put(`/address/update/${id}`, data)
}

// 用户更改头像
export function uploadAvatar({ data, id }) {
  return axios.post(`/user/avatar/?id=${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取用户头像
export function getAvatar(id) {
  return axios.get(`/user/avatar/${id}`)
}

// 修改密码
export function changePassword(data) {
  return axios.post('/user/password', data)
}

// 搜索
export function searchGood(q) {
  return axios.get('/client/search', {
    params: {
      q
    }
  })
}
