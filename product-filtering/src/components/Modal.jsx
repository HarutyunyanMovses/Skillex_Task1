import React from 'react';
import './styles/modal.css';

const Modal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{product.name}</h2>
        <img className="modal-image" src={product.imageUrl} alt={product.name} />
        <div className="modal-details">
          <p className="modal-description">{product.description}</p>
          <div className="modal-info">
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating} stars</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
