// cấu hình kết nối CSDL 
const mysql = require('mysql2');
require('dotenv').config();

mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})


db.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
  } else {
    console.log('✅ Đã kết nối MySQL thành công!');
  }
});

module.exports = db;
