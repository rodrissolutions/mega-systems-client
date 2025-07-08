import { instance } from "../base.api.js";

const model = "vouchers";

const voucherAPI = {
  saveVoucher: (data) => {
    return instance.post(`${model}/buy`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteVoucher: async (id) => {
    return instance.delete(`${model}/delete/${id}`);
  },
  updateVoucher: async (id, data) => {
    return instance.put(`${model}/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default voucherAPI;
