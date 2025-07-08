import { instance } from "../base.api";

const model = "views";

const viewAPI = {
  postView: (ProductId, UserId) => {
    return instance.post(`/${model}`, {
      ProductId,
      UserId,
    });
  },

  getViews: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default viewAPI;
