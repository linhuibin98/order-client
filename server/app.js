const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticMiddleware = require('koa-static');
const path = require('path');
const registerRouter = require('./api/v1');
const catchError = require('./middleWares/catchError');
const connectDB = require('./middleWares/connectDB');
const cors = require('koa2-cors');

const app = new Koa();
app.use(catchError());
app.use(cors());
app.use(connectDB());
app.use(bodyParser());
app.use(staticMiddleware(path.resolve(__dirname, './static')));
app.use(registerRouter());



app.listen(8080, () => {
  console.log('server is runing at port 8080');
})