const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());

const productsFilePath = path.join(__dirname, 'MockData.json');

const readProductsFromFile = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return []; 
  }
};

const writeProductsToFile = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error writing to file', err);
  }
};

// Routes

// Get all products with optional pagination
app.get('/api/products', (req, res) => {
  const products = readProductsFromFile();
  res.json(products);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const products = readProductsFromFile();
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category);
  
  if (filteredProducts.length === 0) {
    return res.status(404).send('No products found in this category');
  }
  res.json(filteredProducts);
});

// Get products by brand
app.get('/api/products/brand/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();
  const products = readProductsFromFile();
  const filteredProducts = products.filter(p => p.brand.toLowerCase() === brand);
  
  if (filteredProducts.length === 0) {
    return res.status(404).send('No products found for this brand');
  }
  res.json(filteredProducts);
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readProductsFromFile();
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).send('Product not found');
  }
  
  res.json(product);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const products = readProductsFromFile();
  const newProduct = req.body;
  
  // Generate a new unique ID
  newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  products.push(newProduct);
  writeProductsToFile(products);
  
  res.status(201).json(newProduct);
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
  const products = readProductsFromFile();
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  // Update the product
  products[productIndex] = { ...products[productIndex], ...req.body };
  writeProductsToFile(products);
  
  res.json(products[productIndex]);
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const products = readProductsFromFile();
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  // Remove the product
  const deletedProduct = products.splice(productIndex, 1);
  writeProductsToFile(products);
  
  res.json(deletedProduct);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
