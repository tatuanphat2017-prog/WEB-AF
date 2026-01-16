const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); // thêm dòng này

// Route đăng ký
router.post('/register', registerUser);

// Route đăng nhập
router.post('/login', loginUser);

// ✅ Route bảo vệ cần token
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Bạn đã truy cập thành công route được bảo vệ!' });
});

module.exports = router;
