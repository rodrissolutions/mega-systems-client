import { instance } from "../base.api";

const model = "users";

const userAPI = {
  getUsers: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getById: (id) => {
    return instance.get(`/${model}/user/${id}`);
  },
  register: (data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateWithImage: (data, id) => {
    return instance.patch(`/${model}/update/withImage/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateWithoutImage: (data, id) => {
    return instance.patch(`/${model}/update/withoutImage/${id}`, data);
  },
};

export default userAPI;
