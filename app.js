// 引入所需的模組 Require necessary modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require("express-session");
const { MongoClient } = require('mongodb');

// 引入路由定義 Import route definitions
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');

var app = express();

// 設定視圖引擎 Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中介軟體配置 Middleware setup
app.use(logger('dev')); // 使用 Morgan 記錄請求 Use Morgan to log requests
app.use(express.json()); // 解析 JSON 請求 Parse JSON requests
app.use(express.urlencoded({ extended: false })); // 解析 URL 編碼的請求 Parse URL-encoded requests
app.use(cookieParser()); // 解析 Cookie Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // 設定靜態文件夾 Setup static files folder

// 設定會話管理 Setup session management
app.use(session({
  secret: process.env.SECRETKEY, // 用於簽名會話 ID 的秘密字串 Secret string to sign session ID
  resave: false, // 禁止重新保存會話 Prevents resaving session
  saveUninitialized: false, // 不初始化未修改的會話 Prevents initializing unmodified sessions
  cookie: { secure: false }, // 設置 Cookie 為安全（僅限 HTTPS） Set cookie as secure (HTTPS only)
}));

// 設置本地變量 Setup local variables
app.use((req, res, next) => { 
  res.locals.baseUrl = req.protocol + '://' + req.get('host'); // 設定基本 URL Setup base URL
  res.locals.session = req.session; // 設定會話 Setup session
  next(); 
});

// 連接到 MongoDB 並設定本地資料庫 Connect to MongoDB and setup local database
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
client.connect().then(() => {
  console.log('Connected to MongoDB'); // 連接成功 Connected to MongoDB
  app.locals.db = client.db(); // 設定本地資料庫 Setup local database
}).catch(err => {
  console.error('Failed to connect to MongoDB', err); // 連接失敗 Failed to connect to MongoDB
});

// 當進程結束時關閉 MongoDB 連接 Close MongoDB connection on process termination
process.on('SIGINT', async () => {
  console.log("Closing MongoDB connection");
  await client.close();
  process.exit(0);
});

// 設置路由 Setup routes
app.use('/', indexRouter); // 主要路由 Main route
app.use('/users', usersRouter); // 用戶路由 Users route
app.use('/dashboard', dashboardRouter) // 儀錶板路由 Dashboard route

// 捕獲 404 並轉發到錯誤處理 Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 錯誤處理 Error handler
app.use(function(err, req, res, next) {
  // 設定本地變量，只在開發環境提供錯誤訊息 Setup locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染錯誤頁面 Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
