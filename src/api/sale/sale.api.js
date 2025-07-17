import { instance } from "../base.api";

const model = "buys";

const saleAPI = {
  createSaleWithDelivery: (sale) => {
    return instance.post(`/${model}/withDelivery`, sale);
  },
  createSaleWithoutDelivery: (sale) => {
    return instance.post(`/${model}/withoutDelivery`, sale);
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

  getByUser: (id) => {
    return instance.get(`/${model}/user/${id}`);
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

  updateSale: (token, id, sale) => {
    return instance.put(`/${model}/${id}`, sale, {
      headers: {
        "x-token": token,
      },
    });
  },

  confirmPayment: (token, id) => {
    return instance.patch(`/${model}/confirm-payment/${id}`, null, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default saleAPI;
