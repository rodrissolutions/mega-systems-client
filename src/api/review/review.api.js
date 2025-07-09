import { instance } from "../base.api";

const model = "reviews";

const reviewAPI = {
  createReview: (review) => {
    return instance.post(`/${model}`, review);
  },
  deleteProductComment: (token, productId, comment) => {
    return instance.udpate(`/${model}/deleteComment/${productId}`, comment, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteReview: (id) => {
    return instance.delete(`/${model}/${id}`);
  },

  listAll: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default reviewAPI;
