// tạo cấu trúc cho sản phẩm model
const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    const query = 'SELECT * FROM products';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Thêm mới sản phẩm
  create: (product, callback) => {
     const query = 'INSERT INTO products (name, price, image) VALUES (?, ?, ?)';
     db.query(query, [product.name, product.price, product.image], callback);
 }, 

  // Sửa sản phẩm theo ID
  updateById: (id, product, callback) => {
    const query = 'UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?';
    db.query(query, [product.name, product.price, product.image, id], callback);
  },

 // Xóa sản phẩm theo ID
  deleteById: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
 },
};

module.exports = Product;
