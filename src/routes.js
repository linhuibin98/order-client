import Foods from './pages/Foods'
import User from './pages/User'
import Order from './pages/Order'
import Search from './pages/Search'
import Shop from './pages/Shop'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetail from './pages/OrderDetail'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import MyAddress from './pages/MyAddress'
import AddressAdd from './pages/AddressAdd'
import AddressSelect from './pages/AddressSelect'
import UserInfo from './pages/userInfo/userInfo'
import AvatarUpload from './pages/avatarUpload/AvatarUpload'
import ChangePassword from './pages/changePassword'
import Help from './pages/help'
import OrderAssess from './pages/orderAssess/OrderAssess'
import Regular from './pages/regular/Regular'
import DownloadApp from './pages/downloadApp/DownloadApp'

const needCacheRoutes = [
  { path: '/', name: 'Home', component: Foods },
  {
    path: '/user/address/select',
    name: 'AddressSelect',
    component: AddressSelect,
    auth: true
  },
  {
    path: '/user/address',
    name: 'MyAddress',
    component: MyAddress,
    auth: true
  },
  { path: '/user/info', name: 'UserInfo', component: UserInfo, auth: true },
  { path: '/user', name: 'User', component: User },
  { path: '/order', name: 'Order', component: Order, auth: true },
  {
    path: '/order/assess/:orderNum',
    name: 'OrderAssess',
    component: OrderAssess,
    auth: true
  },
  {
    path: '/order_detail/:storeId/:orderNum',
    name: 'OrderDetail',
    component: OrderDetail
  },
  { path: '/shop/:id', name: 'Shop', component: Shop },
]

const defaultRoutes = [
  // { path: '/', name: 'Home', component: Foods },
  { path: '/user/register', name: 'Refister', component: UserRegister },
  { path: '/user/login', name: 'Login', component: UserLogin },
  { path: '/user/address/add', name: 'AddressAdd', component: AddressAdd },
  {
    path: '/user/address/add/:id',
    name: 'AddressChange',
    component: AddressAdd
  },
  // {
  //   path: '/user/address/select',
  //   name: 'AddressSelect',
  //   component: AddressSelect,
  //   auth: true
  // },
  // {
  //   path: '/user/address',
  //   name: 'MyAddress',
  //   component: MyAddress,
  //   auth: true
  // },
  // { path: '/user/info', name: 'UserInfo', component: UserInfo, auth: true },
  { path: '/user/avatar', name: 'Avatar', component: AvatarUpload, auth: true },
  {
    path: '/user/password',
    name: 'ChangePassword',
    component: ChangePassword,
    auth: true
  },
  // { path: '/user', name: 'User', component: User },
  // { path: '/order', name: 'Order', component: Order, auth: true },
  { path: '/search', name: 'Search', component: Search },
  // { path: '/shop/:id', name: 'Shop', component: Shop },
  {
    path: '/order_confim',
    name: 'OrderConfirm',
    component: OrderConfirmation,
    auth: true
  },
  // {
  //   path: '/order/assess/:orderNum',
  //   name: 'OrderAssess',
  //   component: OrderAssess,
  //   auth: true
  // },
  // {
  //   path: '/order_detail/:storeId/:orderNum',
  //   name: 'OrderDetail',
  //   component: OrderDetail
  // },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/download',
    name: 'Download',
    component: DownloadApp
  },
  {
    path: '/regular',
    name: 'Regular',
    component: Regular
  }
]

const all = [
  { path: '/', name: 'Home', component: Foods },
  { path: '/user/register', name: 'Refister', component: UserRegister },
  { path: '/user/login', name: 'Login', component: UserLogin },
  { path: '/user/address/add', name: 'AddressAdd', component: AddressAdd },
  {
    path: '/user/address/add/:id',
    name: 'AddressChange',
    component: AddressAdd
  },
  {
    path: '/user/address/select',
    name: 'AddressSelect',
    component: AddressSelect,
    auth: true
  },
  {
    path: '/user/address',
    name: 'MyAddress',
    component: MyAddress,
    auth: true
  },
  { path: '/user/info', name: 'UserInfo', component: UserInfo, auth: true },
  { path: '/user/avatar', name: 'Avatar', component: AvatarUpload, auth: true },
  {
    path: '/user/password',
    name: 'ChangePassword',
    component: ChangePassword,
    auth: true
  },
  { path: '/user', name: 'User', component: User },
  { path: '/order', name: 'Order', component: Order, auth: true },
  { path: '/search', name: 'Search', component: Search },
  { path: '/shop/:id', name: 'Shop', component: Shop },
  {
    path: '/order_confim',
    name: 'OrderConfirm',
    component: OrderConfirmation,
    auth: true
  },
  {
    path: '/order/assess/:orderNum',
    name: 'OrderAssess',
    component: OrderAssess,
    auth: true
  },
  {
    path: '/order_detail/:storeId/:orderNum',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/download',
    name: 'Download',
    component: DownloadApp
  },
  {
    path: '/regular',
    name: 'Regular',
    component: Regular
  }
]

export default {
  defaultRoutes,
  needCacheRoutes,
  all
}
