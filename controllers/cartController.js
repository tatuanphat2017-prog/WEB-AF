exports.addToCart = (req, res) => {
  const { productId, name, price, quantity } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingProduct = req.session.cart.find(p => p.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    req.session.cart.push({ productId, name, price, quantity });
  }

  res.status(200).json({ message: 'Đã thêm vào giỏ hàng', cart: req.session.cart });
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.params; // lấy từ URL

  if (!req.session.cart) {
    return res.status(400).json({ error: 'Giỏ hàng trống.' });
  }

  req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  res.json({ message: 'Đã xóa sản phẩm', cart: req.session.cart });
};

exports.updateCart = (req, res) => {
    const { productId, quantity } = req.body;

    if (!req.session.cart) {
        return res.status(400).json({ error: 'Giỏ hàng trống.' });
    }

    const item = req.session.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
        res.json(req.session.cart);
    } else {
        res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ.' });
    }
};

exports.getCart = (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  res.status(200).json({ cart: req.session.cart });
};
