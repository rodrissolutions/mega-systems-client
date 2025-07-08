import { instance } from "../base.api";

const model = "additionalValues";

const additionalValuesAPI = {
  getAdditionalValues: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  createAdditionalValue: (token, additionalValue) => {
    return instance.post(`/${model}`, additionalValue, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteAdditionalValue: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateAdditionalValue: (token, id, additionalValue) => {
    return instance.put(`/${model}/${id}`, additionalValue, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default additionalValuesAPI;
