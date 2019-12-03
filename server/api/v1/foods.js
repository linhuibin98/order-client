const Router = require('koa-router');
const { ParameterException } = require('../../core/http-exception');
const StoreModel = require('../../models/StoreModel');

const router = new Router({
  prefix: '/api/public/v1'
});

// 获取所有店铺
router.get('/stores', async (ctx, next) => {
  let stores = await StoreModel.find({});

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    data: stores
  };
  await next();
});

// 注册店铺
router.post('/store/add_store', async (ctx, next) => {
  let { store_name, store_logo_url, distribution_cost, startup_cost, store_grade, store_notice, store_pic } = JSON.parse(ctx.request.rawBody);
  const store = await StoreModel.create({
    store_name,
    store_logo_url,
    distribution_cost,
    startup_cost,
    store_grade,
    store_notice,
    store_pic
  });

  ctx.body = store;
  await next();
});
// 店铺添加商品
router.post('/store/add_food', async (ctx, next) => {
  let { store_name, store_logo_url, distribution_cost, startup_cost, store_grade, store_notice, store_goods } = JSON.parse(ctx.request.rawBody);
  let id = '5dd292a8b077520c2839aa0b';
  const store = await StoreModel.findById(id);

  store.store_goods.push(store_goods);
  let isExit = false;
  store.store_categories.some(cat => {
    if (cat['cat_id'] === store_goods['food_cat_id']) {
      cat.children.push(store_goods);
      isExit = true;
      return true;
    }
    return false;
  });

  !isExit && store.store_categories.push({
    cat_id: store_goods['food_cat_id'],
    cat_name: store_goods['food_cat_name'],
    cat_icon: '',
    children: store_goods
  })
  store.save((err) => {
    if (err) throw err;
    console.log('更新成功');
  })
  ctx.body = store;
  await next();
});
// 获取店铺信息
router.get('/store/detail/:id', async (ctx, next) => {
  let { id } = ctx.params;
  const store = await StoreModel.findById(id);

  const foods_commend = [];
  let store_sales = 0;

  store['store_goods'].forEach(food => {
    if (food['food_commend']) {
      foods_commend.push(food);
    }
  })

  const sendData = {
    errorCode: 0,
    message: 'success',
    data: {
      ...store["_doc"],
      foods_commend
    }
  };
  ctx.body = sendData;
  await next();
})

module.exports = router;