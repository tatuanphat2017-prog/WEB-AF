const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// lấy giỏ hàng hiện tại 
router.get('/', cartController.getCart);

//Thêm sản phẩm vào giỏ
router.post('/add', cartController.addToCart);

// Cập nhật số lượng sản phẩm
router.put('/update', cartController.updateCart);

//Xóa sản phẩm khỏi giỏ
router.delete('/remove/:productId', cartController.removeFromCart);

module.exports = router;
