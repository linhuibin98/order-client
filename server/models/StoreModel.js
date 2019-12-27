const { Schema, model } = require('mongoose');
const crypto = require('crypto');

const secret = 'lhblinhibin';

let OrderSchema = new Schema({
  num: String,
  time: Date,
  storeId: Schema.Types.ObjectId,
  storeName: String,
  storeLogoUrl: String,
  foods: Array, 
  price: Number,
  userName: String,
  userPhone: String,
  userAddress: String
});

let goodsSchema = new Schema({
  food_id: {
    type: Number,
    default: 10000
  },
  food_name: String,
  food_price: Number,
  food_ingredient: String,
  food_pic: String,
  food_sales: {
    type: Number,
    default: 0
  },
  food_rating: {
    type: Number,
    default: 1
  },
  food_cat_id: Number,
  food_cat_name: {
    type: String,
    default: '热销'
  },
  food_commend: {
    type: Number,
    default: 0
  }
})

let categoriesSchema = new Schema({
  cat_id: Number,
  cat_name: String,
  cat_icon: String,
  children: [goodsSchema]
})

let storeSchema = new Schema({ 
  phone: String,
  password: {
    type: String,
    set(val) {
      let hashPass = crypto.createHash('sha1', secret).update(val).digest('hex');
      return hashPass;
    }
  },
  store_logo_url: String,
  store_pic: {
    type: String,
    default: 'https://cube.elemecdn.com/6/ef/349f743404b8c6dc0f5cc7896ce35png.png?x-oss-process=image/format,webp/resize,w_750'
  },
  store_name: String,
  store_grade: {
    type: Number,
    default: 5.0
  },
  store_sales: {
    type: Number,
    default: 0
  },
  distribution_cost: {
    type: Number,
    default: 0
  },
  startup_cost: {
    type: Number,
    default: 0
  },
  store_notice: String,
  store_goods: [goodsSchema],
  store_categories: [categoriesSchema],
  orders: [OrderSchema]
});

const collectionModel = model('store', storeSchema);

module.exports = collectionModel;