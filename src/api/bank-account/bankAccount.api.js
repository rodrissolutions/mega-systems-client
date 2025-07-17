import { instance } from "../base.api";

const model = "bank-accounts";

const bankAccountAPI = {
  getAll: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getAllActives: (token) => {
    return instance.get(`/${model}/actives`, {
      headers: {
        "x-token": token,
      },
    });
  },

  createBankAccount: (token, bankAccount) => {
    return instance.post(`/${model}`, bankAccount, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteBankAccount: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateBankAccount: (token, id, bankAccount) => {
    return instance.patch(`/${model}/${id}`, bankAccount, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default bankAccountAPI;
