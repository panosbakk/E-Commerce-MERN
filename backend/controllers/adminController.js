const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) throw new Error('Product not found');
    res.json({ product });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new Error('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('ratings.user_id', 'name');
    if (!product) throw new Error('Product not found');
    res.json({ product });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('ratings.user_id', 'name');
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProductById, getProducts };
