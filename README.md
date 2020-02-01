# 外卖系统、管理系统，包括前、后台

## 说明

该项目的外卖订餐部分的UI布局是**仿写饿了么**移动端，商家店铺管理系统是基于`vue-element-admin`进行的二次开发，接口数据都来源于配套的后台服务

## 仓库、预览

- [外卖系统](https://github.com/linhuibin98/order-client)
  - [github地址](https://github.com/linhuibin98/order-client)
  - [预览地址(手机端, 或pc浏览器开发者手机模式)](http://www.linhuibin.com/client): http://www.linhuibin.com/client

- [商家店铺管理系统](https://github.com/linhuibin98/order-cms)
  - [github地址](https://github.com/linhuibin98/order-cms)
  - [预览地址](http://www.linhuibin.com/cms): http://www.linhuibin.com/cms

- [后台服务](https://github.com/linhuibin98/order-server)
  - [github地址](https://github.com/linhuibin98/order-server)
  - [接口文档(待添加)]()

## 外卖订餐

### 技术栈

- create-react-app 脚手架创建项目

- react + redux + react-router v4 + axios + less

- 采用`vw`移动端页面适配

### 目标功能

 - [x] 注册、登录、登出
 - [x] 登录图形验证码
 - [x] 用户信息详情
 - [x] 头像上传、预览头像
 - [x] 修改密码
 - [x] 店铺列表页
 - [x] 店铺详情页
 - [x] 购物车功能
 - [x] 下单功能
 - [x] 支付宝支付接口
 - [x] 历史订单列表
 - [x] 订单详情
 - [x] (增、删、改、选)收货地址
 - [ ] 修改绑定手机
 - [ ] 收藏商品
 - [ ] 下载APP
 - [ ] 红包
 - [x] 搜索功能(店铺、商品)
 - [ ] 店铺评价页
 - [ ] 商品详情
 - [ ] 定位
 - [x] 自动部署

## 项目运行

```sh
# 克隆项目
git clone git@github.com:linhuibin98/order-client.git

cd order-client

# 安装依赖
yarn install 或 npm install

# 运行
yarn start 或 npm start
```
