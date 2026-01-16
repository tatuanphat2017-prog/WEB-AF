// cấu hình kết nối CSDL 
const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,     // ví dụ: 'yamabiko.proxy.rlwy.net'
  user: process.env.DB_USER,     // ví dụ: 'root'
  password: process.env.DB_PASS, // mật khẩu từ Railway
  database: process.env.DB_NAME, // tên database: railway
  port: process.env.DB_PORT      // ví dụ: 17580
});


db.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
  } else {
    console.log('✅ Đã kết nối MySQL thành công!');
  }
});

module.exports = db;
