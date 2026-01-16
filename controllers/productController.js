// tạo controller xử lý logic
const Product = require('../models/productModel'); // đảm bảo đúng đường dẫn

//lấy tất cá sản phẩm
const getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi lấy sản phẩm' });
    } else {
      res.json(products); // trả về toàn bộ sản phẩm, gồm image
    }
  });
};

// Lấy sản phẩm theo ID
const getProductById = (req, res) => {
  const productId = req.params.id;

  Product.getById(productId, (err, product) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi server' });
    } else if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    } else {
      res.json(product);
    }
  });
};

const createProduct = (req, res) => {
  const { name, price, image } = req.body;
  Product.create({ name, price, image }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi tạo sản phẩm' });
    res.status(201).json({ message: 'Tạo sản phẩm thành công', productId: result.insertId });
  });
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, image } = req.body;
  Product.updateById(id, { name, price, image }, (err) => {
    if (err) return res.status(500).json({ error: 'Lỗi cập nhật sản phẩm' });
    res.json({ message: 'Cập nhật sản phẩm thành công' });
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.deleteById(id, (err) => {
    if (err) return res.status(500).json({ error: 'Lỗi xóa sản phẩm' });
    res.json({ message: 'Xóa sản phẩm thành công' });
  });
};

module.exports = {
   getAllProducts,
   getProductById,
   createProduct,
   updateProduct,
   deleteProduct,
   };
