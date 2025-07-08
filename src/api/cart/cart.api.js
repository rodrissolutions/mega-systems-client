import { instance } from "../base.api";

const model = "carts";

const cartAPI = {
  getCart: (id) => {
    return instance.get(`/${model}/user/${id}`);
  },

  addToCart: (data) => {
    return instance.post(`/${model}`, data);
  },

  incrementItemWithoutItemId: (CartId, ProductId) => {
    return instance.put(`/${model}/increment/withoutItemId`, {
      CartId,
      ProductId,
    });
  },

  decrementItemWithoutItemId: (CartId, ProductId) => {
    return instance.put(`/${model}/decrement/withoutItemId`, {
      CartId,
      ProductId,
    });
  },

  incrementItem: (id) => {
    return instance.put(`/${model}/increment`, {
      ItemId: id,
    });
  },

  decrementItem: (id) => {
    return instance.put(`/${model}/decrement`, {
      ItemId: id,
    });
  },

  deleteItem: (CartId, ProductId) => {
    return instance.delete(
      `/${model}/deleteItem?CartId=${CartId}&ProductId=${ProductId}`
    );
  },
};

export default cartAPI;
