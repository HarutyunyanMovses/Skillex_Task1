import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Filters from './Filters';
import Pagination from './Pagination';
import { ClipLoader } from 'react-spinners';
import productService from './service/productService';
import './styles/main.css';
import Modal from './Modal';

const Main = () => {
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        category: '',
        brand: '',
        priceRange: [0, 1000],
        rating: 0,
    });
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const allProducts = await productService.getAllProducts();
                let maxPrice = Math.round(Math.max(...allProducts.map(product => product.price)))
                setProducts(allProducts);
                setMaxPrice(maxPrice);
                setFilteredProducts(allProducts);
                handleFilterChange({ priceRange: [0,maxPrice] })
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const result = productService.getByCriteries(products, filterCriteria);
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [filterCriteria, products]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleFilterChange = (criteria) => setFilterCriteria((prev) => ({ ...prev, ...criteria }));

    return (
        <div className="main">
            <Filters
                className="filters"
                onFilterChange={handleFilterChange}
                maxPrice={Math.round(maxPrice)}
                products={products}
            />
            <div className="main_products">
                {isLoading ? (
                    <div className="loading-spinner">
                        <ClipLoader color="#36d7b7" size={50} />
                    </div>
                ) : filteredProducts.length ? (
                    <>
                        <ProductList
                            className="product-list"
                            products={currentProducts}
                            setModalProduct={setModalProduct}
                            handleOpenModal={handleOpenModal}
                        />
                        {isModalOpen && <Modal product={modalProduct} onClose={handleCloseModal} />}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Main;
