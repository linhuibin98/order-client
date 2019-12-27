const Router = require('koa-router');
const UserModel = require('../../models/UserModel');
const storeModel = require('../../models/StoreModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const tradeNo = require('../../lib/generateOrderNum');
const upload = require('../../middleWares/multer');

const router = new Router({
  prefix: '/api/public/v1'
});

const secret = 'lhblinhibin';

// 登录
router.post('/user/login', async (ctx, next) => {
  let { data: { username, password } } = JSON.parse(ctx.request.rawBody);

  let user = await UserModel.findOne({ '$or': [{ username }, { user_phone: username }] });
  if (!user || crypto.createHash('sha1', secret).update(password).digest('hex') !== user.password) {
    ctx.body = {
      errorCode: 1,
      message: '用户不存在,或账号密码错误'
    }
  } else {
    let { username, user_phone: phone, _id: id, currentAvatar: avatar } = user;
    let userInfo = {
      username,
      phone,
      id
    }
    ctx.body = {
      errorCode: 0,
      message: '登录成功',
      userInfo,
      avatar,
      token: jwt.sign(userInfo, secret, {
        expiresIn: 60
      })
    }
  }
  await next();
});

// token校验
router.get('/validate/token', async (ctx, next) => {
  let token = ctx.request.headers.authorization;
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return ctx.body = {
        errorCode: 1,
        message: 'token失效了'
      }
    } else {
      let { username, phone, id, avatar } = decode;
      let sendDada = {
        username,
        phone,
        id
      }
      ctx.body = {
        errorCode: 0,
        message: 'ok',
        userInfo: sendDada,
        token: jwt.sign(sendDada, secret, {
          expiresIn: 60
        })
      }
    }
  })
  await next();
})

// 注册
router.post('/user/register', async (ctx, next) => {
  let { data: { username, password, phone } } = JSON.parse(ctx.request.rawBody);

  let user1 = await UserModel.findOne({ username });

  let user2 = await UserModel.findOne({ user_phone: phone });

  if (user1) {
    ctx.body = {
      errorCode: 1,
      message: '该用户名已经注册'
    }
  } else if (user2) {
    ctx.body = {
      errorCode: 1,
      message: '该手机号已经注册'
    }
  } else {
    UserModel.create({
      username,
      password,
      user_phone: phone
    });
    ctx.body = {
      errorCode: 0,
      message: '注册成功'
    }
  }
  await next();
});

// 添加收货地址
router.post('/address/add', async (ctx, next) => {
  let { data: { id, address } } = JSON.parse(ctx.request.rawBody);

  const user = await UserModel.findById(id);

  user.user_address.unshift(address);

  user.save(err => {
    if (err) throw err;
    console.log('添加地址成功');
  });

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    address: user.user_address
  }

  await next();
});

// 获取收货地址
router.get('/address/:id', async (ctx, next) => {
  let { id } = ctx.params;

  let user = await UserModel.findById(id);

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    address: user.user_address
  }

  await next();
})

// 获取订单
router.get('/order/:id', async (ctx, next) => {
  let { id } = ctx.params;
  let user = await UserModel.findById(id);
  ctx.body = {
    errorCode: 0,
    message: 'ok',
    orders: user.user_order
  }
  await next();
});

// 生成订单
router.post('/order', async (ctx, next) => {
  let { data: { userId, storeId, storeName, storeLogoUrl, foods, price, address: { name, phone, address } } } = JSON.parse(ctx.request.rawBody);

  let user = await UserModel.findById(userId);
  let store = await storeModel.findById(storeId);

  const order = {
    num: tradeNo(),
    time: new Date().getTime(),
    storeId,
    storeName,
    storeLogoUrl,
    foods,
    price,
    userAddress: address,
    userName: name,
    userPhone: phone
  }

  // 用户保存订单
  user.user_order.unshift(order);

  // 店铺保存订单
  store.orders.unshift(order);

  user.save(err => {
    if (err) throw err;
    console.log('生成订单成功');
  });

  // 订单上的商品销量增加
  foods.forEach(f => {
    store.store_goods.forEach(g => {
      if (f.id == g.food_id) {
        g.food_sales += parseFloat(f.num);
      }
    });
    store.store_categories.forEach(cat => {
      cat.children.forEach(c => {
        if (f.id == c.food_id) {
          c.food_sales += parseFloat(f.num);
        }
      })
    })
  })

  // 店铺订单数+1
  store.store_sales += 1;

  store.save(err => {
    if (err) throw err;
  })

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    orders: user.user_order
  }

  await next();
});

// 更改头像
router.post('/user/avatar', upload.single('avatar'), async (ctx, next) => {
  const { id } = ctx.request.query;
  const user = await UserModel.findById(id);

  const filePath = 'http://127.0.0.1:8080/uploads/avatars/' + ctx.req.file.filename;

  user.currentAvatar = filePath;

  user.historyAvatar.unshift(filePath);

  if (user.historyAvatar.length > 5) {
    user.historyAvatar.length = 5;
  }
  
  user.save(err => {
    if (err) throw err;
  })

  ctx.body = {
    errorCode: 0,
    message: 'ok',
    avatar: user.currentAvatar
  }
  await next();
})

// 获取头像
router.get('/user/avatar/:id', async (ctx, next) => {
  let { id } = ctx.params;
  const user = await UserModel.findById(id);
  ctx.body = {
    errorCode: 0,
    message: 'ok',
    avatar: user.currentAvatar
  }
  await next();
})

module.exports = router;