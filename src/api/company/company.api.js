import { instance } from "../base.api";

const model = "companies";

const companyAPI = {
  getDataCompany: (token) => {
    return instance.get(`/${model}`);
  },

  updateDataCompany: (token, data) => {
    return instance.put(`/${model}`, data, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default companyAPI;
