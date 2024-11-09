import React from 'react';
import Product from './Product';
import "./styles/productList.css"

const ProductList = ({ products, handleOpenModal, setModalProduct }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product
          setModalProduct={setModalProduct}
          handleOpenModal={handleOpenModal}
          key={product.id}
          product={product} />
      ))}
    </div>
  );
};

export default ProductList;
