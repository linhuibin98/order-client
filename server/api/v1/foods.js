const Router = require('koa-router');
const { ParameterException, DBException } = require('../../core/http-exception');
const StoreModel = require('../../models/StoreModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = new Router({
  prefix: '/api/public/v1'
});

const secret = 'lhblinhibin';

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

// 店铺账号密码
router.post('/store/set', async (ctx, next) => {
  let { data: { phone, password } } = JSON.parse(ctx.request.rawBody);
  let id = '5dd292a8b077520c2839aa0b';
  let store = await StoreModel.findById(id);

  store.phone = phone;
  store.password = password;

  store.save(err => {
    if (err) throw err;
    console.log('账号更新成功...');
  });

  ctx.body = {
    errorCode: 0,
    message: 'ok'
  }

  await next();
})

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

// 店铺登录 后台管理
router.post('/store/login', async (ctx, next) => {
  let { username, password } = JSON.parse(ctx.request.rawBody);

  let store = await StoreModel.findOne({
    phone: username
  });

  if (!store || crypto.createHash('sha1', secret).update(password).digest('hex') !== store.password) {
    ctx.body = {
      errorCode: 1,
      message: '用户不存在或密码错误'
    }
  } else {
    let sendData = {
      name: store.store_name,
      avatar: store.store_logo_url,
      introduction: '',
      roles: ['1'],
      id: store._id
    }

    ctx.body = {
      errorCode: 0,
      message: 'ok',
      data: {
        userInfo: sendData,
        token: jwt.sign(sendData, secret, {
          expiresIn: 60
        })
      }
    }
  }

  await next();
})

// 校验token, 获取信息
router.get('/user/info', async (ctx, next) => {
  let { token } = ctx.request.query;
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      ctx.body = {
        errorCode: 1,
        message: '身份过期, 请重新登陆...'
      }
    } else {
      let { name, avatar, introduction, roles, id } = decode;
      ctx.body = {
        errorCode: 0,
        message: 'ok',
        data: {
          name,
          avatar,
          introduction,
          roles,
          id
        }
      }
    }
  })
  await next();
});

// 登出
router.post('/user/logout', async (ctx, next) => {
  ctx.body = {
    errorCode: 0,
    message: 'ok'
  }
  await next();
})

// 店铺添加商品
router.post('/store/goods/add/:id', async (ctx, next) => {
  let { id } = ctx.params;
  let data = JSON.parse(ctx.request.rawBody);

  const store = await StoreModel.findById(id);

  // 存放所有的id
  const ids = [];

  store.store_goods.forEach(item => {
    ids.push(item.food_id);
  })

  // 生成新id, 为当前最大id + 1
  const food_id = Math.max.apply(null, ids) + 1;

  const food = {
    ...data,
    food_id
  }
  
  store.store_goods.unshift(food);
  
  const index = store.store_categories.findIndex(item => item.cat_name === data.food_cat_name);

  if (index < 0) { // 不存在当前分类,新建分类
    store.store_categories.unshift({
      cat_name: data.food_cat_name,
      children: [food]
    })
  } else {
    store.store_categories[index].children.unshift(food)
  }

  store.save((err) => {
    if (err) throw err;
    console.log('更新成功');
  })
  ctx.body = {
    errorCode: 0,
    message: '添加成功...',
    data: store.store_goods
  };
  await next();
});

// 获取店铺详细信息
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

// 获取店铺基本信息
router.get('/store/info/:id', async (ctx, next) => {
  let { id } = ctx.params;
  let store = await StoreModel.findById(id);

  let { store_name: name, store_notice: notice, store_logo_url, distribution_cost: distributionCode, startup_cost: startupCost } = store;

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    data: {
      name,
      notice,
      distributionCode,
      startupCost
    }
  }

  await next();
})

// 修改店铺基本信息
router.post('/store/info/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const { distributionCode, name, notice, startupCost } = JSON.parse(ctx.request.rawBody);

  const store = await StoreModel.findById(id);

  store['store_name'] = name;
  store['distribution_cost'] = distributionCode;
  store['startup_cost'] = startupCost;
  store['store_notice'] = notice;

  store.save(err => {
    if (err) throw err;
    console.log('信息修改成功...');
  })

  ctx.body = {
    errorCode: 0,
    message: '修改成功...'
  }

  await next();
})

// 根据storeId获取商品列表
router.get('/store/goods/:id', async (ctx, next) => {
  let { id } = ctx.params;
  try {
    let store = await StoreModel.findById(id);

    const cates = [];

    store.store_categories.forEach(item => {
      cates.push(item.cat_name);
    })

    ctx.body = {
      errorCode: 0,
      message: 'ok',
      data: {
        goods: store.store_goods,
        cates
      }
    }
  } catch (e) {
    throw new DBException(e.message);
  }

  await next();
})

// 修改商品的信息
router.post('/store/goods/:id', async (ctx, next) => {
  let { id } = ctx.params

  let store = await StoreModel.findById(id);

  let { food_name, food_cat_name, food_commend, food_price, food_ingredient, food_id } = JSON.parse(ctx.request.rawBody);

  let index = store.store_goods.findIndex(item => item.food_id == food_id);

  let food = store.store_goods[index];

  let oldCatName = food['food_cat_name'];

  food['food_name'] = food_name;
  food['food_cat_name'] = food_cat_name;
  food['food_commend'] = food_commend;
  food['food_price'] = food_price;
  food['food_ingredient'] = food_ingredient;

  let categories = store.store_categories;

  let index1 = categories.findIndex(item => item.cat_name === food_cat_name);

  if (index1 < 0) { // 不存在该分类, 则添加该分类并添加商品
    // 删除原分类
    categories.forEach(cat => {
      cat.children.forEach((f, index) => {
        if (f.food_id == food_id) {
          cat.children.splice(index, 1);
        }
      })
    })
    // 添加至新分类
    categories.unshift({
      cat_name: food_cat_name,
      children: [{
        food_id,
        food_name,
        food_cat_name,
        food_commend,
        food_price,
        food_ingredient,
        food_sales: food['food_sales'],
        food_rating: food['food_rating'],
        food_pic: food['food_pic']
      }]
    })
  } else { // 存在该分类, 修改信息
    let cate = categories[index1];

    if (food_cat_name === oldCatName) { // 分类未改变
      let index2 = cate.children.findIndex(item => item.food_id == food_id);

      let f = cate.children[index2];

      f['food_name'] = food_name;
      f['food_commend'] = food_commend;
      f['food_price'] = food_price;
      f['food_ingredient'] = food_ingredient;
    } else { // 分类改变时
      // 删除原分类
      categories.forEach(cat => {
        cat.children.forEach((f, index) => {
          if (f.food_id == food_id) {
            cat.children.splice(index, 1);
          }
        })
      })

      // 在该分类下添加该商品
      cate.children.unshift({
        food_id,
        food_name,
        food_cat_name,
        food_commend,
        food_price,
        food_ingredient,
        food_sales: food['food_sales'],
        food_rating: food['food_rating'],
        food_pic: food['food_pic']
      })
    }

  }

  store.save(err => {
    if (err) throw err;
    console.log('更新成功...');
  })

  ctx.body = {
    errorCode: 0,
    message: '更新成功...'
  }

  await next();
})

// 删除商品
router.delete('/store/goods/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const { food_id, food_cat_name } = JSON.parse(ctx.request.rawBody);
  const store = await StoreModel.findById(id);

  let goods = store.store_goods;

  let index = goods.findIndex(item => item.food_id == food_id);

  goods.splice(index, 1);

  let categories = store.store_categories;

  let index1 = categories.findIndex(item => item.cat_name === food_cat_name);

  let cate = categories[index1];

  let index2 = cate.children.findIndex(item => item.food_id == food_id);

  cate.children.splice(index2, 1);

  store.save(err => {
    if (err) throw err;
    console.log('删除成功...');
  })

  ctx.body = {
    errorCode: 0,
    message: '删除成功...'
  }


  await next();
})

// 获取订单
router.get('/store/order/:id', async (ctx, next) => {
  const { id } = ctx.params;
  let { page, limit } = ctx.request.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const store = await StoreModel.findById(id);
  const orders = store.orders;
  const total = orders.length;
  let start = (page - 1) * limit;

  let end = start + limit;

  if (end > total) { // 大于总数量时，等于
    end = total;
  }

  const data = orders.slice(start, end);

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    pagination: {
      page,
      limit,
      total
    },
    data
  }
  
  await next();
})

module.exports = router;