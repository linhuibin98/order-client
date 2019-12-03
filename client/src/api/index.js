import axios from 'axios';
import { getStorage } from '../util/storage';

axios.defaults.baseURL = 'http://127.0.0.1:8080/api/public/v1';

axios.interceptors.request.use(config => {
  // 请求头添加token
  config.headers.Authorization = `${getStorage('token')}`;
  return config;
},error => {
  return Promise.reject(error);
});

// 获取店铺列表
export function getStoreList() {
  return axios.get('/stores');
}

// 通过店铺Id 获取详细信息->food 
export function getShopDetail(id) {
  return axios.get(`/store/detail/${id}`);
}

// 注册
export function userRegister(opts) {
  return axios.post('/user/register', {
    data:{
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
export function requestGetOrders(id) {
  return axios.get(`/order/${id}`)
}

//添加收货地址
export function reqAddAddress(data) {
  return axios.post('/address/add', {
    data
  })
}

//获取收货地址
export function reqGetAddress(id) {
  return axios.get(`/address/${id}`);
}