// 判断该商品是否在购物车里

export default function isCart(cartList, id) {
  cartList = cartList ||  [];
  let cartDetail = cartList.filter(item => {
    // eslint-disable-next-line eqeqeq
    return item.id == id;
  })[0];
  return cartDetail;
}