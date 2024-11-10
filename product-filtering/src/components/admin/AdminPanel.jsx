import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './adminService';
import "./adminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    rating: '',
    imageUrl: '',
    description: '',
  });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddOrUpdateProduct = () => {
    if (editProductId) {
      updateProduct(editProductId, productData).then((updatedProduct) => {
        if (updatedProduct) {
          setProducts(products.map((product) =>
            product.id === editProductId ? updatedProduct : product
          ));
          resetForm();
        }
      });
    } else {
      addProduct(productData).then((addedProduct) => {
        if (addedProduct) {
          setProducts([...products, addedProduct]);
          resetForm();
        }
      });
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then((deletedProduct) => {
      if (deletedProduct) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setProductData(product);
  };

  const resetForm = () => {
    setProductData({
      name: '',
      category: '',
      brand: '',
      price: '',
      rating: '',
      imageUrl: '',
      description: '',
    });
    setEditProductId(null);
  };

  return (
    <div className="admin-panel">
      <h2>Product Admin Panel</h2>
      <form className="product-form">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
          placeholder="Brand"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="number"
          name="rating"
          value={productData.rating}
          onChange={(e) => setProductData({ ...productData, rating: e.target.value })}
          placeholder="Rating (0-5)"
          max="5"
          min="0"
        />
        <input
          type="text"
          name="imageUrl"
          value={productData.imageUrl}
          onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          placeholder="Description"
        />
        <button type="button" onClick={handleAddOrUpdateProduct}>
          {editProductId ? 'Update Product' : 'Add Product'}
        </button>
        {editProductId && (
          <button type="button" onClick={resetForm} className="cancel-button">
            Cancel
          </button>
        )}
      </form>

      <div className="product_list">
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product_item">
              <img src={product.imageUrl} alt={product.name} />
              <span>{product.name}</span>
              <span>{product.description}</span>
              <div className="butts">
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
