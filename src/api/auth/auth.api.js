import { instance } from "../base.api";

const model = "auth";

const authAPI = {
  login: (email, password) => {
    return instance.post(`/${model}/login`, { email, password });
  },

  register: (data) => {
    return instance.post(`/${model}/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateWithoutImage: (data, token, id) => {
    return instance.put(`/${model}/update/${id}`, data, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateWithImage: (data, token, id) => {
    return instance.put(`/${model}/update/${id}`, data, {
      headers: {
        "x-token": token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authAPI;
