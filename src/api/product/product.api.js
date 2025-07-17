import { instance } from "../base.api";

const model = "products";

const productAPI = {
  getProducts: () => {
    return instance.get(`/${model}`);
  },

  getProductById: (id) => {
    return instance.get(`/${model}/${id}`);
  },

  registerProduct: (token, product) => {
    return instance.post(`/${model}`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  deleteProduct: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateProductWithImage: (token, id, product) => {
    return instance.patch(`/${model}/with-image/${id}`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  updateProductWithoutImage: (token, id, product) => {
    return instance.patch(`/${model}/without-image/${id}`, product, {
      headers: {
        "x-token": token,
      },
    });
  },

  topSellers: () => {
    return instance.get(`/${model}/top-sellers`);
  },
};

export default productAPI;
