// viết file server chính
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
//const dotenv = require('dotenv');
const path = require('path');

const mysql = require('mysql');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('./config/db');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware cơ bản
app.use(cors());
app.use(express.json()); //parse JSON body từ frontend

app.use(session({ 
  secret: 'ban-dai-secret-key', // 👈 Đặt secret bất kỳ để mã hóa session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 👈 Đặt true nếu bạn dùng HTTPS
}));

// phục vụ frontend (index.html) từ thư mục Publich
app.use(express.static(path.join(__dirname, 'Public')));

// phục vụ ảnh từ thư mục image
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use('/api', productRoutes);

app.use('/api/auth', authRoutes); // định tuyến route đăng nhập

// Định tuyến
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes); // ⬅️ Gọi router giỏ hàng

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở http://localhost:${PORT}`);
});