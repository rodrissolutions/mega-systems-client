import { instance } from "../base.api";

const model = "companies";

const companyAPI = {
  getDataCompany: () => {
    return instance.get(`/${model}`);
  },

  updateWithImage: (token, data, id) => {
    return instance.patch(`/${model}/with-image/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  updateWithoutImage: (token, data, id) => {
    return instance.patch(`/${model}/without-image/${id}`, data, {
      headers: {
        "x-token": token,
      },
    });
  },

  createCompany: (token, data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },
};

export default companyAPI;
