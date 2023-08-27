import axios from "axios";

const API_URL = "http://localhost:8080"; // Update with your actual API URL

export default {
    getAllProducts() {
        return axios.get(`${API_URL}/product`);
    },
    deleteProduct(productId) {
        return axios.delete(`${API_URL}/product/${productId}`);
    },
    updateProduct(productId, updatedProduct) {
        return axios.put(`${API_URL}/product/${productId}`, updatedProduct);
    },
    saveProduct(newProduct) { // Add this function
        return axios.post(`${API_URL}/product`, newProduct);
    }
};
