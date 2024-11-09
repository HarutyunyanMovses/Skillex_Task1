import React, { useEffect, useState } from 'react';
import { products } from '../data/product';
import './styles/filters.css';

export default function Filters({ onFilterChange,maxPrice }) {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [rating, setRating] = useState(0);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const uniqueBrands = [...new Set(products.map(item => item.brand))];
    const uniqueCategories = [...new Set(products.map(item => item.category))];
    setAllBrands(uniqueBrands);
    setAllCategories(uniqueCategories);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ category: e.target.value });
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    onFilterChange({ brand: e.target.value });
  };

  const handlePriceChange = (e) => {
    const newRange = [0, parseFloat(e.target.value)];
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange });
  };

  const handleRatingChange = (e) => {
    const newRating = parseFloat(e.target.value);
    setRating(newRating);
    onFilterChange({ rating: newRating });
  };

  return (
    <div className="filters">
      <div className="filter-section">
        <label htmlFor="category-select">Category</label>
        <select id="category-select" value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {allCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="brand-select">Brand</label>
        <select id="brand-select" value={brand} onChange={handleBrandChange}>
          <option value="">All Brands</option>
          {allBrands.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="price-range">Price Range: Up to ${priceRange[1]}</label>
        <input
          id="price-range"
          type="range"
          min="0"
          max={maxPrice}
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>

      <div className="filter-section">
        <label htmlFor="rating">Rating: {rating} & Up</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
}
