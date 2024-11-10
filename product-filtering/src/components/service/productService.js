class ProductService {
    static API_URL = "http://localhost:3030/api/products";  // Base URL for backend API
  
    // Fetch all products with pagination
    static async getAllProducts() {
      try {
        const response = await fetch(`${this.API_URL}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching all products:", error.message);
        throw error;
      }
    }
  
    // Fetch product by ID
    static async getProductById(id) {
      try {
        const response = await fetch(`${this.API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Product with ID ${id} not found`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        throw error;
      }
    }
    
  static getByCriteries(data ,criteries) {
        try {
            return data.filter(product => {
                return (
                    (criteries.category ? product.category === criteries.category : true) &&
                    (criteries.brand ? product.brand === criteries.brand : true) &&
                    product.price >= criteries.priceRange[0] &&
                    product.price <= criteries.priceRange[1] &&
                    product.rating >= criteries.rating
                );
            });
        } catch (error) {
            throw new Error(`Error filtering products by criteria: ${error.message}`);
        }
    }
  }
  
  export default ProductService;
  