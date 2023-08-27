<template>
  <div class="container">
    <h1 class="text-center">Products List</h1>

    <form @submit.prevent="addProduct">
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="productName" class="form-label">Name</label>
          <input v-model="newProduct.name" type="text" class="form-control" id="productName" required />
        </div>
        <div class="col-md-4 mb-3">
          <label for="productSupplier" class="form-label">Supplier</label>
          <input v-model="newProduct.supplier" type="text" class="form-control" id="productSupplier" required />
        </div>
        <div class="col-md-4 mb-3">
          <label for="productPrice" class="form-label">Price</label>
          <input
              v-model="newProduct.price"
              type="number"
              class="form-control"
              id="productPrice"
              required
              step="0.01"
              min="0"
          />
        </div>
      </div>
      <button style="float:right;" type="submit" class="btn btn-success">Save Product</button>
    </form>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Product Id</th>
        <th>Product Name</th>
        <th>Product Supplier</th>
        <th>Product Price</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>
          <input v-if="product.editable" v-model="product.name" />
          <span v-else>{{ product.name }}</span>
        </td>
        <td>
          <input v-if="product.editable" v-model="product.supplier" />
          <span v-else>{{ product.supplier }}</span>
        </td>
        <td>
          <input v-if="product.editable" v-model="product.price" />
          <span v-else>{{ product.price }}</span>
        </td>
        <td>
          <button v-if="!product.editable" @click="toggleEdit(product)" class="btn btn-primary">Edit</button>
          <button v-else @click="saveChanges(product)" class="btn btn-success">Save</button>
          <button
              @click="confirmDelete(product.id)"
              class="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      showAddForm: false,
      newProduct: {
        name: "",
        supplier: "",
        price: ""
      }
    };
  },
  methods: {
    getProducts() {
      ProductService.getAllProducts().then((response) => {
        this.products = response.data;
      });
    },
    deleteProduct(productId) {
      ProductService.deleteProduct(productId).then(() => {
        this.getProducts();
      });
    },
    toggleEdit(product) {
      product.editable = !product.editable;
    },

    saveChanges(product) {
      const updatedProduct = {
        id: product.id,
        name: product.name,
        supplier: product.supplier,
        price: product.price
      };

      ProductService.updateProduct(product.id, updatedProduct).then(() => {
        this.toggleEdit(product);
        this.getProducts();
      });
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.resetNewProduct();
    },

    resetNewProduct() {
      this.newProduct = {
        name: "",
        supplier: "",
        price: ""
      };
    },

    addProduct() {
      ProductService.saveProduct(this.newProduct).then(() => {
        this.toggleAddForm();
        this.resetNewProduct();
        this.getProducts();
      });
    },
    confirmDelete(productId) {
      if (window.confirm("Are you sure you want to delete?")) {
        this.deleteProduct(productId);
      }
    }
  },

  created() {
    this.getProducts();
  }
};
</script>


