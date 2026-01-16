const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
  }

  // Kiểm tra email đã tồn tại chưa
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm vào database
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: 'Lỗi khi tạo người dùng' });
      return res.status(201).json({ message: 'Đăng ký thành công' });
    });
  });
};

// Đăng nhập
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });

    if (result.length === 0) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Đăng nhập thành công', token });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
