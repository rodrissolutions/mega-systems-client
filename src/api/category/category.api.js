import { instance } from "../base.api";

const model = "categories";

const categoryAPI = {
  getCategories: () => {
    return instance.get(`/${model}`);
  },

  createCategory: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  deleteCategory: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateCategoryWithoutImage: (token, id, data) => {
    return instance.patch(`/${model}/without-image/${id}`, data, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateCategoryWithImage: (token, id, data) => {
    return instance.patch(`/${model}/with-image/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },
};

export default categoryAPI;
