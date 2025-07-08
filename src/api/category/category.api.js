import { instance } from "../base.api";

const model = "categories";

const categoryAPI = {
  getCategories: () => {
    return instance.get(`/${model}`);
  },

  createCategory: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
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

  updateCategory: (token, id, data) => {
    return instance.put(`/${model}/${id}`, data, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default categoryAPI;
