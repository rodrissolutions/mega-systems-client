import { instance } from "../base.api";

const model = "items";

const itemCartAPI = {
  addItemCart: (token, product) => {
    return instance.post(`/${model}`, product, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteItemCart: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default itemCartAPI;
