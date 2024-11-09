import React from 'react';

const Product = ({ product, handleOpenModal, setModalProduct }) => {


    return (
        <div key={product.id} className="product-card" onClick={()=>{
            setModalProduct(product)
            handleOpenModal()
        }}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating} stars</p>
        </div>

    );
};

export default Product;
