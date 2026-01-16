
// định tuyến API
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');


// Route lấy tất cả sản phẩm 
router.get('/products', getAllProducts);


// ✅ Route lấy chi tiết sản phẩm theo ID
router.get('/products/:id', getProductById);

router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
