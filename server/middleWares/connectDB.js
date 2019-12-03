const connectDB = () => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/order');

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.log(err);
  });

  db.once('open', () => {
    console.log('数据库order连接成功');
  });

  return async (ctx, next) => {

    await next();
  }
}

module.exports = connectDB;