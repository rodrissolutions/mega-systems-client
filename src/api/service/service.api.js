import { instance } from "../base.api";

const model = "services";

const serviceAPI = {
  getServices: () => {
    return instance.get(`/${model}`);
  },

  getServiceById: (id) => {
    return instance.get(`/${model}/${id}`);
  },

  registerService: (token, service) => {
    return instance.post(`/${model}`, service, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  deleteService: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateServiceWithImage: (token, id, service) => {
    return instance.put(`/${model}/update/${id}`, service, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-token": token,
      },
    });
  },

  updateServiceWithoutImage: (token, id, service) => {
    return instance.put(`/${model}/update/withoutImage/${id}`, service, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default serviceAPI;
