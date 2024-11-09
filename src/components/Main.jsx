import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Filters from './Filters';
import { ClipLoader } from 'react-spinners';
import { products } from '../data/product';
import './styles/main.css';
import Modal from './Modal';

const Main = () => {
    let maxPrice = Math.max(...products.map(product => product.price));

    const [filterCriteria, setFilterCriteria] = useState({
        category: '',
        brand: '',
        priceRange: [0, Math.round(maxPrice)],
        rating: 0,
    });
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const [modalPraduct,setModalProduct] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const filterProducts = () => {
            setIsLoading(true);
            const result = products.filter(product => {
                return (
                    (filterCriteria.category ? product.category === filterCriteria.category : true) &&
                    (filterCriteria.brand ? product.brand === filterCriteria.brand : true) &&
                    product.price >= filterCriteria.priceRange[0] &&
                    product.price <= filterCriteria.priceRange[1] &&
                    product.rating >= filterCriteria.rating
                );
            });
            setFilteredProducts(result);
            setIsLoading(false);
        };
        filterProducts();
    }, [filterCriteria]);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleFilterChange = (criteria) => {
        setFilterCriteria((prev) => ({ ...prev, ...criteria }));
    };

    return (
        <div className="main">
            <Filters className="filters" onFilterChange={handleFilterChange} maxPrice={Math.round(maxPrice)} />
            {isLoading ? (
                <div className="loading-spinner">
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            ) : filteredProducts.length ? (
                <>
                    <ProductList className="product-list" products={filteredProducts}
                     setModalProduct={setModalProduct}
                     handleOpenModal={handleOpenModal}/>
                    {isModalOpen && <Modal product={modalPraduct} onClose={handleCloseModal} />}
                </>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default Main;
