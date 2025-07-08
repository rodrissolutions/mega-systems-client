import { instance } from "../base.api";

const model = "residencies";

const residencyAPI = {
  getByUser: (id) => {
    return instance.get(`/${model}/user/${id}`);
  },

  save: (data) => {
    return instance.post(`/${model}`, data);
  },

  update: (data) => {
    return instance.put(`/${model}`, data);
  },
};

export default residencyAPI;
