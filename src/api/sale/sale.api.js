import { instance } from "../base.api";

const model = "buys";

const saleAPI = {
  createSaleWithDelivery: (sale) => {
    return instance.post(`/${model}/withDelivery`, sale);
  },

  getSales: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getByStatus: (token, status) => {
    return instance.get(`/${model}/status/${status}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getByUser: (token, id) => {
    return instance.get(`/${model}/user/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getBySale: (token, id) => {
    return instance.get(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  hasPurchased: (ProductId, UserId) => {
    return instance.get(
      `/${model}/hasPurchased?ProductId=${ProductId}&UserId=${UserId}`
    );
  },
};

export default saleAPI;
